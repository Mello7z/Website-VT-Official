import React, { useEffect, useRef, useState } from "react";

interface WebGLFlashlightProps {
  scrollProgress: number; // 0 to 1
  opacity: number;
}

export default function WebGLFlashlight({ scrollProgress, opacity }: WebGLFlashlightProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loadError, setLoadError] = useState(false);
  const [fallbackMouse, setFallbackMouse] = useState({ x: 0, y: 0 });

  const lastViewportPos = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // Track cursor, touch, and scroll positions, compensating for canvas client coordinates
  useEffect(() => {
    lastViewportPos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const updateMouseCoords = () => {
      const canvas = canvasRef.current;
      let newX = lastViewportPos.current.x;
      let newY = lastViewportPos.current.y;

      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        newX = lastViewportPos.current.x - rect.left;
        newY = rect.height - (lastViewportPos.current.y - rect.top);
      } else {
        newY = window.innerHeight - lastViewportPos.current.y;
      }

      mouseRef.current = { x: newX, y: newY };
      if (loadError) {
        setFallbackMouse({ x: lastViewportPos.current.x, y: lastViewportPos.current.y });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastViewportPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
      updateMouseCoords();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        lastViewportPos.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        updateMouseCoords();
      }
    };

    const handleScroll = () => {
      updateMouseCoords();
    };

    const handleResize = () => {
      updateMouseCoords();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial position trigger
    updateMouseCoords();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [loadError]);

  // WebGL Context setup and rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported, falling back to CSS spotlight");
      setLoadError(true);
      return;
    }

    const vsSource = `
      attribute vec2 position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = position * 0.5 + 0.5;
        v_texCoord.y = 1.0 - v_texCoord.y; // Flip Y for standard image orientation
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_scroll; 
      uniform sampler2D u_texNormal;     
      uniform sampler2D u_texTransform;  
      uniform sampler2D u_texEvil;       

      void main() {
        vec2 uv = v_texCoord;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 mPos = u_mouse / u_resolution;
        vec2 st = uv;
        st.x *= aspect;
        mPos.x *= aspect;

        float dist = distance(st, mPos);
        float baseRadius = 0.12;
        float scrollExpand = smoothstep(0.0, 0.5, u_scroll) * 2.5;
        float radius = baseRadius + scrollExpand;
        float edge = 0.08 + smoothstep(0.0, 0.5, u_scroll) * 0.4;
        
        float spotlight = 1.0 - smoothstep(radius - edge, radius + edge, dist);
        
        float flicker = sin(u_time * 2.0) * 0.03;
        float evolution = clamp(sin(u_time * 0.4) * 0.5 + 0.5 + flicker, 0.0, 1.0);
        
        float scrollRevert = smoothstep(0.1, 0.8, u_scroll);
        float finalEvolution = mix(evolution, 0.0, scrollRevert);
        
        vec4 colNormal = texture2D(u_texNormal, uv);
        vec4 colMid = texture2D(u_texTransform, uv);
        vec4 colEvil = texture2D(u_texEvil, uv);
        
        vec4 textureColor;
        if (finalEvolution < 0.5) {
          textureColor = mix(colNormal, colMid, finalEvolution * 2.0);
        } else {
          textureColor = mix(colMid, colEvil, (finalEvolution - 0.5) * 2.0);
        }
        
        float ambient = 0.0; 
        float visibility = max(ambient, spotlight);
        float fullLight = smoothstep(0.7, 1.0, u_scroll);
        visibility = mix(visibility, 1.0, fullLight);
        
        gl_FragColor = vec4(textureColor.rgb * visibility, 1.0);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader build error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) {
      setLoadError(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setLoadError(true);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setLoadError(true);
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      scroll: gl.getUniformLocation(program, "u_scroll"),
      texNormal: gl.getUniformLocation(program, "u_texNormal"),
      texTransform: gl.getUniformLocation(program, "u_texTransform"),
      texEvil: gl.getUniformLocation(program, "u_texEvil"),
    };

    // Helper to request texture loading
    const textures: (WebGLTexture | null)[] = [];
    const imagesLoaded = [false, false, false];

    function loadTexture(url: string, index: number) {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      
      // Black 1x1 pixel while loading
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
      );

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        imagesLoaded[index] = true;
      };
      
      img.onerror = () => {
        // Log loading issues, fallback to black
        console.warn(`Could not load shader image from ${url}`);
      };

      textures.push(tex);
      return index;
    }

    // Connect local files
    gl.uniform1i(uniforms.texNormal, loadTexture("/imagens-inicio/VT-NORMAL.png", 0));
    gl.uniform1i(uniforms.texTransform, loadTexture("/imagens-inicio/VT-TRANSFORMANDO.png", 1));
    gl.uniform1i(uniforms.texEvil, loadTexture("/imagens-inicio/VT-MAL.png", 2));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const startTime = performance.now();

    const renderLoop = (time: number) => {
      gl.useProgram(program);
      gl.uniform1f(uniforms.time, (time - startTime) * 0.001);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uniforms.scroll, scrollRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(renderLoop);
    };

    requestRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // CSS fallback for flashlight effect if WebGL fails
  // Uses a visual radial-gradient representing the spotlight
  if (loadError) {
    const mouseXPercent = (fallbackMouse.x / window.innerWidth) * 100;
    const mouseYPercent = (fallbackMouse.y / window.innerHeight) * 100;
    const spotlightRadius = 15 + scrollProgress * 150; // Spotlight expands to full page
    const opacityFall = 1 - Math.min(scrollProgress * 1.5, 1);

    return (
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 ease-out"
        style={{
          background: `radial-gradient(circle ${spotlightRadius}vw at ${mouseXPercent}% ${mouseYPercent}%, transparent 40%, rgba(0, 0, 0, ${opacityFall * 0.95}) 100%)`,
          backgroundColor: "#000000",
          opacity: opacity
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-out select-none opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url('/imagens-inicio/VT-NORMAL.png')`
          }}
        />
      </div>
    );
  }

  return (
    <canvas
      id="shader-canvas"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 block pointer-events-none transition-opacity duration-700 ease-out"
      style={{
        opacity: opacity,
        mixBlendMode: "normal"
      }}
    />
  );
}

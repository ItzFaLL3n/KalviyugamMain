import { useEffect, useRef } from 'react';

// --- Shared shader body (the smoke math) ---
const SMOKE_BODY = `
#define FC gl_FragCoord.xy
#define R resolution
#define T (time*2.5+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<3;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);

  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);

  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);

  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)) * 1.5);
  col.b += 0.15;

  col=mix(vec3(.08),col,min(time*.8,1.));
  col=clamp(col,.08,1.);
`;

// --- WebGL2 shaders ---
const VERT2 = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const FRAG2 = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
${SMOKE_BODY}
  O=vec4(col,1);
}`;

// --- WebGL1 shaders (fallback for mobile) ---
const VERT1 = `
precision highp float;
attribute vec4 position;
void main(){gl_Position=position;}`;

const FRAG1 = `
precision highp float;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
${SMOKE_BODY}
  gl_FragColor=vec4(col,1);
}`;

// --- RENDERER CLASS ---
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.program = null;
    this.vs = null;
    this.fs = null;
    this.buffer = null;
    this.color = [0.145, 0.388, 0.922];
    this.gl = null;

    // Try WebGL2 first, fall back to WebGL1
    const opts = { antialias: false, alpha: false };
    let gl = canvas.getContext('webgl2', opts);
    if (gl) {
      this.gl = gl;
      this.setup(VERT2, FRAG2);
    } else {
      gl = canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts);
      if (gl) {
        this.gl = gl;
        this.setup(VERT1, FRAG1);
      } else {
        console.warn('WebGL not supported');
        return;
      }
    }
    this.init();
  }

  updateColor(c) { this.color = c; }

  updateScale(scale = 1) {
    if (!this.gl) return;
    const wrapper = this.canvas.parentElement;
    if (!wrapper) return;
    const w = wrapper.clientWidth || wrapper.offsetWidth || window.innerWidth;
    const h = wrapper.clientHeight || wrapper.offsetHeight || window.innerHeight;
    const finalW = Math.round((w || window.innerWidth) * scale);
    const finalH = Math.round((h || window.innerHeight) * scale);
    this.canvas.width = finalW;
    this.canvas.height = finalH;
    this.gl.viewport(0, 0, finalW, finalH);
  }

  compile(shader, source) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program || !gl) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }

  setup(vertSrc, fragSrc) {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER);
    this.fs = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!this.vs || !this.fs || !program) return;
    this.compile(this.vs, vertSrc);
    this.compile(this.fs, fragSrc);
    this.program = program;
    gl.attachShader(program, this.vs);
    gl.attachShader(program, this.fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(program));
    }
  }

  init() {
    const { gl, program } = this;
    if (!program || !gl) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    program._resolution = gl.getUniformLocation(program, 'resolution');
    program._time = gl.getUniformLocation(program, 'time');
    program._color = gl.getUniformLocation(program, 'u_color');
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f(program._resolution, canvas.width, canvas.height);
    gl.uniform1f(program._time, now * 1e-3);
    gl.uniform3fv(program._color, this.color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255] : null;
};

// Detect mobile once
const isMobile = typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768);

// --- REACT COMPONENT ---
export const SmokeBackground = ({ smokeColor = '#2563EB' }) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;
    const renderer = new Renderer(canvasRef.current);
    if (!renderer.gl) return;
    rendererRef.current = renderer;

    // Mobile: render at 50% res (smoke is blurry, looks identical upscaled)
    // Desktop: full resolution
    const scale = isMobile ? 0.5 : 1;

    const handleResize = () => renderer.updateScale(scale);
    requestAnimationFrame(() => handleResize());
    window.addEventListener('resize', handleResize);

    // --- Visibility-based rendering ---
    // Only render when the smoke section is visible on screen
    let raf;
    let isVisible = true;
    let lastFrame = 0;
    // Mobile: cap at 30fps to free up GPU for scroll
    const minInterval = isMobile ? 33 : 0;

    const loop = (now) => {
      if (isVisible) {
        if (now - lastFrame >= minInterval) {
          renderer.render(now);
          lastFrame = now;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    requestAnimationFrame(() => loop(0));

    // IntersectionObserver: pause rendering when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(wrapperRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
      observer.disconnect();
      renderer.reset();
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      const rgb = hexToRgb(smokeColor);
      if (rgb) rendererRef.current.updateColor(rgb);
    }
  }, [smokeColor]);

  return (
    <div ref={wrapperRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

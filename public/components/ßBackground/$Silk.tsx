//
//  HEAD
//

// HEAD -> TOOLS
import * as ß from "ß";


//
//  SHADERS
//

// SHADERS -> VERTEX
const vertex = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// SHADERS -> FRAGMENT
const fragment = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
    float G = e;
    vec2  r = (G * sin(G * texCoord));
    return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    mat2  rot = mat2(c, -s, s, c);
    return rot * uv;
}

void main() {
    float rnd        = noise(gl_FragCoord.xy);
    vec2  uv         = rotateUvs(vUv * uScale, uRotation);
    vec2  tex        = uv * uScale;
    float tOffset    = uSpeed * uTime;

    tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

    float pattern = 0.6 +
                                    0.4 * sin(5.0 * (tex.x + tex.y +
                                                                     cos(3.0 * tex.x + 5.0 * tex.y) +
                                                                     0.02 * tOffset) +
                                                     sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

    vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
    col.a = 1.0;
    gl_FragColor = col;
}
`;

interface UniformValue<T = number | ß.three.Color> {
    value: T;
}

interface SilkUniforms {
    uSpeed: UniformValue<number>;
    uScale: UniformValue<number>;
    uNoiseIntensity: UniformValue<number>;
    uColor: UniformValue<ß.three.Color>;
    uRotation: UniformValue<number>;
    uTime: UniformValue<number>;
    [uniform: string]: ß.three.IUniform;
}



interface SilkPlaneProps {
    uniforms: SilkUniforms;
}

const SilkPlane = ß.react.forwardRef<ß.three.Mesh, SilkPlaneProps>(function SilkPlane(
    { uniforms },
    ref
) {
    const { viewport } = ß.fiber.useThree();

    ß.react.useLayoutEffect(() => {
        const mesh = ref as React.RefObject<ß.three.Mesh | null>;
        if (mesh.current) {
            mesh.current.scale.set(viewport.width, viewport.height, 1);
        }
    }, [ref, viewport]);

    ß.fiber.useFrame((_state: ß.fiber.RootState, delta: number) => {
        const mesh = ref as React.RefObject<ß.three.Mesh | null>;
        if (mesh.current) {
            const material = mesh.current.material as ß.three.ShaderMaterial & {
                uniforms: SilkUniforms;
            };
            material.uniforms.uTime.value += 0.1 * delta;
        }
    });

    return (
        <mesh ref={ref}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </mesh>
    );
});
SilkPlane.displayName = "SilkPlane";


export default function $Silk({color}: {
    color: string
}): ß.react.ReactElement {
    const meshRef = ß.react.useRef<ß.three.Mesh>(null);
    const uniforms = ß.react.useMemo<SilkUniforms>(() => ({
        uSpeed: {value: 3},
        uScale: {value: 1},
        uNoiseIntensity: {value: 1},
        uColor: {value: new ß.three.Color(...((color) => [
            parseInt(color.slice(1, 3), 16) / 255,
            parseInt(color.slice(3, 5), 16) / 255,
            parseInt(color.slice(5, 7), 16) / 255
        ])(color))},
        uRotation: {value: 0.1},
        uTime: {value: 0}
    }), [color]);
    return (
        <div className="absolute inset-0 h-screen w-screen -z-10">
            <ß.fiber.Canvas dpr={[1, 2]} frameloop="always">
                <SilkPlane ref={meshRef} uniforms={uniforms}/>
            </ß.fiber.Canvas>
        </div>
    )
}
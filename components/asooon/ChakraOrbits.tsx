import { ZONE_ORDER, zones } from "@/lib/zones";

/** 椭圆前半弧（上方，贴近观者） */
function frontArcPath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`;
}

/** 椭圆后半弧（下方，绕到能量体背后） */
function backArcPath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx - rx} ${cy}`;
}

export function ChakraOrbits() {
  return (
    <g className="orbit-layer">
      {ZONE_ORDER.map((zone) => {
        const z = zones[zone];
        return (
          <g key={zone}>
            <path
              className="ring-guide ring-guide-back"
              d={backArcPath(z.cx, z.cy, z.guideRx, z.guideRy)}
            />
            <path
              className="ring ring-back"
              d={backArcPath(z.cx, z.cy, z.rx, z.ry)}
            />
            <path
              className="ring-guide ring-guide-front"
              d={frontArcPath(z.cx, z.cy, z.guideRx, z.guideRy)}
            />
            <path
              className="ring ring-front"
              d={frontArcPath(z.cx, z.cy, z.rx, z.ry)}
            />
          </g>
        );
      })}
    </g>
  );
}

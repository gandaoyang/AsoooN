"use client";

import { useEffect, useRef } from "react";
import type { ChakraEntries, ChakraZone, OrbEntry } from "@/lib/types";
import { zones } from "@/lib/zones";

interface OrbLayerProps {
  entries: ChakraEntries;
  flowing: boolean;
  onOrbClick: (orb: OrbEntry, zone: ChakraZone) => void;
}

interface OrbRenderItem {
  orb: OrbEntry;
  zone: ChakraZone;
  phase: number;
  speed: number;
  size: number;
}

function buildOrbItems(entries: ChakraEntries): OrbRenderItem[] {
  const items: OrbRenderItem[] = [];
  (Object.keys(entries) as ChakraZone[]).forEach((zone) => {
    const zoneItems = entries[zone];
    const size = Math.max(16, 28 - Math.max(0, zoneItems.length - 8) * 0.65);
    zoneItems.forEach((orb, i) => {
      items.push({
        orb,
        zone,
        phase: (Math.PI * 2 * i) / Math.max(zoneItems.length, 1),
        speed: 0.48 / Math.max(1, Math.sqrt(zoneItems.length)),
        size,
      });
    });
  });
  return items;
}

export function OrbLayer({ entries, flowing, onOrbClick }: OrbLayerProps) {
  const groupRefs = useRef<Map<string, SVGGElement>>(new Map());
  const metaRef = useRef<Map<string, OrbRenderItem>>(new Map());
  const flowingRef = useRef(flowing);

  const orbItems = buildOrbItems(entries);

  useEffect(() => {
    flowingRef.current = flowing;
  }, [flowing]);

  useEffect(() => {
    const map = new Map<string, OrbRenderItem>();
    orbItems.forEach((item) => map.set(item.orb.id, item));
    metaRef.current = map;
  }, [orbItems]);

  useEffect(() => {
    const tick = (ts: number) => {
      metaRef.current.forEach((item, id) => {
        const el = groupRefs.current.get(id);
        if (!el) return;
        const z = zones[item.zone];
        const angle =
          item.phase + (flowingRef.current ? (ts / 1000) * item.speed : 0);
        const x = z.cx + z.rx * Math.cos(angle);
        const y = z.cy + z.ry * Math.sin(angle);
        el.setAttribute("transform", `translate(${x} ${y})`);
      });
    };

    let frame = 0;
    const loop = (ts: number) => {
      tick(ts);
      frame = requestAnimationFrame(loop);
    };

    tick(performance.now());
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <g className="orb-layer">
      <defs>
        <filter
          id="orb-star-filter"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {orbItems.map((item) => {
        const fontSize = item.orb.name.length > 1 ? 11 : 13;
        const r = item.size / 2;
        const gradId = `orb-star-${item.orb.id}`;
        const haloId = `orb-halo-${item.orb.id}`;

        return (
          <g
            key={item.orb.id}
            ref={(el) => {
              if (el) groupRefs.current.set(item.orb.id, el);
              else groupRefs.current.delete(item.orb.id);
            }}
            className="orb"
            filter="url(#orb-star-filter)"
            onClick={() => onOrbClick(item.orb, item.zone)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onOrbClick(item.orb, item.zone);
              }
            }}
          >
            <defs>
              <radialGradient id={haloId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={item.orb.color} stopOpacity="0.22" />
                <stop offset="55%" stopColor={item.orb.color} stopOpacity="0.08" />
                <stop offset="100%" stopColor={item.orb.color} stopOpacity="0" />
              </radialGradient>
              <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffef8" stopOpacity="0.95" />
                <stop offset="22%" stopColor={item.orb.color} stopOpacity="0.72" />
                <stop offset="58%" stopColor={item.orb.color} stopOpacity="0.28" />
                <stop offset="100%" stopColor={item.orb.color} stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle r={r * 1.75} fill={`url(#${haloId})`} />
            <circle r={r * 1.05} fill={`url(#${gradId})`} />
            <text fontSize={fontSize}>{item.orb.name}</text>
          </g>
        );
      })}
    </g>
  );
}

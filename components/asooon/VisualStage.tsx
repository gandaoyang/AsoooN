"use client";

import type { ChakraEntries, ChakraZone, OrbEntry } from "@/lib/types";
import { ChakraOrbits } from "./ChakraOrbits";
import { OrbLayer } from "./OrbLayer";

interface VisualStageProps {
  entries: ChakraEntries;
  flowing: boolean;
  totalOrbs: number;
  onOrbClick: (orb: OrbEntry, zone: ChakraZone) => void;
}

export function VisualStage({
  entries,
  flowing,
  totalOrbs,
  onOrbClick,
}: VisualStageProps) {
  const statusText = flowing
    ? `流动中 · ${totalOrbs} 个光球`
    : `记录模式 · ${totalOrbs} 个光球`;

  return (
    <section className="card visual">
      <div className="visual-head">
        <div className="pill">{statusText}</div>
      </div>
      <div className="stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/asooon-human.png"
          alt="金色能量体盘坐图"
          className="energy-img"
        />
        <svg
          viewBox="0 0 560 700"
          preserveAspectRatio="xMidYMid meet"
          aria-label="脉轮与光球轨道"
          className="energy-svg"
        >
          <ChakraOrbits />
          <OrbLayer
            entries={entries}
            flowing={flowing}
            onOrbClick={onOrbClick}
          />
        </svg>
      </div>
    </section>
  );
}

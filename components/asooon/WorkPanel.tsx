"use client";

import { useEffect, useRef, useState } from "react";
import { canSubmitOrb } from "@/lib/orbInput";
import type { ChakraEntries, ChakraZone, OrbEntry } from "@/lib/types";
import { ZONE_ORDER, zones } from "@/lib/zones";
import { OrbList } from "./OrbList";
import { VisualClock } from "./VisualClock";

interface WorkPanelProps {
  activeZone: ChakraZone;
  allEntries: ChakraEntries;
  flowing: boolean;
  onZoneChange: (zone: ChakraZone) => void;
  onAddEntry: (text: string) => void;
  onToggleFlow: () => void;
  onClear: () => void;
  onOrbClick: (orb: OrbEntry) => void;
}

export function WorkPanel({
  activeZone,
  allEntries,
  flowing,
  onZoneChange,
  onAddEntry,
  onToggleFlow,
  onClear,
  onOrbClick,
}: WorkPanelProps) {
  const [draft, setDraft] = useState("");
  const isComposingRef = useRef(false);
  const zone = zones[activeZone];
  const activeEntries = allEntries[activeZone];

  useEffect(() => {
    setDraft("");
  }, [activeZone]);

  const canSubmit = canSubmitOrb(draft);

  const handleSubmit = () => {
    const value = draft.trim();
    if (!canSubmitOrb(value)) return;
    onAddEntry(value);
    setDraft("");
  };

  return (
    <section className="card work">
      <div className="steps">
        {ZONE_ORDER.map((z, i) => {
          const labels = ["① 上", "② 中", "③ 下"];
          const done = allEntries[z].length > 0;
          return (
            <button
              key={z}
              type="button"
              className={`step${activeZone === z ? " active" : ""}${done ? " done" : ""}`}
              onClick={() => onZoneChange(z)}
            >
              {labels[i]}
            </button>
          );
        })}
      </div>

      <div className="title">{zone.title}</div>
      <div className="desc">{zone.desc}</div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={(e) => {
          isComposingRef.current = false;
          setDraft(e.currentTarget.value);
        }}
        placeholder="例如：我想到最近网站还没做好，心里有一点急，也想快点让它有生命力……"
      />

      <div className="form-actions">
        <div className="form-actions-main">
          <button
            type="button"
            className={`primary${canSubmit ? "" : " is-waiting"}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            确认，生成光球
          </button>
          <button type="button" onClick={onToggleFlow}>
            {flowing ? "暂停流动" : "开始流动"}
          </button>
        </div>
        <div className="form-actions-side">
          <button type="button" onClick={onClear}>
            清空本次
          </button>
          <button
            type="button"
            className="is-waiting"
            disabled
            title="接入 Supabase 后开放"
          >
            保存今日光球布局
          </button>
        </div>
      </div>

      <div className="work-orb-section">
        <div
          className={`work-clock${activeEntries.length > 0 ? " work-clock-compact" : ""}`}
        >
          <VisualClock />
        </div>
        <OrbList
          items={activeEntries}
          zoneLabel={zone.label}
          onItemClick={onOrbClick}
        />
      </div>
    </section>
  );
}

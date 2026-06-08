"use client";

import { useRef, useState } from "react";
import { canSubmitOrb } from "@/lib/orbInput";
import type { ChakraEntries, ChakraZone } from "@/lib/types";
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
}

export function WorkPanel({
  activeZone,
  allEntries,
  flowing,
  onZoneChange,
  onAddEntry,
  onToggleFlow,
  onClear,
}: WorkPanelProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const zone = zones[activeZone];
  const activeEntries = allEntries[activeZone];

  const getInputText = () =>
    (textareaRef.current?.value ?? text).trim();

  const canSubmit = canSubmitOrb(getInputText());

  const syncText = (value: string) => setText(value);

  const handleSubmit = () => {
    const value = getInputText();
    if (!canSubmitOrb(value)) return;
    onAddEntry(value);
    setText("");
    if (textareaRef.current) textareaRef.current.value = "";
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
        ref={textareaRef}
        value={text}
        onChange={(e) => syncText(e.target.value)}
        onInput={(e) => syncText(e.currentTarget.value)}
        onCompositionUpdate={(e) => syncText(e.currentTarget.value)}
        onCompositionEnd={(e) => syncText(e.currentTarget.value)}
        placeholder="例如：我想到最近网站还没做好，心里有一点急，也想快点让它有生命力……"
      />

      <div className="form-actions">
        <div className="form-actions-main">
          <button
            type="button"
            className={`primary${canSubmit ? "" : " is-waiting"}`}
            onClick={handleSubmit}
            aria-disabled={!canSubmit}
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
        <OrbList items={activeEntries} zoneLabel={zone.label} />
      </div>
    </section>
  );
}

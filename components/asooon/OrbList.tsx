"use client";

import type { OrbEntry } from "@/lib/types";

interface OrbListProps {
  items: OrbEntry[];
  zoneLabel: string;
  onItemClick: (orb: OrbEntry) => void;
}

export function OrbList({ items, zoneLabel, onItemClick }: OrbListProps) {
  if (!items.length) return null;

  return (
    <div className="orb-list">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="orb-item"
          onClick={() => onItemClick(item)}
        >
          <div
            className="dot"
            style={{
              background: item.color,
              boxShadow: `0 0 14px ${item.color}`,
            }}
          >
            {item.name}
          </div>
          <div className="orb-item-text">
            <div>
              {zoneLabel} · {item.name}
            </div>
            <div className="orb-note">{item.text}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

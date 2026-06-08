import type { OrbEntry } from "@/lib/types";

interface OrbListProps {
  items: OrbEntry[];
  zoneLabel: string;
}

export function OrbList({ items, zoneLabel }: OrbListProps) {
  if (!items.length) return null;

  return (
    <div className="orb-list">
      {items.map((item) => (
        <div key={item.id} className="orb-item">
          <div
            className="dot"
            style={{
              background: item.color,
              boxShadow: `0 0 14px ${item.color}`,
            }}
          >
            {item.name}
          </div>
          <div>
            <div>
              {zoneLabel} · {item.name}
            </div>
            <div className="orb-note">{item.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

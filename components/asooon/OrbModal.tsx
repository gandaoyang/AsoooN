import type { OrbEntry } from "@/lib/types";

interface OrbModalProps {
  orb: OrbEntry | null;
  zoneLabel: string;
  onClose: () => void;
  onDelete: () => void;
}

export function OrbModal({ orb, zoneLabel, onClose, onDelete }: OrbModalProps) {
  if (!orb) return null;

  return (
    <div className="modal show" onClick={onClose} role="presentation">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
      >
        <h3>
          {zoneLabel} · {orb.name}
        </h3>
        <p>{orb.text}</p>
        <div className="modal-actions">
          <button type="button" className="primary" onClick={onClose}>
            看见了
          </button>
          <button type="button" className="danger" onClick={onDelete}>
            删除光球
          </button>
        </div>
      </div>
    </div>
  );
}

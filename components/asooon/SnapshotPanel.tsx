"use client";

import { compareSnapshotMessage, formatSnapshotCounts } from "@/lib/snapshots";
import type { Snapshot } from "@/lib/types";

interface SnapshotPanelProps {
  snapshots: Snapshot[];
  onLoadSnapshot: (id: string) => void;
}

export function SnapshotPanel({ snapshots, onLoadSnapshot }: SnapshotPanelProps) {
  const visible = snapshots.slice(0, 4);

  return (
    <section className="card history">
      <div className="history-head">
        <h2>时间轴与对比</h2>
      </div>

      <div className="snapshots">
        {visible.length === 0 ? (
          <div className="snapshot snapshot-empty">
            <div>
              <strong>还没有快照</strong>
              <span>完成一次记录后，保存当日状态。</span>
            </div>
          </div>
        ) : (
          visible.map((snapshot) => (
            <div key={snapshot.id} className="snapshot">
              <div>
                <strong>{snapshot.label}</strong>
                <span>{formatSnapshotCounts(snapshot)}</span>
              </div>
              <button type="button" onClick={() => onLoadSnapshot(snapshot.id)}>
                查看
              </button>
            </div>
          ))
        )}
      </div>

      <div className="compare">{compareSnapshotMessage(snapshots)}</div>
    </section>
  );
}

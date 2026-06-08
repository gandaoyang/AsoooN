import type { Snapshot } from "./types";
import { ZONE_ORDER, zones } from "./zones";

export function formatSnapshotCounts(snapshot: Snapshot): string {
  const { entries, total } = snapshot;
  return `上 ${entries.thirdEye.length} · 中 ${entries.heart.length} · 下 ${entries.navel.length} · 共 ${total}`;
}

export function compareSnapshotMessage(snapshots: Snapshot[]): string {
  if (snapshots.length < 2) {
    return snapshots.length === 1
      ? "已保存今日快照。再保存另一次之后，就可以看到两个阶段之间的变化。"
      : "保存快照后，这里会显示不同日期之间的变化。";
  }

  const [latest, previous] = snapshots;
  const diffs = ZONE_ORDER.map((z) => ({
    z,
    d: latest.entries[z].length - previous.entries[z].length,
  })).sort((a, b) => Math.abs(b.d) - Math.abs(a.d));

  const top = diffs[0];
  const zoneLabel = zones[top.z].label;

  if (top.d === 0) {
    return "最近两次相比，各中心的光球数量持平。";
  }

  return `最近两次相比，${zoneLabel} 的光球数量${top.d > 0 ? "增加" : "减少"} ${Math.abs(top.d)} 个。`;
}

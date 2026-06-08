import type { AppPersistedState, ChakraEntries, Snapshot } from "./types";
import { emptyEntries } from "./zones";

const STORAGE_KEY = "asooon-chakra-orbs-v1";

export const defaultState = (): AppPersistedState => ({
  entries: emptyEntries(),
  snapshots: [],
  activeZone: "thirdEye",
  flowing: false,
});

export function loadPersistedState(): AppPersistedState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<AppPersistedState>;
    return {
      entries: normalizeEntries(parsed.entries),
      snapshots: Array.isArray(parsed.snapshots) ? parsed.snapshots : [],
      activeZone: parsed.activeZone ?? "thirdEye",
      flowing: Boolean(parsed.flowing),
    };
  } catch {
    return defaultState();
  }
}

export function savePersistedState(state: AppPersistedState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeEntries(entries?: Partial<ChakraEntries>): ChakraEntries {
  const base = emptyEntries();
  if (!entries) return base;
  return {
    thirdEye: Array.isArray(entries.thirdEye) ? entries.thirdEye : [],
    heart: Array.isArray(entries.heart) ? entries.heart : [],
    navel: Array.isArray(entries.navel) ? entries.navel : [],
  };
}

export function countTotal(entries: ChakraEntries): number {
  return entries.thirdEye.length + entries.heart.length + entries.navel.length;
}

export function createSnapshot(
  entries: ChakraEntries,
  label?: string,
): Snapshot {
  return {
    id: crypto.randomUUID(),
    label:
      label ??
      new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric" }),
    entries: JSON.parse(JSON.stringify(entries)),
    total: countTotal(entries),
  };
}

export type ChakraZone = "thirdEye" | "heart" | "navel";

export interface OrbEntry {
  id: string;
  text: string;
  color: string;
  name: string;
}

export type ChakraEntries = Record<ChakraZone, OrbEntry[]>;

export interface Snapshot {
  id: string;
  label: string;
  entries: ChakraEntries;
  total: number;
}

export interface AppPersistedState {
  entries: ChakraEntries;
  snapshots: Snapshot[];
  activeZone: ChakraZone;
  flowing: boolean;
}

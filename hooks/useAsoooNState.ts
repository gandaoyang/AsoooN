"use client";

import { useCallback, useEffect, useState } from "react";
import { canSubmitOrb, pickOrbNameFromText } from "@/lib/orbInput";
import { randomOrbColor } from "@/lib/pickOrbMeta";
import {
  countTotal,
  createSnapshot,
  defaultState,
  loadPersistedState,
  savePersistedState,
} from "@/lib/storage";
import type { ChakraEntries, ChakraZone, OrbEntry, Snapshot } from "@/lib/types";
import { emptyEntries, zones } from "@/lib/zones";

export function useAsoooNState() {
  const [entries, setEntries] = useState<ChakraEntries>(emptyEntries);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [activeZone, setActiveZone] = useState<ChakraZone>("thirdEye");
  const [flowing, setFlowing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [selectedOrb, setSelectedOrb] = useState<{
    orb: OrbEntry;
    zoneLabel: string;
  } | null>(null);

  useEffect(() => {
    const saved = loadPersistedState();
    setEntries(saved.entries);
    setSnapshots(saved.snapshots);
    setActiveZone(saved.activeZone);
    setFlowing(saved.flowing);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePersistedState({ entries, snapshots, activeZone, flowing });
  }, [entries, snapshots, activeZone, flowing, hydrated]);

  const addEntry = useCallback(
    (text: string) => {
      const trimmedText = text.trim();
      if (!canSubmitOrb(trimmedText)) return;
      const name = pickOrbNameFromText(trimmedText);
      if (!name) return;
      const orb: OrbEntry = {
        id: crypto.randomUUID(),
        text: trimmedText,
        name,
        color: randomOrbColor(),
      };
      setEntries((prev) => ({
        ...prev,
        [activeZone]: [...prev[activeZone], orb],
      }));
    },
    [activeZone],
  );

  const toggleFlow = useCallback(() => setFlowing((f) => !f), []);

  const saveSnapshot = useCallback(
    (label?: string): boolean => {
      if (countTotal(entries) === 0) return false;
      const snap = createSnapshot(entries, label);
      setSnapshots((prev) => [snap, ...prev]);
      return true;
    },
    [entries],
  );

  const loadSnapshot = useCallback(
    (id: string) => {
      const snapshot = snapshots.find((item) => item.id === id);
      if (!snapshot) return;
      setEntries(JSON.parse(JSON.stringify(snapshot.entries)));
      setFlowing(true);
    },
    [snapshots],
  );

  const clearAll = useCallback(() => {
    setEntries(emptyEntries());
    setFlowing(false);
  }, []);

  const totalOrbs = countTotal(entries);
  const activeZoneConfig = zones[activeZone];

  return {
    entries,
    snapshots,
    activeZone,
    activeZoneConfig,
    flowing,
    totalOrbs,
    hydrated,
    selectedOrb,
    setActiveZone,
    addEntry,
    toggleFlow,
    saveSnapshot,
    loadSnapshot,
    clearAll,
    showOrb: (orb: OrbEntry, zoneLabel: string) =>
      setSelectedOrb({ orb, zoneLabel }),
    closeOrbModal: () => setSelectedOrb(null),
  };
}

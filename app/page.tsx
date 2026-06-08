"use client";

import { Header } from "@/components/asooon/Header";
import { OrbModal } from "@/components/asooon/OrbModal";
import { VisualStage } from "@/components/asooon/VisualStage";
import { WorkPanel } from "@/components/asooon/WorkPanel";
import { useAsoooNState } from "@/hooks/useAsoooNState";
import { zones } from "@/lib/zones";

export default function HomePage() {
  const {
    entries,
    activeZone,
    flowing,
    totalOrbs,
    selectedOrb,
    setActiveZone,
    addEntry,
    toggleFlow,
    clearAll,
    showOrb,
    closeOrbModal,
  } = useAsoooNState();

  return (
    <div className="app">
      <Header />

      <main className="grid">
        <VisualStage
          entries={entries}
          flowing={flowing}
          totalOrbs={totalOrbs}
          onOrbClick={(orb, zone) => showOrb(orb, zones[zone].label)}
        />

        <aside className="side">
          <WorkPanel
            activeZone={activeZone}
            allEntries={entries}
            flowing={flowing}
            onZoneChange={setActiveZone}
            onAddEntry={addEntry}
            onToggleFlow={toggleFlow}
            onClear={clearAll}
          />
        </aside>
      </main>

      <OrbModal
        orb={selectedOrb?.orb ?? null}
        zoneLabel={selectedOrb?.zoneLabel ?? ""}
        onClose={closeOrbModal}
      />
    </div>
  );
}

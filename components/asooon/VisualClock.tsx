"use client";

import { useEffect, useState } from "react";

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${h}:${min}:${s}`;
}

export function VisualClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="visual-clock" suppressHydrationWarning>
      <div className="visual-clock-date">{now ? formatDate(now) : "—"}</div>
      <div className="visual-clock-time">{now ? formatTime(now) : "—"}</div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

const fmt = (v: number) => v.toFixed(1).replace(".", ",");

/* ---------- Graf napretka (običan SVG, bez dodatnih paketa) ---------- */

type Point = { label: string; value: number };

export function LineChart({ title, unit, points }: { title: string; unit: string; points: Point[] }) {
  const W = 320;
  const H = 170;
  const padL = 40;
  const padR = 12;
  const padT = 12;
  const padB = 28;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.2;
  const hi = max + span * 0.2;

  const x = (i: number) => padL + (i * (W - padL - padR)) / (points.length - 1);
  const y = (v: number) => padT + ((hi - v) / (hi - lo)) * (H - padT - padB);

  const first = points[0].value;
  const last = points[points.length - 1].value;
  const diff = last - first;
  const diffText = `${diff > 0 ? "+" : ""}${fmt(diff)} ${unit} od početka`;
  const grid = [hi, (hi + lo) / 2, lo];

  return (
    <figure className={styles.chart}>
      <figcaption className={styles.chartHead}>
        <span className={styles.chartTitle}>{title}</span>
        <span className={styles.chartValue}>
          {fmt(last)} {unit}
        </span>
      </figcaption>
      <p className={styles.chartDiff}>{diffText}</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title}: od ${fmt(first)} do ${fmt(last)} ${unit} kroz ${points.length} tjedana`}
        className={styles.svg}
      >
        {grid.map((g) => (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} className={styles.gridLine} />
            <text x={padL - 6} y={y(g) + 3} textAnchor="end" className={styles.axisText}>
              {fmt(g)}
            </text>
          </g>
        ))}
        <polyline
          fill="none"
          className={styles.line}
          points={points.map((p, i) => `${x(i)},${y(p.value)}`).join(" ")}
        />
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={x(i)} cy={y(p.value)} r="3.5" className={styles.dotPoint} />
            <text x={x(i)} y={H - 8} textAnchor="middle" className={styles.axisText}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <p className={styles.axisNote}>Tjedni zapisi ({unit})</p>
    </figure>
  );
}

/* ---------- Trening: unos serija, modal vježbe, Complete ---------- */

const PREVIOUS = [
  { kg: 40, reps: 10 },
  { kg: 40, reps: 10 },
  { kg: 42.5, reps: 8 },
];

export function WorkoutDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [kg, setKg] = useState<string[]>(["", "", ""]);
  const [reps, setReps] = useState<string[]>(["", "", ""]);
  const [note, setNote] = useState("");
  const [doneOn, setDoneOn] = useState<string | null>(null);

  const update = (list: string[], set: (v: string[]) => void, i: number, value: string) => {
    const next = [...list];
    next[i] = value;
    set(next);
  };

  return (
    <article className={styles.workout}>
      <header className={styles.workoutHead}>
        <div>
          <h3 className={styles.exName}>Čučanj s šipkom</h3>
          <p className={styles.exMeta}>3 serije, 8 do 10 ponavljanja</p>
        </div>
        {doneOn && (
          <span className={styles.done} role="status">
            <span aria-hidden="true">✓</span> Završeno {doneOn}
          </span>
        )}
      </header>

      <button type="button" className={styles.secondaryBtn} onClick={() => dialogRef.current?.showModal()}>
        Prikaži vježbu
      </button>

      <p className={styles.optional}>Unos rezultata nije obavezan. Možeš završiti trening i bez njega.</p>

      <ul className={styles.sets}>
        {PREVIOUS.map((prev, i) => (
          <li key={i} className={styles.setRow}>
            <span className={styles.setNo}>Serija {i + 1}</span>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Težina (kg)</span>
              <input
                inputMode="decimal"
                value={kg[i]}
                placeholder={String(prev.kg)}
                onChange={(e) => update(kg, setKg, i, e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Ponavljanja</span>
              <input
                inputMode="numeric"
                value={reps[i]}
                placeholder={String(prev.reps)}
                onChange={(e) => update(reps, setReps, i, e.target.value)}
              />
            </label>
            <span className={styles.prev}>
              Prethodno: {prev.kg} kg × {prev.reps}
            </span>
          </li>
        ))}
      </ul>

      <label className={styles.noteField}>
        <span className={styles.fieldLabel}>Bilješka (neobavezno)</span>
        <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={() => setDoneOn(new Date().toLocaleDateString("hr-HR"))}
      >
        {doneOn ? "Spremi izmjene" : "Complete"}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="ex-dialog-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <h3 id="ex-dialog-title" className={styles.exName}>
          Čučanj s šipkom
        </h3>
        <div className={styles.video}>Ovdje će biti Ninin video vježbe</div>
        <p className={styles.exMeta}>
          Stopala u širini ramena, leđa ravna, spusti se do paralele i vrati se u početni položaj.
        </p>
        <button type="button" className={styles.primaryBtn} onClick={() => dialogRef.current?.close()}>
          Zatvori
        </button>
      </dialog>
    </article>
  );
}

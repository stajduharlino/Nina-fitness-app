import Link from "next/link";
import { LineChart, WorkoutDemo } from "./Components";
import styles from "./page.module.css";

// Izmišljeni podaci samo za prototip.
const WEIGHT = [68.4, 68.0, 67.7, 67.9, 67.1, 66.8, 66.5, 66.2].map((value, i) => ({
  label: String(i + 1),
  value,
}));
const WAIST = [78, 77.5, 77, 76.8, 76.2, 75.9, 75.4, 75].map((value, i) => ({
  label: String(i + 1),
  value,
}));

export default function DemoPage() {
  return (
    <main className={styles.page}>
      <Link href="/portal" className={styles.back}>
        ← Portal
      </Link>
      <h1 className={styles.title}>Probne komponente</h1>
      <p className={styles.lead}>Prototip s izmišljenim podacima. Ništa se ne sprema.</p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Napredak</h2>
        <LineChart title="Težina" unit="kg" points={WEIGHT} />
        <LineChart title="Struk" unit="cm" points={WAIST} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Trening</h2>
        <WorkoutDemo />
      </section>
    </main>
  );
}

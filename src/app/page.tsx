import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ringLarge}`} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ringSmall}`} aria-hidden="true" />
      <div className={`${styles.dot} ${styles.dotA}`} aria-hidden="true" />
      <div className={`${styles.dot} ${styles.dotB}`} aria-hidden="true" />

      <div className={styles.photo}>
        <Image
          src="/brand/nina-hero-nobackground.png"
          alt="Nina Gauš, online trenerica"
          fill
          priority
          sizes="(min-width: 900px) 520px, 88vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={styles.brand}>
        <Image
          className={styles.logo}
          src="/brand/nina-logo-white.png"
          alt="Nina Gauš"
          width={970}
          height={965}
        />
        <p className={styles.tagline}>Online coaching</p>
        <Link className={styles.cta} href="/login">
          Prijava
        </Link>
      </div>
    </main>
  );
}

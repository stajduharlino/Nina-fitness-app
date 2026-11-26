import Image from "next/image";
import Link from "next/link";
import { MOCK_CLIENTS, MODULE_LABELS, type ModuleKey } from "@/lib/mock-data";
import BottomNav from "./BottomNav";
import styles from "./page.module.css";

// Prototip: prikazujemo izmišljenog klijenta. U Fazi 3 ovo postaje prijavljeni korisnik.
const client = MOCK_CLIENTS[0];

const TILES: Record<ModuleKey, { href: string; text: string }> = {
  training: { href: "/portal/training", text: "Nina ti još nije dodijelila plan treninga." },
  nutrition: { href: "/portal/nutrition", text: "Nina ti još nije dodijelila plan prehrane." },
  progress: { href: "/portal/progress", text: "Prati težinu, mjere i fotografije kroz tjedne." },
  messages: { href: "/portal/messages", text: "Razgovor s Ninom." },
  subscription: { href: "/portal/subscription", text: "Status i trajanje tvog programa." },
};

export default function PortalPage() {
  const firstName = client.name.split(" ")[0];

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <Image src="/brand/nina-logo-white.png" alt="Nina Gauš" width={970} height={965} className={styles.logo} />
        </header>

        <section className={styles.hello}>
          <h1 className={styles.title}>Bok, {firstName}</h1>
          <p className={styles.sub}>
            <span className={`${styles.status} ${styles[client.status]}`}>{client.status}</span>
            <span>Program traje do {new Date(client.programEnd).toLocaleDateString("hr-HR")}</span>
          </p>
        </section>

        <ul className={styles.tiles}>
          {client.modules.map((m) => (
            <li key={m}>
              <Link href={TILES[m].href} className={styles.tile}>
                <span className={styles.tileTitle}>{MODULE_LABELS[m]}</span>
                <span className={styles.tileText}>{TILES[m].text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <BottomNav modules={client.modules} />
    </>
  );
}

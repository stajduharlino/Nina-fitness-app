import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_CLIENTS } from "@/lib/mock-data";
import ClientTabs from "./ClientTabs";
import styles from "./page.module.css";

export function generateStaticParams() {
  return MOCK_CLIENTS.map((c) => ({ id: c.id }));
}

export default async function ClientPage({ params }: PageProps<"/coach/clients/[id]">) {
  const { id } = await params;
  const client = MOCK_CLIENTS.find((c) => c.id === id);
  if (!client) notFound();

  return (
    <main className={styles.page}>
      <Link href="/coach" className={styles.back}>
        ← Svi klijenti
      </Link>
      <ClientTabs client={client} />
    </main>
  );
}

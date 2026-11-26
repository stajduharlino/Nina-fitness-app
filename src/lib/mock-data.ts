// Izmišljeni podaci samo za prototip. Ne koriste se u produkciji.

export type ModuleKey = "training" | "nutrition" | "progress" | "messages" | "subscription";

export const MODULE_LABELS: Record<ModuleKey, string> = {
  training: "Trening",
  nutrition: "Prehrana",
  progress: "Rezultati",
  messages: "Poruke",
  subscription: "Pretplata",
};

export type ClientStatus = "aktivna" | "pauzirana" | "zaključana" | "istekla";

export type MockClient = {
  id: string;
  name: string;
  status: ClientStatus;
  programEnd: string; // ISO datum
  modules: ModuleKey[]; // uključeni moduli
};

export const MOCK_CLIENTS: MockClient[] = [
  {
    id: "ana-horvat",
    name: "Ana Horvat",
    status: "aktivna",
    programEnd: "2027-02-14",
    modules: ["training", "nutrition", "progress", "messages", "subscription"],
  },
  {
    id: "marko-kovac",
    name: "Marko Kovač",
    status: "aktivna",
    programEnd: "2027-01-05",
    modules: ["training", "messages", "subscription"],
  },
  {
    id: "ivana-babic",
    name: "Ivana Babić",
    status: "pauzirana",
    programEnd: "2027-03-01",
    modules: ["training", "nutrition", "progress"],
  },
  {
    id: "luka-maric",
    name: "Luka Marić",
    status: "istekla",
    programEnd: "2026-11-01",
    modules: ["training", "subscription"],
  },
  {
    id: "petra-novak",
    name: "Petra Novak",
    status: "aktivna",
    programEnd: "2027-04-20",
    modules: ["nutrition", "progress", "messages"],
  },
];

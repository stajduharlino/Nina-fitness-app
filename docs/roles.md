# Uloge

U prvoj verziji postoji jedna trenerica (Nina). Ovlasti se provjeravaju na poslužitelju i u bazi, ne samo skrivanjem gumba ili adresa.

## Nina (trenerica)
- Prijavljuje se na trenersku stranicu `/coach`.
- Pregledava, pretražuje i otvara profile svojih klijenata.
- Poziva klijenta e-mailom; ako poziv istekne, šalje novi.
- Uključuje i isključuje module za svakog klijenta zasebno.
- Uređuje profil klijenta (ime, e-mail, status programa) i dodjeljuje planove.
- Razmjenjuje poruke s klijentom.
- Ažurira pretplatu (ručni status i datume).
- Može zaključati, pauzirati ili otključati klijentov program.
- Ne može pristupiti klijentima koji nisu povezani s njezinim računom.

## Klijent
- Aktivira račun putem poziva i sam postavlja lozinku.
- Uređuje samo: telefon, avatar, visinu, težinu i cilj.
- Ime, e-mail i status programa uređuje samo Nina.
- Vidi samo vlastite podatke i module koji su mu uključeni.
- Ne vidi druge klijente ni trenerske funkcije.
- Nakon isteka programa pristup mu je automatski zaključan; podaci ostaju spremljeni.

## Posjetitelj
- Vidi javnu početnu stranicu (`/`) i prijavu (`/login`).
- Ne vidi privatne stranice ni podatke.

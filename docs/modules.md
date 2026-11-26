# Moduli

Moduli se uključuju po klijentu, ne globalno. Uključivanje modula ne stvara automatski plan; klijent vidi prazan prikaz s objašnjenjem da Nina još nije dodijelila sadržaj.

| Modul | Što radi prva verzija | Nina može | Klijent može |
|---|---|---|---|
| Trening | Planovi i evidencija treninga | Izraditi, urediti, dodijeliti, pregledati zapise | Pregledati plan, zabilježiti odrađeno |
| Prehrana | Plan i bilješke | Izraditi, urediti, dodijeliti | Pregledati plan i dopuštene bilješke |
| Rezultati | Tjedna težina, mjere, fotografije | Pregledati i dodati dogovorene zapise | Pregledati i unijeti vlastite zapise |
| Poruke | Razgovor Nina–klijent | Slati i čitati | Slati i čitati vlastiti razgovor |
| Pretplata | Ručni status članstva | Ažurirati status i datume | Pregledati status |

## Tijek promjene modula
1. Nina otvori profil klijenta i odjeljak **Moduli**.
2. Uključi ili isključi modul.
3. Aplikacija prikaže potvrdu što će klijent vidjeti.
4. Promjena se sprema samo za tog klijenta.
5. Klijentska navigacija prikazuje samo dopuštene module.
6. Svaki zahtjev (stranica, poslužiteljski kod, baza) zasebno provjerava ovlasti.
7. Izravna adresa ili stari bookmark isključenog modula ne smiju raditi.
8. Podaci ostaju spremljeni; ponovno uključivanje vraća pristup.

## Posebna pravila
- Isključenje, deaktivacija računa i brisanje podataka su tri odvojene radnje.
- Isključenje poruka blokira čitanje i slanje, ali čuva povijest.
- Isključenje pretplate skriva pregled klijentu, a Nini ostavlja zapis.
- Praćenje napretka je opcionalno i Nina ga uključuje po klijentu.

## Trening: ključna pravila
- Vježba ima naziv, upute i poveznicu na Ninin video (Google Drive); gumb **Prikaži vježbu** otvara modal.
- Unos težine, serija i ponavljanja nije obavezan; trening se može završiti bez rezultata.
- Pri sljedećem treningu prikazuje se prethodni rezultat kao podsjetnik.
- Nakon **Complete** prikazuje se zelena kvačica i datum; zapis se može naknadno urediti.
- Nina može zatražiti video izvođenja; video je privatan, uz rok čuvanja.

## Rezultati: ključna pravila
- Tjedna težina i mjere (struk, ramena, bedra, gluteus, dodatna mjera) spremaju se kao povijest, ne prepisuju se.
- Prikaz je graf kroz vrijeme; različite jedinice ne dijele istu skalu.
- Fotografije su privatne: vidljive samo tom klijentu i Nini.

## Poruke i obavijesti
- Obavijest u portalu i e-mail; bez teksta poruke u obavijesti.
- Prva verzija: samo tekst, bez privitaka. Push obavijesti kasnije.

## Physio Flow

## Innhold
1. [Introduksjon](#introduksjon)
2. [Funksjoner](#funksjoner)
3. [Teknologi](#teknologi)
4. [Forutsetninger](#forutsetninger)
5. [Komme i gang](#komme-i-gang)
6. [Bruk av Postman for API-testing](#bruk-av-postman-for-api-testing)
7. [Simulator](#simulator)
8. [Mangler og fremtidige arbeid](#mangler-og-fremtidig-arbeid)
9. [AI og Chat GPT] (#AI-og-Chat-GPT)
10. [Kontaktinformasjon](#kontaktinformasjon) (trenger vi dette?)

## Introduksjon
Vi har utviklet en app for fysioterapeuter og kiropraktorer som hjelper pasienter og brukere med å kunne diagnostiseres og få anbefalte rehabiliteringsølvelser uten å måtte være fysisk til stede hos behandlere. Brukeren registrerer seg og legger inn informasjon som kjønn, vekt, høyde og alde, og etter å ha besvart en rekke spørsmål... TBC 

## Funksjoner
- **Brukerregistrering:** Registrer brukerdata som kjønn, vekt, høyde og alder.
- **Diagnose og øvelser:** Få en antatt diagnose og foreslåtte øvelser basert på svar på spørsmål om problemområder.
- **Progresjonssporing:** Se progresjon og fremdrift fra utførte øvelser. Denne er fortsatt under utvikling 
- **AI Interaksjon:** Drøfte diagnoser og øvelser med ChatGPT 3.5 (Denne er fortsatt under utvikling).
  
## Teknologi

Til prosjektet har vi benyttet oss av følgende teknologi: 

- **Frontend:** React Native, Typescript
- **Backend:** Node.js
- **Database:** Firestore
- **Testing:** Expo GO
- **Plattform:** Android og iOS

- ## Forutsetninger (trenger vi det såpass detaljert?) 
- **Operativsystem:** Windows, macOS, eller Linux
- **Programmer:** Node.js, npm, Git
- **Forhåndsinstallasjoner:** 
  - [Node.js og npm](https://nodejs.org/)
  - [Git](https://git-scm.com/)


## Komme i gang
Følg disse stegene for å kjøre prosjektet lokalt:

1. Klon repository:

`git clone https://github.com/TommyS-NO/PhysioGO.git`

`cd <repository_folder>` Tommy: Må vu definere noe mer her med tanke på folder og hvordan de skal gå frem? 

2. Installer avhengigheter:

`npm install`

3. Start prosjektet:

`npm start`

## Bruk av Postman for API Testing

Postman kan brukes til å teste API-ene i prosjektet. Følg disse stegene:

#### Installer Postman:

Last ned og installer [Postman](https://postman.com)

#### Importer API-kolleksjonen:

- Klikk på "Import" i Postman.
- Velg API-kolleksjonsfilen (om tilgjengelig) fra prosjektet ditt.

#### Konfigurer miljø:

- Sett opp miljøvariabler som base URL og API nøkler om nødvendig.

#### Send forespørsler:

Velg en forespørsel.
Klikk på "Send" for å utføre forespørselen.
Se svar og valider responsdata.

## API-dokumentasjon

Her er en oversikt over tilgjengelige API-endepunkter:

#### /api/exercises
- Metode: GET
- Beskrivelse: Henter alle øvelser
- Parametere: Ingen parametere nødvendig

#### /api/exercises/details
- Metode: POST
- Beskrivelse: Henter detaljer for spesifikke øvelser
- Parametere:
- exercises - Liste over øvelser

## Simulator 

For å simulere appen under utvikling, bruk Expo GO:

- Åpne Expo GO: Start Expo GO appen på din mobile enhet.
- Skann QR-kode: Skann QR-koden som vises i terminalen etter å ha kjørt npm start.
- Test appen: Appen vil åpnes i Expo GO, hvor du kan teste funksjonaliteten på både Android og iOS.

### Alternativ Metode uten Expo GO

Hvis du ikke ønsker å bruke Expo GO, kan du bruke en Android Emulator eller iOS Simulator:

#### Android Emulator:

- Installer Android Studio fra Android Developer.
- Følg instruksjonene for å sette opp en virtuell enhet (AVD).
- Start emulatoren og kjør npm start.

#### iOS Simulator:

- Krever en Mac med Xcode installert fra Mac App Store.
- Åpne Xcode og gå til Xcode > Preferences > Components for å installere en simulator.
- Start iOS simulatoren og kjør npm start.

## Clearing av chace:

Når du bruker Expo GO til å utvikle og teste React Native-applikasjoner, kan det hende at du støter på problemer som skyldes cache. Cache er en lagringsmekanisme som brukes til å raskt hente tidligere lastede data, men noen ganger kan det føre til at gamle eller feilaktige data blir brukt i stedet for oppdaterte versjoner. Dette kan føre til problemer som:

- #### Utdatert kode:
  Endringer du har gjort i koden din vises ikke i appen.
- #### Feil under utvikling:
  Appen kan oppføre seg uforutsigbart på grunn av konflikter med gamle data.
- #### Ytelsesproblemer:
 Akkumulering av cache kan påvirke appens ytelse negativt.

### Hvordan utføre clearing av cache:
Clearing av cache kan gjøres på flere måter, avhengig av hvilket verktøy eller hvilken metode du bruker. Her er noen vanlige metoder for å tømme cache når du bruker Expo GO:

#### 1. Bruke Expo CLI
Den enkleste måten å tømme cache på er ved å bruke Expo CLI-kommandoen `expo start -c` : Denne kommandoen starter prosjektet ditt på nytt og tømmer cachen samtidig.


#### 2. Manuelt tømme cache
Noen ganger kan det være nødvendig å tømme cache manuelt ved å slette spesifikke mapper. Dette inkluderer:

- node_modules katalogen
- package-lock.json filen
- Expo cache katalogen (vanligvis .expo)

Her er et eksempel på hvordan du kan gjøre dette:

`rm -rf node_modules`
`rm package-lock.json`
`rm -rf .expo`
`npm install`
`expo start -c`


#### 3. Tømme cache i Expo GO appen

Hvis du mistenker at problemet er med cachen i Expo GO appen på din mobile enhet:

- For Android:
Gå til Innstillinger > Apper > Expo GO > Lagring > Tøm cache.

- For iOS:
Det er ingen direkte metode for å tømme cache på iOS, men du kan prøve å slette appen og installere den på nytt.

Clearing av cache bør gjøres regelmessig for å sikre at du alltid arbeider med oppdatert og korrekt data. Her er noen retningslinjer:

- Ved store endringer: Etter å ha gjort betydelige endringer i koden eller prosjektets struktur.
- Ved feil: Når du opplever problemer som virker relatert til utdatert cache.
- Periodisk: En gang i blant, for eksempel en gang i uken, for å opprettholde god ytelse og stabilitet.


## Manglende arbeid:
### AI-interaksjon:
- ChatGPT 3.5 er integrert, men fungerer foreløpig ikke som ønsket på grunn av manglende data.
[OpenAI](https://www.openai.com)

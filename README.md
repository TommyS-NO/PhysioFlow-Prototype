## Physio Flow

## Innhold
1. [Introduksjon](#introduksjon)
2. [Funksjoner](#funksjoner)
3. [Teknologi](#teknologi)
4. [Komme i gang](#komme-i-gang)
5. [Bruk av Postman for API-testing](#bruk-av-postman-for-api-testing)
6. [Simulator](#simulator-bruk)
7. [Mangler og Fremtidige Arbeider](#mangler-og-fremtidige-arbeider)
8. [Kontaktinformasjon](#kontaktinformasjon) (trenger vi dette?)

## Introduksjon
Vi har utviklet en app for fysioterapeuter og kiropraktorer som hjelper pasienter og brukere med å kunne diagnostiseres og få anbefalte rehabiliteringsølvelser uten å måtte være fysisk til stede hos behandlere. Brukeren registrerer seg og legger inn informasjon som kjønn, vekt, høyde og alde, og etter å ha besvart en rekke spørsmål... TBC 

## Funksjoner
- **Brukerregistrering:** Registrer brukerdata som kjønn, vekt, høyde og alder.
- **Diagnose og øvelser:** Få en antatt diagnose og foreslåtte øvelser basert på svar på spørsmål om problemområder.
- **Progresjonssporing:** Se progresjon og fremdrift fra utførte øvelser. Denne er fortsatt under utvikling 
- **AI Interaksjon:** Drøft diagnoser og øvelser med ChatGPT 3.5 (under utvikling).
  
## Teknologi
- **Frontend:** React Native, Typescript
- **Backend:** Node.js
- **Database:** Firestore
- **Testing:** Expo GO
- **Plattform:** Android og iOS

## Komme i gang
Følg disse stegene for å kjøre prosjektet lokalt:

1. Klon repository:

`git clone <repository_url>`
`cd <repository_folder>`

2. Installer avhengigheter:

`npm install`

3. Start prosjektet:

`npm start`

## Bruk av Postman for API Testing

Postman kan brukes til å teste API-ene i prosjektet. Følg disse stegene:

#### Installer Postman:

- Last ned og installer Postman fra postman.com.

#### Importer API-kolleksjonen:

- Klikk på "Import" i Postman.
- Velg API-kolleksjonsfilen (om tilgjengelig) fra prosjektet ditt.

#### Konfigurer miljø:

- Sett opp miljøvariabler som base URL og API nøkler om nødvendig.

#### Send forespørsler:

Velg en forespørsel fra kolleksjonen.
Klikk på "Send" for å utføre forespørselen.
Se svar og valider responsdata.

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


## Manglende arbeid:
### AI-interaksjon:
- ChatGPT 3.5 er integrert, men fungerer foreløpig ikke som ønsket på grunn av manglende data.
[OpenAI](https://www.openai.com)

export const neckSurvey = {
	id: "neck",
	title: "Nakkeundersøkelse",
	questions: [
		{
			id: "neckQ1",
			question: "Hvor ofte har du nakkesmerter?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Kronisk nakkesmerte"],
				Daglig: ["Kronisk nakkesmerte", "Nakkestivhet og smerte"],
			},
		},
		{
			id: "neckQ2",
			question: "Vurder smerteintensiteten på en skala fra 0 til 10:",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "neckQ3",
			question: "Hvordan vil du beskrive smerten du opplever?",
			options: ["Stikkende", "Brennende", "Verkende", "Pulserende"],
			type: "singleChoice",
			relatedSymptoms: {
				Stikkende: ["Smerte som stråler ned i arm"],
				Brennende: ["Nummenhet i arm eller hånd"],
				Verkende: [],
				Pulserende: [],
			},
		},
		{
			id: "neckQ4",
			question: "Forverres smertene når du beveger på nakken?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved å se opp eller vri nakken"],
				Nei: [],
			},
		},
		{
			id: "neckQ5",
			question: "Føler du stivhet i nakken når du våkner om morgenen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nakkestivhet og smerte"],
				Nei: [],
			},
		},
		{
			id: "neckQ6",
			question: "Opplever du hodepine i tillegg til nakkesmerter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hodepine", "Smerte i nakke som stråler mot hodet"],
				Nei: [],
			},
		},
		{
			id: "neckQ7",
			question: "Har du følelsesløshet eller prikking i armene eller hendene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet i arm eller hånd", "Prikking eller svakhet i armen"],
				Nei: [],
			},
		},
		{
			id: "neckQ8",
			question: "Opplever du svimmelhet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svimmelhet"],
				Nei: [],
			},
		},
		{
			id: "neckQ9",
			question: "Har du merket redusert kraft i armene eller hendene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert kraft i armene eller hendene"],
				Nei: [],
			},
		},
		{
			id: "neckQ10",
			question:
				"Føler du at smertene øker med bestemte aktiviteter eller stillinger?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved bestemte bevegelser"],
				Nei: [],
			},
		},
		{
			id: "neckQ11",
			question:
				"Opplever du en forverring av smerten ved langvarig sitting eller ståing?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved langvarig sitting eller ståing"],
				Nei: [],
			},
		},
		{
			id: "neckQ12",
			question:
				"Har smertene i nakken ført til endringer i søvnmønsteret ditt?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Endringer i søvnmønster"],
				Nei: [],
			},
		},
		{
			id: "neckQ13",
			question: "Føler du at smertene forverres i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
		{
			id: "neckQ14",
			question:
				"Opplever du noen gang en knase- eller knirkelyd når du beveger på nakken?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Knase- eller knirkelyder ved bevegelse av nakken"],
				Nei: [],
			},
		},
		{
			id: "neckQ15",
			question:
				"Har du hatt noen nylige skader som kan ha påvirket nakken din?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nakkesmerter og stivhet etter skade"],
				Nei: [],
			},
		},
		{
			id: "neckQ16",
			question:
				"Opplever du jevnlig stress eller angst som du føler bidrar til nakkesmertene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Kronisk nakkesmerte", "Muskelkramper i nakke og skuldre"],
				Nei: [],
			},
		},
		{
			id: "neckQ17",
			question:
				"Har du forsøkt noen form for behandling for dine nakkesmerter som for eksempel fysioterapi?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [], // Ingen direkte relaterte symptomer, men nyttig informasjon for videre behandling
				Nei: [],
			},
		},
		{
			id: "neckQ18",
			question:
				"Føler du at nakkesmertene dine begrenser din fysiske aktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Begrenset bevegelighet i nakken",
					"Nakkesmerte som kan stråle til armer",
				],
				Nei: [],
			},
		},
		{
			id: "neckQ19",
			question:
				"Har du andre symptomer som ikke direkte relateres til nakken, som for eksempel nummenhet i andre deler av kroppen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet eller svakhet i armer eller ben"], // Dette kan indikere et mer systemisk eller nevrologisk problem
				Nei: [],
			},
		},
		{
			id: "neckQ20",
			question:
				"Føler du at nakkesmertene dine påvirker din generelle livskvalitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert livskvalitet på grunn av nakkesmerte"],
				Nei: [],
			},
		},
		{
			id: "neckQ21",
			question: "Er det noe annet vedrørende din nakkesmerte du ønsker å dele?",
			type: "openText",
			relatedSymptoms: [], 
		},
	],
};

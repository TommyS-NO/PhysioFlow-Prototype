export const kneeSurvey = {
	id: "knee",
	title: "Kneundersøkelse",
	questions: [
		{
			id: "kneeQ1",
			question: "Hvor ofte opplever du knesmerter?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Smerte ved aktivitet"],
				Daglig: ["Kronisk kne smerte som forverres ved aktivitet"],
			},
		},
		{
			id: "kneeQ2",
			question: "Hvor alvorlige er smertene på en skala fra 0 til 10?",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "kneeQ3",
			question: "Opplever du hevelse i kneet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hevelse"],
				Nei: [],
			},
		},
		{
			id: "kneeQ4",
			question: "Har du hørt en 'popping' lyd i kneet ved skade?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hørbar 'popping' lyd ved skade"],
				Nei: [],
			},
		},
		{
			id: "kneeQ5",
			question: "Føler du at kneet 'gir etter' under belastning?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Følelse av at kneet 'gir etter'"],
				Nei: [],
			},
		},
		{
			id: "kneeQ6",
			question: "Har du opplevd knasende eller knirkende lyder i kneet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Knasende lyder ved bevegelse"],
				Nei: [],
			},
		},
		{
			id: "kneeQ7",
			question: "Har du problemer med å bøye eller strekke kneet fullt ut?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Vansker med å bøye eller strekke kneet fullt ut"],
				Nei: [],
			},
		},
		{
			id: "kneeQ8",
			question: "Føler du smerte når du går i trapper?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved bruk av trapper"],
				Nei: [],
			},
		},
		{
			id: "kneeQ9",
			question: "Har du blitt diagnostisert med artrose i kneet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Kronisk kne smerte som forverres ved aktivitet"],
				Nei: [],
			},
		},
		{
			id: "kneeQ10",
			question: "Opplever du stivhet i kneet etter å ha sittet lenge?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet etter perioder med inaktivitet"],
				Nei: [],
			},
		},
		{
			id: "kneeQ11",
			question: "Har du smerter i kneet om natten?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte om natten"],
				Nei: [],
			},
		},
		{
			id: "kneeQ12",
			question: "Har kneet ditt noensinne 'låst seg' uten åpenbar grunn?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["En følelse av at kneet låser seg"],
				Nei: [],
			},
		},
		{
			id: "kneeQ13",
			question: "Føler du deg ustø når du står eller går?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Tap av normal bevegelsesomfang",
					"Følelse av ustabilitet i kneet",
				],
				Nei: [],
			},
		},
		{
			id: "kneeQ14",
			question:
				"Har du nylig endret din fysiske aktivitetsnivå som påvirker kneet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte forverret av ny aktivitet"],
				Nei: [],
			},
		},
		{
			id: "kneeQ15",
			question: "Gjør det vondt når du starter en aktivitet etter hvile?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet etter perioder med inaktivitet"],
				Nei: [],
			},
		},
		{
			id: "kneeQ16",
			question: "Bruker du støtteutstyr som knebind eller ortoser?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Bruk av støtteutstyr"],
				Nei: [],
			},
		},
		{
			id: "kneeQ17",
			question: "Har du hatt fysioterapi eller kirurgi for kneet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere behandlinger"],
				Nei: [],
			},
		},
		{
			id: "kneeQ18",
			question: "Føler du at smertene påvirker din daglige livskvalitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert livskvalitet på grunn av knesmerte"],
				Nei: [],
			},
		},
		{
			id: "kneeQ19",
			question: "Har du opplevd smerter i kneet i mer enn seks måneder?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Langvarig kne smerte"],
				Nei: [],
			},
		},
		{
			id: "kneeQ20",
			question: "Føler du at smertene blir verre i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
	],
};

export default kneeSurvey;

export const wristSurvey = {
	id: "wrist",
	title: "Håndleddsundersøkelse",
	questions: [
		{
			id: "wristQ1",
			question: "Hvor ofte opplever du smerter i håndleddet?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Smerte ved belastning"],
				Daglig: ["Kronisk smerte i håndleddet"],
			},
		},
		{
			id: "wristQ2",
			question: "Vurder smerteintensiteten på en skala fra 0 til 10:",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "wristQ3",
			question: "Opplever du hevelse i håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hevelse og blåmerker"],
				Nei: [],
			},
		},
		{
			id: "wristQ4",
			question: "Føler du nummenhet eller prikking i hånden?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet eller prikking i hånden"],
				Nei: [],
			},
		},
		{
			id: "wristQ5",
			question: "Er smerten verre om morgenen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet i håndleddet, spesielt om morgenen"],
				Nei: [],
			},
		},
		{
			id: "wristQ6",
			question: "Blir smerten bedre når du er aktiv?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som bedres noe med mild aktivitet"],
				Nei: ["Smerte som forverres etter aktivitet"],
			},
		},
		{
			id: "wristQ7",
			question: "Har du opplevd et knall- eller snappefenomen i håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Intens smerte umiddelbart etter skade"],
				Nei: [],
			},
		},
		{
			id: "wristQ8",
			question:
				"Opplever du ofte stivhet eller begrensninger i håndleddets bevegelighet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet og fleksibilitet"],
				Nei: [],
			},
		},
		{
			id: "wristQ9",
			question: "Føler du smerte når du vrir håndleddet eller griper om ting?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Smerte ved basis av tommelen",
					"Smerte i håndleddet spesielt ved bevegelse",
				],
				Nei: [],
			},
		},
		{
			id: "wristQ10",
			question:
				"Har du merket en synlig bule eller hevelse som kommer og går i håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Synlig bule på håndleddet eller hånden"],
				Nei: [],
			},
		},
		{
			id: "wristQ11",
			question:
				"Opplever du en følelse av friksjon eller knirking i håndleddet ved bevegelse?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Følelse av friksjon eller knirking i senen ved bevegelse"],
				Nei: [],
			},
		},
		{
			id: "wristQ12",
			question:
				"Er det smertefullt å trykke på tommelens base eller håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Smerte ved basis av tommelen",
					"Smerte eller ubehag når området utsettes for trykk",
				],
				Nei: [],
			},
		},
		{
			id: "wristQ13",
			question: "Har du opplevd hevelse som kommer og går i håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svingende størrelse på cysten", "Hevelse rundt håndleddet"],
				Nei: [],
			},
		},
		{
			id: "wristQ14",
			question:
				"Føler du at smertene påvirker din evne til å utføre daglige aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Kronisk smerte og stivhet i håndleddet"],
				Nei: [],
			},
		},
		{
			id: "wristQ15",
			question:
				"Opplever du krepitasjon eller knase-lyder ved håndleddbevegelser?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Krepitasjon eller knase-lyder ved håndleddbevegelser"],
				Nei: [],
			},
		},
		{
			id: "wristQ16",
			question:
				"Har du merket en forverring av symptomer i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
		{
			id: "wristQ17",
			question:
				"Har du vært utsatt for et fall eller annen skade som påvirket håndleddet ditt?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Intens smerte umiddelbart etter skade",
					"Betydelig hevelse og mulig deformitet",
				],
				Nei: [],
			},
		},
		{
			id: "wristQ18",
			question:
				"Føler du at håndleddsmertene dine begrenser din fysiske aktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet og fleksibilitet"],
				Nei: [],
			},
		},
		{
			id: "wristQ19",
			question:
				"Bruker du støttebandasje eller andre støtteapparater for håndleddet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Bruk av støttebandasje for å stabilisere håndleddet"],
				Nei: [],
			},
		},
		{
			id: "wristQ20",
			question:
				"Opplever du smerte i håndleddet som påvirker din søvn eller hvile?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som ofte oppstår om natten"],
				Nei: [],
			},
		},
	],
};

export default wristSurvey;

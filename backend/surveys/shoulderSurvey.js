export const shoulderSurvey = {
	id: "shoulder",
	title: "Skulderundersøkelse",
	questions: [
		{
			id: "shoulderQ1",
			question: "Hvor ofte opplever du skuldersmerter?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Kronisk smerte i skulderen"],
				Daglig: [
					"Kronisk smerte i skulderen",
					"Stivhet og smerter om morgenen",
				],
			},
		},
		{
			id: "shoulderQ2",
			question: "Hvor intens er smerten på en skala fra 0 til 10?",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "shoulderQ3",
			question: "Hvordan vil du beskrive smerten i skulderen?",
			options: ["Stikkende", "Brennende", "Verkende", "Pulserende"],
			type: "singleChoice",
			relatedSymptoms: {
				Stikkende: ["Smerte ved løft av armen til siden eller foran kroppen"],
				Brennende: ["Smerte som stråler fra skulderen til albuen"],
				Verkende: ["Kronisk smerte i skulderen"],
				Pulserende: [],
			},
		},
		{
			id: "shoulderQ4",
			question: "Forverres smertene når du beveger skulderen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved bestemte bevegelser"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ5",
			question: "Føler du stivhet i skulderen når du våkner om morgenen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet og redusert bevegelighet"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ6",
			question:
				"Opplever du svakhet i skulderen når du utfører hverdagslige aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svakhet ved løfting eller roterende bevegelser"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ7",
			question: "Hører du knase- eller knirkelyder når du beveger skulderen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Knasende eller knirkende lyder ved bevegelse"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ8",
			question: "Har du nylig hatt en skade som involverte skulderen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte og stivhet etter skade"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ9",
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
			id: "shoulderQ10",
			question:
				"Opplever du redusert bevegelighet i skulderen sammenlignet med før?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet i skulderen"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ11",
			question: "Opplever du smerter om natten som påvirker søvnen din?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte om natten og når man hviler"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ12",
			question:
				"Har du følt en plutselig smerte fulgt av en følelse av at noe røk i skulderen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"En følelse av å ha en ustabil skulder",
					"Klikkelyder ved bevegelse",
				],
				Nei: [],
			},
		},
		{
			id: "shoulderQ13",
			question:
				"Føler du smerte når du løfter armen sidelengs eller roterer den?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved løft av armen til siden eller foran kroppen"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ14",
			question:
				"Har du hatt behandling for skuldersmerter som fysioterapi eller kirurgi?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "shoulderQ15",
			question: "Opplever du nummenhet eller prikking i armen eller hånden?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet eller prikking"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ16",
			question:
				"Føler du at smertene påvirker din evne til å utføre jobben din eller daglige aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Redusert bevegelighet i skulderen",
					"Svakhet ved løfting eller roterende bevegelser",
				],
				Nei: [],
			},
		},
		{
			id: "shoulderQ17",
			question:
				"Har du merket en forverring av smertene i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ18",
			question:
				"Opplever du ofte stress eller angst som du mener forverrer dine skuldersmerter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Kronisk smerte i skulderen"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ19",
			question:
				"Har du andre symptomer som ikke direkte relateres til skulderen, som for eksempel ryggsmerte eller nakkesmerte?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Kronisk smerte i skulderen", "Redusert bevegelighet i skulderen"],
				Nei: [],
			},
		},
		{
			id: "shoulderQ20",
			question:
				"Føler du at skuldersmertene dine påvirker din generelle livskvalitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert livskvalitet på grunn av skuldersmerte"],
				Nei: [],
			},
		},
	],
};

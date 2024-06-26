export const hipSurvey = {
	id: "hip",
	title: "Hofteundersøkelse",
	questions: [
		{
			id: "hipQ1",
			question: "Hvor ofte opplever du hofte- eller lyskesmerter?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Smerte i hoften som forverres ved aktivitet"],
				Daglig: [
					"Smerte i hoften som forverres ved aktivitet",
					"Stivhet i hoften om morgenen eller etter å ha sittet lenge",
				],
			},
		},
		{
			id: "hipQ2",
			question:
				"Vurder intensiteten av smertene dine på en skala fra 0 til 10.",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "hipQ3",
			question: "Føler du stivhet i hoften etter perioder med inaktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet i hoften om morgenen eller etter å ha sittet lenge"],
				Nei: [],
			},
		},
		{
			id: "hipQ4",
			question:
				"Opplever du knasende eller knirkende lyder når du beveger hoften?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Krepitasjon (knase- eller knirkelyder) ved bevegelse"],
				Nei: [],
			},
		},
		{
			id: "hipQ5",
			question:
				"Føler du smerte ved bøyning av hoften, som når du setter deg ned eller reiser deg?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved langvarig sitting"],
				Nei: [],
			},
		},
		{
			id: "hipQ6",
			question: "Har du opplevd plutselig, skarp smerte i hoften?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Plutselig innsettende hoftepine"],
				Nei: [],
			},
		},
		{
			id: "hipQ7",
			question: "Opplever du nummenhet eller prikking i benet eller foten?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet og prikking nedover benet"],
				Nei: [],
			},
		},
		{
			id: "hipQ8",
			question: "Har du følt at hoften 'låser seg' eller blir ustabil?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Følelse av at hoften låser seg eller henger seg opp"],
				Nei: [],
			},
		},
		{
			id: "hipQ9",
			question: "Har du merket en reduksjon i bevegeligheten til hoften?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Begrenset bevegelighet i hoften"],
				Nei: [],
			},
		},
		{
			id: "hipQ10",
			question: "Opplever du økt smerte under vektbærende aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som øker med vektbærende aktiviteter"],
				Nei: [],
			},
		},
		{
			id: "hipQ11",
			question: "Har du hatt noen nylige skader som påvirket hoften?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte og stivhet etter skade"],
				Nei: [],
			},
		},
		{
			id: "hipQ12",
			question: "Har du opplevd smerter om natten som påvirker søvnen din?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte om natten og når man hviler"],
				Nei: [],
			},
		},
		{
			id: "hipQ13",
			question: "Føler du at smertene i hoften påvirker din daglige aktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Smerte i hoften som forverres ved aktivitet",
					"Begrenset bevegelighet i hoften",
				],
				Nei: [],
			},
		},
		{
			id: "hipQ14",
			question: "Opplever du smerter i andre ledd, som knær eller rygg?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Generell leddsmerter"],
				Nei: [],
			},
		},
		{
			id: "hipQ15",
			question: "Bruker du hjelpemidler som stokk eller krykker for å gå?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Bruk av krykker eller stokk for å minimere belastning"],
				Nei: [],
			},
		},
		{
			id: "hipQ16",
			question:
				"Har du prøvd fysioterapi eller andre behandlinger for dine hofteproblemer?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere behandlinger"],
				Nei: [],
			},
		},
		{
			id: "hipQ17",
			question:
				"Har du opplevd en forverring av smertene i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
		{
			id: "hipQ18",
			question: "Har du bemerket endringer i din gange eller måten du går på?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Endringer i gangart"],
				Nei: [],
			},
		},
		{
			id: "hipQ19",
			question:
				"Har du bemerket redusert muskelkraft i benet på den berørte siden?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert muskelkraft i benet"],
				Nei: [],
			},
		},
		{
			id: "hipQ20",
			question:
				"Opplever du kronisk tretthet eller føler du deg unormalt sliten?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Generell tretthet"],
				Nei: [],
			},
		},
	],
};

export default hipSurvey;

export const elbowSurvey = {
	id: "elbow",
	title: "Albueundersøkelse",
	questions: [
		{
			id: "elbowQ1",
			question: "Hvor ofte opplever du smerter i albuen?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Smerte på utsiden av albuen", "Smerte på innsiden av albuen"],
				Daglig: ["Intens smerte i albuen umiddelbart etter skade"],
			},
		},
		{
			id: "elbowQ2",
			question: "Hvor alvorlig er smerten på en skala fra 0 til 10?",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "elbowQ3",
			question: "Opplever du stivhet i albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet og smerter i albuen"],
				Nei: [],
			},
		},
		{
			id: "elbowQ4",
			question: "Hører du knase- eller knirkelyder når du beveger albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Krepitasjon eller knasing i albuen"],
				Nei: [],
			},
		},
		{
			id: "elbowQ5",
			question: "Føler du nummenhet eller prikking i fingrene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tingling eller nummenhet i ringfingeren og lillefingeren"],
				Nei: [],
			},
		},
		{
			id: "elbowQ6",
			question: "Er det smertefullt å strekke ut eller bøye albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svakhet ved å strekke armen", "Smerte ved direkte trykk"],
				Nei: [],
			},
		},
		{
			id: "elbowQ7",
			question: "Har du hatt en albueskade nylig?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte og stivhet etter skade"],
				Nei: [],
			},
		},
		{
			id: "elbowQ8",
			question: "Opplever du smerter når du utfører grep eller bærer ting?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved grep eller løft"],
				Nei: [],
			},
		},
		{
			id: "elbowQ9",
			question: "Ser du noen hevelse eller rødhet rundt albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hevelse på albueens spiss", "Rødhet og varme i området"],
				Nei: [],
			},
		},
		{
			id: "elbowQ10",
			question: "Føler du at smertene forverres om natten?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte om natten og når man hviler"],
				Nei: [],
			},
		},
		{
			id: "elbowQ11",
			question:
				"Har du problemer med å utføre daglige aktiviteter på grunn av albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svakhet i hånden", "Vansker med å gripe objekter"],
				Nei: [],
			},
		},
		{
			id: "elbowQ12",
			question:
				"Opplever du en økning i smerte etter bestemte aktiviteter eller bevegelser?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved trykk eller aktivitet"],
				Nei: [],
			},
		},
		{
			id: "elbowQ13",
			question: "Har du følt deg svak eller har du mistet styrke i armen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svakhet i håndleddet"],
				Nei: [],
			},
		},
		{
			id: "elbowQ14",
			question: "Bruker du noen form for støtte eller ortose for albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "elbowQ15",
			question: "Opplever du smerter som stråler ned i underarmen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som stråler ned i underarmen"],
				Nei: [],
			},
		},
		{
			id: "elbowQ16",
			question: "Føler du at smertene påvirker din generelle livskvalitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "elbowQ17",
			question:
				"Har du merket en forverring av smertene i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "elbowQ18",
			question: "Har du hatt noen behandlinger for dine albueproblemer?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "elbowQ19",
			question: "Føler du en reduksjon i bevegeligheten til albuen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet"],
				Nei: [],
			},
		},
		{
			id: "elbowQ20",
			question:
				"Har du bemerket noen visuelle forandringer i albuen (som deformitet)?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Markant deformitet av albuen"],
				Nei: [],
			},
		},
	],
};

export default elbowSurvey;

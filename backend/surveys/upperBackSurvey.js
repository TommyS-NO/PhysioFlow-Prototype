export const upperBackSurvey = {
	id: "upperBack",
	title: "Øvre Ryggundersøkelse",
	questions: [
		{
			id: "upperBackQ1",
			question: "Hvor ofte opplever du smerter i øvre rygg?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Kronisk smerte og stivhet i øvre rygg"],
				Daglig: ["Kronisk smerte og stivhet i øvre rygg"],
			},
		},
		{
			id: "upperBackQ2",
			question: "Vurder smerteintensiteten på en skala fra 0 til 10:",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "upperBackQ3",
			question:
				"Opplever du nummenhet eller prikking i skuldrene eller armene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet eller prikking"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ4",
			question:
				"Føler du en skarp smerte ved bevegelser som involverer armene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved armbevegelser"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ5",
			question:
				"Er smerten verre om morgenen eller etter perioder med inaktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet og smerte om morgenen"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ6",
			question: "Føler du at smertene lindres ved bevegelse?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: ["Smerte som forverres ved aktivitet"],
			},
		},
		{
			id: "upperBackQ7",
			question: "Opplever du plutselig svakhet i armene eller hendene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svakhet i armene"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ8",
			question: "Har du følt en knase- eller knirkelyd i ryggen ved bevegelse?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Krepitasjon eller knase-lyder fra ryggen"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ9",
			question: "Opplever du økt smerte ved dyp pusting eller hoste?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerter som forverres ved dyp pusting"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ10",
			question: "Føler du at smertene påvirker din daglige funksjon?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet og fleksibilitet"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ11",
			question:
				"Har du merket en forverring av smertene i kaldt eller fuktig vær?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerter som forverres i kaldt eller fuktig vær"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ12",
			question: "Har du problemer med å sove på grunn av ryggsmertene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Endringer i søvnmønster"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ13",
			question: "Føler du smerte når du løfter eller bærer tunge gjenstander?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved løft eller fysisk anstrengelse"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ14",
			question: "Opplever du en brennende følelse langs ryggen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Brennende følelse langs ryggen"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ15",
			question: "Føler du at ryggsmertene begrenser dine daglige aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert evne til daglige aktiviteter på grunn av smerte"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ16",
			question: "Har du nylig endret dine fysiske aktivitetsnivåer?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte forverret av ny aktivitet"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ17",
			question: "Føler du noen gang svimmelhet sammen med ryggsmertene?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Svimmelhet"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ18",
			question:
				"Har du opplevd noen form for traume eller skade som påvirket øvre rygg?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerter etter skade"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ19",
			question: "Opplever du økt smerte etter lengre perioder med sitting?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved langvarig sitting"],
				Nei: [],
			},
		},
		{
			id: "upperBackQ20",
			question:
				"Har du vært hos en fysioterapeut eller annen helsearbeider for dine ryggproblemer?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere behandlinger"],
				Nei: [],
			},
		},
	],
};

export default upperBackSurvey;

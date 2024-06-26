export const ankleSurvey = {
	id: "ankle",
	title: "Ankelundersøkelse",
	questions: [
		{
			id: "ankleQ1",
			question: "Hvor ofte opplever du smerte i ankelen?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Smerte ved belastning"],
				Daglig: ["Kronisk smerte i ankelen"],
			},
		},
		{
			id: "ankleQ2",
			question: "Vurder smerteintensiteten på en skala fra 0 til 10:",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "ankleQ3",
			question: "Opplever du hevelse i ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Hevelse og blåmerker"],
				Nei: [],
			},
		},
		{
			id: "ankleQ4",
			question: "Føler du nummenhet eller prikking i foten eller tærne?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [
					"Nummenhet i fingrene",
					"Tingling eller brennende følelse langs ribben",
				],
				Nei: [],
			},
		},
		{
			id: "ankleQ5",
			question: "Er smerten verre om morgenen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet i achillessenen, spesielt om morgenen"],
				Nei: [],
			},
		},
		{
			id: "ankleQ6",
			question: "Blir smerten bedre når du er aktiv?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som bedres noe med mild aktivitet"],
				Nei: ["Smerte som forverres etter aktivitet"],
			},
		},
		{
			id: "ankleQ7",
			question: "Har du opplevd et knall- eller snappefenomen i ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Intens smerte", "Plutselig ryggsmerte"],
				Nei: [],
			},
		},
		{
			id: "ankleQ8",
			question: "Har du problemer med å gå eller stå på grunn av ankelsmerter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerter som forverres ved å stå eller gå"],
				Nei: [],
			},
		},
		{
			id: "ankleQ9",
			question: "Har du merket en reduksjon i fleksibiliteten i ankelen din?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Begrenset bevegelighet i ankelen"],
				Nei: [],
			},
		},
		{
			id: "ankleQ10",
			question:
				"Opplever du smerte når du trykker på bestemte områder rundt ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Ømme punkter i musklene", "Smerte ved trykk"],
				Nei: [],
			},
		},
		{
			id: "ankleQ11",
			question: "Hører du en knasende lyd når du beveger på ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Krepitasjon eller knase-lyder fra ryggen"],
				Nei: [],
			},
		},
		{
			id: "ankleQ12",
			question: "Føler du smerte etter langvarig sitting eller ståing?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved langvarig sitting eller ståing"],
				Nei: [],
			},
		},
		{
			id: "ankleQ13",
			question: "Har du nylig hatt en skade som kan ha påvirket ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nakkesmerter og stivhet etter skade"],
				Nei: [],
			},
		},
		{
			id: "ankleQ14",
			question:
				"Føler du at smertene i ankelen begrenser din daglige aktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert bevegelighet og fleksibilitet"],
				Nei: [],
			},
		},
		{
			id: "ankleQ15",
			question:
				"Opplever du forverring av smerten under spesifikke aktiviteter?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som forverres ved bestemte bevegelser"],
				Nei: [],
			},
		},
		{
			id: "ankleQ16",
			question:
				"Er smertene i ankelen ledsaget av feber eller generell uvelhet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Intens, skarp smerte i ankelen", "Feber"],
				Nei: [],
			},
		},
		{
			id: "ankleQ17",
			question: "Har du endret måten du går på for å minske smerten i ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Endringer i gange"],
				Nei: [],
			},
		},
		{
			id: "ankleQ18",
			question:
				"Bruker du ortopediske hjelpemidler som ankelstøtte eller krykker?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Bruk av støtteutstyr"],
				Nei: [],
			},
		},
		{
			id: "ankleQ19",
			question: "Har du tidligere blitt operert i ankelen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere ankelfraktur"],
				Nei: [],
			},
		},
		{
			id: "ankleQ20",
			question: "Føler du at smertene påvirker din generelle livskvalitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert livskvalitet på grunn av smerte"],
				Nei: [],
			},
		},
	],
};

export default ankleSurvey;

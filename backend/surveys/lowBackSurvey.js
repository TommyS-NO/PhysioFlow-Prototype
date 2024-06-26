export const lowBackSurvey = {
	id: "lowBack",
	title: "Undersøkelse av Nedre Rygg",
	questions: [
		{
			id: "lowBackQ1",
			question: "Hvor ofte opplever du smerte i nedre rygg?",
			options: ["Aldri", "Sjelden", "Noen ganger", "Ofte", "Daglig"],
			type: "singleChoice",
			relatedSymptoms: {
				Sjelden: [],
				"Noen ganger": [],
				Ofte: ["Akutt nedre ryggsmerte"],
				Daglig: ["Kronisk ryggsmerte"],
			},
		},
		{
			id: "lowBackQ2",
			question: "Vurder smerteintensiteten på en skala fra 0 til 10:",
			type: "slider",
			minValue: 0,
			maxValue: 10,
		},
		{
			id: "lowBackQ3",
			question: "Opplever du nummenhet eller prikking i bena?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Nummenhet eller svakhet i beina eller føttene"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ4",
			question: "Føler du en skarp smerte som stråler ned til bena?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte som stråler ned i beina"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ5",
			question: "Er smerten i nedre rygg verre om morgenen?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet etter perioder med inaktivitet"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ6",
			question: "Blir smertene bedre etter fysisk aktivitet?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: ["Smerte som forverres ved aktivitet"],
			},
		},
		{
			id: "lowBackQ7",
			question:
				"Har du problemer med å kontrollere blære- eller tarmsfunksjoner?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Problemer med å kontrollere blære- eller tarmsfunksjoner"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ8",
			question: "Har du opplevd plutselig vekttap uten å prøve?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: [],
			},
		},
		{
			id: "lowBackQ9",
			question: "Opplever du en følelse av at ryggen er ustabil?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Følelse av at ryggen er ustabil"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ10",
			question:
				"Føler du ofte stivhet i ryggen etter lengre perioder med sitting?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Stivhet etter perioder med inaktivitet"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ11",
			question:
				"Opplever du smerte som forverres ved løft eller fysisk anstrengelse?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerter som forverres ved å sitte eller løfte"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ12",
			question: "Føler du smerte når du bøyer deg fremover?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved bøyning"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ13",
			question: "Har du begrenset fleksibilitet i hoftene og nedre rygg?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert fleksibilitet i ryggraden"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ14",
			question:
				"Er du i stand til å stå oppreist uten smerte for lengre perioder?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: [],
				Nei: ["Smerte ved langvarig ståing"],
			},
		},
		{
			id: "lowBackQ15",
			question: "Opplever du kroniske smerter som kommer og går over tid?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Periodisk smerte som varierer i intensitet"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ16",
			question: "Har smertene dine ført til at du har endret daglige rutiner?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Endringer i daglige aktiviteter på grunn av smerte"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ17",
			question: "Føler du at smertene påvirker din psykologiske velvære?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Redusert livskvalitet på grunn av kronisk smerte"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ18",
			question:
				"Har du prøvd fysioterapi eller andre behandlinger for din nedre rygg?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere behandlinger"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ19",
			question: "Føler du smerte eller ubehag under kjøring?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Smerte ved kjøring"],
				Nei: [],
			},
		},
		{
			id: "lowBackQ20",
			question: "Har du hatt en ryggoperasjon?",
			options: ["Ja", "Nei"],
			type: "singleChoice",
			relatedSymptoms: {
				Ja: ["Tidligere ryggkirurgi"],
				Nei: [],
			},
		},
	],
};

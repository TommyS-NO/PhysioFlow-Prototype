export const followupSurvey = {
	id: "followup",
	title: "Oppfølgingsundersøkelse etter øvelse",
	questions: [
		{
			id: "followupQ1",
			question:
				"Vurder smerteintensiteten under øvelsen på en skala fra 1 til 10:",
			type: "slider",
			minValue: 1,
			maxValue: 10,
		},
		{
			id: "followupQ2",
			question: "Angi antall minutter du brukte på å gjennomføre øvelsen:",
			type: "numericInput",
		},
		{
			id: "followupQ3",
			question:
				"Vurder vanskelighetsgraden av øvelsen på en skala fra 1 til 10:",
			type: "slider",
			minValue: 1,
			maxValue: 10,
		},
		{
			id: "followupQ4",
			question: "Hvor mange repetisjoner klarte du å gjennomføre av øvelsen?",
			type: "numericInput",
		},
		{
			id: "followupQ5",
			question:
				"Vurder din generelle evne til å utføre øvelsen sammenlignet med din normale funksjon (pasientspesifikk funksjonsskala):",
			type: "slider",
			minValue: 1,
			maxValue: 10,
		},
	],
};

export default followupSurvey;

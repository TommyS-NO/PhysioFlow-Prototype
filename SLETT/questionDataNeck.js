const questionsData = {
  generalQuestions: [
    {
      id: "gen1",
      text: "Er dette første gang du opplever denne typen smerte eller ubehag?",
      options: ["Ja", "Nei"],
    },
    {
      id: "gen2",
      text: "Har du tidligere hatt en skade i samme område som du nå opplever smerte eller ubehag?",
      options: ["Ja", "Nei"],
    },
    {
      id: "gen3",
      text: "Oppstod smerten/ubehaget plutselig uten en åpenbar årsak?",
      options: ["Ja", "Nei"],
    },
    {
      id: "gen4",
      text: "Har du endret ditt fysiske aktivitetsnivå eller startet en ny type trening nylig?",
      options: ["Ja", "Nei"],
    },
    {
      id: "gen5",
      text: "Føler du at daglige aktiviteter eller spesifikke bevegelser utløser eller forverrer smerten/ubehaget?",
      options: ["Ja", "Nei"],
    },
  ],
   focusAreas: {
    neck: {
      name: "Nakke",
      followUps: {
        gen1: {
          Ja: "neck_gen1_ja",
          Nei: "neck_gen1_nei",
        },
        gen2: {
          Ja: "neck_gen2_ja",
          Nei: "neck_gen2_nei",
        },
		gen3: {
          Ja: "neck_gen3_ja",
          Nei: "neck_gen3_nei",
        },
		gen4: {
          Ja: "neck_gen4_ja",
          Nei: "neck_gen4_nei",
        },
		gen5: {
          Ja: "neck_gen5_ja",
          Nei: "neck_gen5_nei",
        },

questionsById: {
        neck_gen1_ja: {
          text: "Beskriv hvordan og når smerten eller ubehaget først startet.",
          options: [
            "Plutselig under en spesifikk aktivitet",
            "Gradvis, uten en spesifikk start",
            "Etter en skade",
            "Annet",
          ],
          followUp: {
            "Plutselig under en spesifikk aktivitet": "neck_gen1_ja_1",
            "Gradvis, uten en spesifikk start": "neck_gen1_ja_2",
            "Etter en skade": "neck_gen1_ja_3",
            "Annet": "neck_gen1_ja_4",
          },
        },
        neck_gen1_ja_1: {
          text: "Beskriv tiltakene du tok umiddelbart etter skaden eller da smerten først ble merkbar.",
          options: [
            "Hvile og selvpålagt begrensning i bevegelse",
            "Søkte medisinsk hjelp",
            "Endret aktivitetsnivå eller daglige rutiner",
            "Annet",
          ],
          other: { type: "text", placeholder: "Vennligst spesifiser" },
          followUp: "neck_gen1_ja_1_followup",
        },
        neck_gen1_ja_1_followup: {
          text: "Har du merket noen forbedring eller endring i dine symptomer etter at du tok i bruk de tiltakene du beskrev?",
          options: [
            "Ja, betydelig forbedring",
            "Ja, noe forbedring",
            "Nei, ingen endring",
            "Nei, symptomene har forverret seg",
            "Annet",
          ],
          other: { type: "text", placeholder: "Vennligst spesifiser" },
          // Her antas det at dette er slutten på sekvensen for dette scenarioet.
        },
        neck_gen1_ja_2: {
          text: "Beskriv eventuelle endringer i livsstil, rutiner eller belastninger som kan ha bidratt til smerten.",
          type: "text",
          placeholder: "For eksempel: nye arbeidsoppgaver, endring i treningsrutiner, etc.",
        },
neck_gen1_ja_3_followup: {
  text: "Hvilken type behandling fikk du etter skaden?",
  type: "multipleChoice",
  options: [
    "Fysioterapi",
    "Kirurgi",
    "Smertelindrende medikasjon",
    "Ingen behandling",
    "Annet",
  ],
  other: { type: "text", placeholder: "Vennligst spesifiser" },
  followUp: {
    "Fysioterapi": "neck_gen1_ja_3_fysio",
    "Kirurgi": "neck_gen1_ja_3_kirurgi",
    "Smertelindrende medikasjon": "neck_gen1_ja_3_medikasjon",
    "Ingen behandling": "neck_gen1_ja_3_ingen",
    "Annet": "neck_gen1_ja_3_annet",
  },
},

neck_gen1_ja_3_fysio: {
  text: "Hvordan vurderer du effekten av fysioterapien du mottok?",
  type: "multipleChoice",
  options: [
    "Svært effektiv",
    "Noe effektiv",
    "Lite eller ingen effekt",
    "Forverret tilstanden",
    "Usikker",
  ],
  other: { type: "text", placeholder: "Har du andre kommentarer angående fysioterapien?" },

},
        // Ytterligere oppfølgingsspørsmål og logikk kan legges til her.
        neck_gen1_ja_4: {
          // Hypotetisk spørsmål og logikk for "Annet" scenario.
          text: "Vennligst gi en detaljert beskrivelse av hvordan smerten eller ubehaget startet.",
          type: "text",
          placeholder: "Beskriv hva som skjedde.",
          // Ytterligere oppfølgingsspørsmål kan legges til etter behov.
        },
		neck_gen1_nei: {
		 text: "Siden du har opplevd denne typen smerte eller ubehag før, kan du beskrive tidligere episoder og om du søkte noen form for behandling?",
         options: [
          	 "Jeg søkte medisinsk hjelp (lege, fysioterapeut, etc.)",
        	 "Jeg behandlet det selv med hvile, medisiner, hjemmeøvelser, etc.",
       		 "Det gikk over av seg selv uten spesifikk behandling",
        	 "Annet"
          ],
          other: { type: "text", placeholder: "Vennligst spesifiser" },
          followUp: "neck_gen1_nei_1_followup",
        },
		neck_gen1_nei_1_followup: {
          text: "Har du merket noen forbedring eller endring i dine symptomer etter at du tok i bruk de tiltakene du beskrev?",
          options: [
            "Ja, betydelig forbedring",
            "Ja, noe forbedring",
            "Nei, ingen endring",
            "Nei, symptomene har forverret seg",
            "Annet",
          ],
            other: { type: "text", placeholder: "Vennligst spesifiser" },
          // Anta at dette er slutten av sekvensen, ingen videre followUp
        },




                  followUps: {
                    "Annet": {
                      text: "Har du merket noen forbedring eller endring i dine symptomer etter at du tok i bruk de tiltakene du beskrev?",
                      type: "multipleChoice",
                      options: [
                        "Ja, betydelig forbedring",
                        "Ja, noe forbedring",
                        "Nei, ingen endring",
                        "Nei, symptomene har forverret seg",
                        "Annet",
                      ],
                      other: { type: "text", placeholder: "Vennligst spesifiser" },
                    },
                    // Her kan du legge til flere alternativer basert på de tidligere valgene og deres oppfølgingsspørsmål
                  }
                },
                // Inkluder tilsvarende oppfølging for "Gradvis, uten en spesifikk start", "Etter en skade", og "Annet"
              }
            },
          ],
          "Nei": [
            // Her kan du legge til oppfølgingsspørsmål for når svaret på gen1 er "Nei"
          ]
        },
        // Inkluder oppfølgingsspørsmål for gen2, gen3, gen4, gen5 på lignende måte
      }
    },
    // Legg til flere fokusområder her med tilsvarende struktur
  }
};






  Ja: [{
    text: "Beskriv hvordan og når smerten eller ubehaget først startet.",
    options: [
      "Plutselig under en spesifikk aktivitet",
      "Gradvis, uten en spesifikk start",
      "Etter en skade",
      "Annet",
    ],
    followUps: {
      "Plutselig under en spesifikk aktivitet": {
        type: "text",
        placeholder: "Beskriv aktiviteten og de eksakte omstendighetene da smerten eller ubehaget oppstod."
      },
      "Gradvis, uten en spesifikk start": {
        type: "text",
        placeholder: "Beskriv eventuelle endringer i livsstil, rutiner eller belastninger som kan ha bidratt til smerten."
      },
      "Etter en skade": {
        type: "text",
        placeholder: "Fortell om skaden som førte til smerten/ubehaget. Hvordan og når skjedde det?"
      },
      Annet: {
        type: "text",
        placeholder: "Vennligst gi en detaljert beskrivelse av hvordan smerten eller ubehaget startet."
      }
    }
  }],
},
//    Nei: [{
//       text: "Siden du har opplevd denne typen smerte eller ubehag før, kan du beskrive tidligere episoder og om du søkte noen form for behandling?",
//       options: [
//         "Jeg søkte medisinsk hjelp (lege, fysioterapeut, etc.)",
//         "Jeg behandlet det selv med hvile, medisiner, hjemmeøvelser, etc.",
//         "Det gikk over av seg selv uten spesifikk behandling",
//         "Annet"
//       ],
//       followUps: {
//         "Jeg søkte medisinsk hjelp (lege, fysioterapeut, etc.)": {
//           text: "Kan du fortelle mer om typen behandling du mottok og om den hjalp?",
//           type: "text",
//           placeholder: "Beskriv behandlingen og dens effektivitet."
//         },
//         "Jeg behandlet det selv med hvile, medisiner, hjemmeøvelser, etc.": {
//           text: "Hvilke selvbehandlingstiltak tok du, og følte du at det hjalp?",
//           type: "text",
//           placeholder: "Beskriv dine selvbehandlingstiltak og deres effekt."
//         },
//         "Det gikk over av seg selv uten spesifikk behandling": {
//           text: "Hvor lenge varte ubehaget før det gikk over på egen hånd?",
//           type: "text",
//           placeholder: "Angi varigheten av ubehaget."
//         },
//         Annet: {
//           type: "text",
//           placeholder: "Vennligst beskriv andre tiltak du tok eller omstendigheter rundt tidligere episoder."
//         }
//       }
//     }]
//   },
  // Ytterligere oppfølgningspørsmål for de andre generelle spørsmålene...
}


	followUpNeck: {[

			// {
			// 	text: "Beskriv hvordan og når smerten eller ubehaget først startet.",
			// 	type: "multipleChoice",
			// 	options: [
			// 		"Plutselig under en spesifikk aktivitet",
			// 		"Gradvis, uten en spesifikk start",
			// 		"Etter en skade",
			// 		"Annet",
			// 	],
			// 	other: { type: "text", placeholder: "Vennligst spesifiser" },
			// },
			{
				text: "Hvilken av de følgende faktorene tror du kan ha bidratt til smerten eller ubehaget?",
				type: "multipleChoice",
				options: [
					"Endringer i arbeidsstilling",
					"Økt stressnivå",
					"Søvnkvalitet",
					"Nylig startet med en ny type trening",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvis smerten eller ubehaget er relatert til en tidligere skade, hvordan ble denne skaden behandlet?",
				type: "multipleChoice",
				options: [
					"Med medisiner",
					"Med fysioterapi eller annen fysisk behandling",
					"Kirurgi",
					"Ble ikke behandlet / Selvhelbredet",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Opplever du noen av de følgende symptomene sammen med smerten eller ubehaget i nakken?",
				type: "multipleChoice",
				options: [
					"Smerte som stråler ned til armen eller fingrene",
					"Nummenhet eller prikking i armene, skuldrene eller fingrene",
					"Redusert bevegelighet i nakken",
					"Forverres ved å holde hodet i en stilling over lengere tid",
					"Påvirker søvnkvaliteten",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvor ofte opplever du smerte eller ubehag? ",
				type: "multipleChoice",
				options: [
					"Konstant",
					"Ofte, men ikke konstant",
					"Periodisk / Av og til",
					"Sjelden",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
//NO starter her


			{
				text: "Hvordan ville du vurdere din generelle kroppsholdning gjennom dagen?",
				type: "multipleChoice",
				options: [
					"God, jeg er bevisst på min holdning",
					"Variabel, noen ganger god og noen ganger dårlig",
					"Dårlig, jeg sliter med å opprettholde god holdning",
					"Usikker",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvor ofte tar du pauser for å strekke på deg eller endre posisjon når du sitter over lengre perioder?",
				type: "multipleChoice",
				options: [
					"Regelmessig hver time",
					"Noen ganger",
					"Sjelden eller aldri",
					"Varierer",
				],
			},
			{
				text: "På en skala fra 1 til 10, hvor stresset føler du deg i hverdagen? (Der 1 er 'ikke stresset' og 10 er 'ekstremt stresset')",
				type: "slider",
				scaleMin: 1,
				scaleMax: 10,
				followUpText:
					"Kan du nevne noen faktorer som bidrar til ditt stressnivå?",
			},
			{
				text: "Hvilke tiltak har du gjennomført for å forebygge smerte eller ubehag i nakken? (Velg alt som passer)",
				type: "multipleChoice",
				options: [
					"Ergonomiske justeringer av arbeidsstasjonen",
					"Regelmessige pauser og tøyninger",
					"Øvelser for å styrke nakke og rygg",
					"Bevisstgjøring rundt kroppsholdning",
					"Ingen spesifikke tiltak tatt",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
		//step2 på ja

			{
				text: "Beskriv tiltakene du tok umiddelbart etter skaden eller da smerten først ble merkbar.",
				type: "multipleChoice",
				options: [
					"Hvile og selvpålagt begrensning i bevegelse",
					"Søkte medisinsk hjelp ",
					"Endret aktivitetsnivå eller daglige rutiner",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvilke spesifikke endringer har du gjort for å unngå eller redusere disse triggerne?",
				type: "multipleChoice",
				options: [
					"Modifisering av aktiviteter ",
					"Øvelser eller tøyninger spesifikt designet for å målrettet problemområdet",
					"Bruk av støtteutstyr eller ergonomiske hjelpemidler",
					"Annet",
				],
			},
			{
				text: "Vurder intensiteten og frekvensen av smerten/ubehaget du opplever",
				type: "slider",
				scaleMin: 1,
				scaleMax: 10,
				followUpText: "Vennligst spesifiser",
			},

			{
				text: "Spesifiser aktiviteter som forverrer dine symptomer",
				type: "multipleChoice",
				options: [
					"Arbeidsrelaterte oppgaver",
					"Husholdningsaktiviteter",
					"Fritidsaktiviteter eller sport",
					"Lange perioder med inaktivitet",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvilken effekt har de tiltakene du har implementert hatt på dine symptomer?",
				type: "multipleChoice",
				options: [
					"Betydelig forbedring",
					"Noe forbedring",
					"Ingen forandring",
					"Forverring",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},

		//Steg 2 nei

			{
				text: "Har du tatt noen forebyggende tiltak for å opprettholde god nakkehelse?",
				type: "multipleChoice",
				options: [
					"Ja, jeg praktiserer regelmessig øvelser eller tøyninger for nakken",
					"Ja, jeg har gjort ergonomiske tilpasninger til min arbeids- eller livsstil",
					"Nei, men jeg er interessert i å lære mer om forebyggende tiltak",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Observerer du regelmessig din holdning og ergonomi for å forhindre fremtidige problemer?",
				type: "multipleChoice",
				options: [
					"Ja, jeg er bevisst på min holdning og gjør justeringer regelmessig",
					"Nei, men jeg ønsker råd om hvordan forbedre dette",
					"Jeg er usikker på hva god ergonomi innebærer",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvilke forebyggende tiltak har du vurdert eller implementert for å opprettholde nakkehelsen?",
				type: "multipleChoice",
				options: [
					"Ergonomiske tilpasninger på arbeidsplassen",
					"Regelmessig fysisk aktivitet eller tøyning",
					"Bevissthet rundt holdning",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Føler du at du har tilstrekkelig kunnskap og tilgang til ressurser for å effektivt forebygge eller håndtere fremtidige nakkeproblemer?",
				type: "multipleChoice",
				options: [
					"Ja, jeg føler meg godt informert",
					"Delvis, jeg kunne hatt nytte av mer informasjon",
					"Nei, jeg føler meg usikker og trenger mer veiledning",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},

		//Steg 3

			{
				text: "Har du merket noen forbedring eller endring i dine symptomer etter at du tok i bruk de tiltakene du beskrev?",
				type: "multipleChoice",
				options: [
					"Ja, betydelig forbedring",
					"Ja, noe forbedring",
					"Nei, ingen endring",
					"Nei, symptomene har forverret seg",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Hvordan har dine symptomer påvirket din daglige aktivitet og livskvalitet?",
				type: "multipleChoice",
				options: [
					"Ingen påvirkning",
					"Liten påvirkning",
					"Moderat påvirkning",
					"Betydelig påvirkning",
					"Ekstrem påvirkning",
					"Annet",
				],
				other: { type: "text", placeholder: "Kan du gi et eksempel?" },
			},
			{
				text: "Bruker du medisiner for å lindre dine symptomer? Hvis ja, føler du at de er effektive?",
				type: "multipleChoice",
				options: [
					"Ja, og de er effektive",
					"Ja, men de er ikke spesielt effektive",
					"Nei, jeg bruker ikke medisiner",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Har du søkt profesjonell hjelp for dine symptomer (for eksempel fysioterapeut, kiropraktor, lege)?",
				type: "multipleChoice",
				options: [
					"Ja, og det var hjelpsomt",
					"Ja, men det var ikke hjelpsomt",
					"Nei, men jeg vurderer det",
					"Nei, og jeg har ikke planer om det",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
			{
				text: "Finnes det spesifikke øyeblikk på dagen hvor dine symptomer føles verre eller bedre? Beskriv.",
				type: "text",
			},
			{
				text: "Hvilke forventninger har du til forbedring? Ser du etter komplette løsninger, forbedringsstrategier, eller måter å håndtere symptomer på?",
				type: "multipleChoice",
				options: [
					"Komplette løsninger",
					"Forbedringsstrategier",
					"Måter å håndtere symptomer på",
					"Annet",
				],
				other: { type: "text", placeholder: "Vennligst spesifiser" },
			},
		],
	},
};
module.exports = { questionsData };

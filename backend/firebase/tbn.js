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
			},
			questionsById: {
				neck_gen1_ja: {
					text: "Beskriv hvordan og når smerten eller ubehaget først startet.",
					type: "multipleChoice",
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
					},

					// Definer spørsmål for hver oppfølging Spørsmål (1)
					neck_gen1_ja_1: {
						text: "Hvordan reagerte du umiddelbart på denne aktiviteten?",
						type: "multipleChoice",
						options: [
							"Stoppet aktiviteten umiddelbart",
							"Fortsatte til tross for smerte",
							"Tok pause før jeg fortsatte",
							"Annet",
						],
						followUp: {
							"Stoppet aktiviteten umiddelbart": "neck_gen1_ja_1_1",
							"Fortsatte til tross for smerte": "neck_gen1_ja_1_2",
							"Tok pause før jeg fortsatte": "neck_gen1_ja_1_3",
						},

						neck_gen1_ja_1_1: {
							text: "Søkte du medisinsk hjelp etter å ha stoppet aktiviteten?",
							type: "multipleChoice",
							options: [
								"Ja, umiddelbart",
								"Nei, ventet for å se om det ble bedre",
								"Kun hjemmebehandling",
							],
							followUp: {
								"Ja, umiddelbart": "neck_gen1_ja_1_1_1",
								"Nei, ventet for å se om det ble bedre": "neck_gen1_ja_1_1_2",
								"Kun hjemmebehandling": "neck_gen1_ja_1_1_3",
							},
							neck_gen1_ja_1_1_1: {
								text: "Etter å ha søkt medisinsk hjelp umiddelbart, hvilken type behandling mottok du?",
								type: "multipleChoice",
								options: [
									"Fikk reseptbelagte smertestillende medikamenter",
									"Gjennomgikk fysioterapi eller manuell behandling",
									"Undersøkelser og tester uten spesifikk behandling etterpå",
									"Anbefalt hvile og selvomsorg uten medisinske inngrep",
									"Annet",
								],
							},
							neck_gen1_ja_1_1_2: {
								text: "Du ventet for å se om det ble bedre. Hvilke tiltak tok du i denne venteperioden?",
								type: "multipleChoice",
								options: [
									"Brukte over-the-counter smertestillende",
									"Anvendte is eller varmebehandling",
									"Prøvde lette strekkøvelser eller bevegelse",
									"Ingen tiltak, bare hvile",
									"Annet",
								],
							},
							neck_gen1_ja_1_1_3: {
								text: "Du tok en pause før du fortsatte. Hva hjalp deg til å beslutte å gjenoppta aktiviteten?",
								type: "multipleChoice",
								options: [
									"Smerten føltes mindre intens",
									"Følte meg fysisk bedre etter hvilen",
									"Tok smertestillende som hjalp",
									"Annet",
								],
							},
						},
					},
					neck_gen1_ja_1_2: {
						text: "Du nevnte at du fortsatte aktiviteten til tross for smerten i nakken. Kan du fortelle mer om hvorfor du valgte å fortsette og hvordan dette påvirket deg?",
						type: "multipleChoice",
						options: [
							"Jeg trodde smerten ville gå over av seg selv",
							"Jeg følte at jeg måtte fullføre aktiviteten, uavhengig av smerte",
							"Jeg var ikke klar over alvorlighetsgraden av smerten på det tidspunktet",
							"Jeg tok tiltak for å håndtere smerten men fortsatte med aktiviteten",
						],
						followUp: {
							"Jeg trodde smerten ville gå over av seg selv":
								"neck_gen1_ja_1_2_1",
							"Jeg følte at jeg måtte fullføre aktiviteten, uavhengig av smerte":
								"neck_gen1_ja_1_2_2",
							"Jeg var ikke klar over alvorlighetsgraden av smerten på det tidspunktet":
								"neck_gen1_ja_1_2_3",
							"Jeg tok tiltak for å håndtere smerten men fortsatte med aktiviteten":
								"neck_gen1_ja_1_2_4",
						},
						neck_gen1_ja_1_2_1: {
							text: "Til tross for smerten, valgte du å tro at den ville gå over av seg selv. Observerte du noen endringer i smerteintensiteten som følge av denne beslutningen?",
							type: "multipleChoice",
							options: [
								"Ja, smerten reduserte gradvis og forsvant",
								"Smerten vedvarte, men jeg tilpasset meg og fortsatte",
								"Smerten økte, men jeg fortsatte likevel",
								"Ingen endring, smerten forble konstant",
							],
						},
						neck_gen1_ja_1_2_2: {
							text: "Du følte at du måtte fullføre aktiviteten, uavhengig av smerten. Hvilke konsekvenser hadde dette for din fysiske tilstand eller smertenivå?",
							type: "multipleChoice",
							options: [
								"Smerten forverret seg etter aktiviteten",
								"Jeg opplevde umiddelbar forverring, men det stabiliserte seg",
								"Det var ingen merkbar endring i smerten",
								"Jeg fant måter å redusere smerten på mens jeg fortsatte",
							],
						},
						neck_gen1_ja_1_2_3: {
							text: "Når du ikke var klar over alvorlighetsgraden av smerten på det tidspunktet, hvordan reflekterer du nå over den beslutningen?",
							type: "multipleChoice",
							options: [
								"Jeg angrer og skulle ønske jeg stoppet tidligere",
								"Jeg tror det var den riktige beslutningen på det tidspunktet",
								"Jeg er usikker, men tror det kunne forverret situasjonen",
								"Det har lært meg å være mer oppmerksom på kroppens signaler",
							],
						},
						neck_gen1_ja_1_2_4: {
							text: "Du tok tiltak for å håndtere smerten men fortsatte med aktiviteten. Hvilke tiltak fant du mest effektive?",
							type: "multipleChoice",
							options: [
								"Midlertidig hvile eller pause under aktiviteten",
								"Bruk av smertestillende midler for å fortsette",
								"Modifisering av aktiviteten for å redusere belastningen",
								"Ingen tiltak var spesielt effektive",
							],
						},
					},
					neck_gen1_ja_1_3: {
						text: "Du nevnte at smerten eller ubehaget startet etter en skade. Kan du beskrive hvordan skaden skjedde?",
						type: "multipleChoice",
						options: [
							"Under fysisk aktivitet eller sport",
							"Ved en ulykke (f.eks. trafikkulykke, fall)",
							"Gjennom en plutselig bevegelse eller overanstrengelse",
							"Annet",
						],
						followUp: {
							"Under fysisk aktivitet eller sport": "neck_gen1_ja_1_3_1",
							"Ved en ulykke (f.eks. trafikkulykke, fall)":
								"neck_gen1_ja_1_3_2",
							"Gjennom en plutselig bevegelse eller overanstrengelse":
								"neck_gen1_ja_1_3_3",
						},
						neck_gen1_ja_1_3_1: {
							text: "Hvordan reagerte du og hva var dine umiddelbare tiltak etter skaden under fysisk aktivitet eller sport?",
							type: "multipleChoice",
							options: [
								"Stoppet aktiviteten og søkte umiddelbar hjelp",
								"Fortsatte aktiviteten med smerte",
								"Brukte selvbehandlingstiltak (is, hvile, smertestillende)",
								"Annet",
							],
							// Eventuell oppfølging
						},
						neck_gen1_ja_1_3_2: {
							text: "Etter ulykken, hvilke skritt tok du for å håndtere skaden?",
							type: "multipleChoice",
							options: [
								"Søkte medisinsk hjelp umiddelbart",
								"Avventet for å se om smerten gikk over av seg selv",
								"Anvendte selvbehandlingstiltak hjemme",
								"Annet",
							],
							// Eventuell oppfølging
						},
						neck_gen1_ja_1_3_3: {
							text: "Beskriv de tiltakene du tok umiddelbart etter skaden som skjedde gjennom en plutselig bevegelse eller overanstrengelse.",
							type: "multipleChoice",
							options: [
								"Søkte råd eller behandling fra helsepersonell",
								"Anvendte smertelindring eller støttebandasje",
								"Tok en pause fra alle fysiske aktiviteter",
								"Annet",
							],
							// Eventuell oppfølging
						},
					},
				},
				neck_gen1_nei: {
					text: "Siden du har opplevd denne typen smerte eller ubehag før, kan du beskrive tidligere episoder og om du søkte noen form for behandling?",
					type: "multipleChoice",
					options: [
						"Jeg søkte medisinsk hjelp (lege, fysioterapeut, etc.)",
						"Jeg behandlet det selv med hvile, medisiner, hjemmeøvelser, etc.",
						"Det gikk over av seg selv uten spesifikk behandling",
						"Annet",
					],
					followUp: {
						"Jeg søkte medisinsk hjelp (lege, fysioterapeut, etc.)":
							"neck_gen1_nei_1",
						"Jeg behandlet det selv med hvile, medisiner, hjemmeøvelser, etc.":
							"neck_gen1_nei_1_2",
						"Det gikk over av seg selv uten spesifikk behandling":
							"neck_gen1_nei_1_3",
						Annet: "neck_gen1_nei_1_4",
					},
					neck_gen1_nei_1_1: {
						text: "Hvilken type medisinsk hjelp søkte du, og følte du at det hjalp?",
						type: "multipleChoice",
						options: [
							"Fysioterapi som forbedret situasjonen",
							"Medisinsk undersøkelse uten klar forbedring",
							"Kirurgi som var nødvendig for bedring",
							"Annet",
						],
					},
					neck_gen1_nei_1_2: {
						text: "Hvilke selvbehandlingstiltak fant du mest effektive?",
						type: "multipleChoice",
						options: [
							"Smertestillende medisiner",
							"Hvile og begrensning av aktiviteter",
							"Hjemmeøvelser og stretching",
							"Annet",
						],
						// Legg til oppfølgingsspørsmål om nødvendig.
					},
					neck_gen1_nei_1_3: {
						text: "Hvor lenge tok det før smerten eller ubehaget gikk over av seg selv?",
						type: "slider",
						min: 0,
						max: 90,
						step: 1,
						unit: "dager",
						defaultValue: 14,
						label: "Vennligst angi antall dager (0-90 dager)",
					},
					neck_gen1_nei_1_4: {
						text: "Kan du beskrive de spesifikke omstendighetene eller tiltakene du tok som ikke passer inn i de tidligere kategoriene?",
						type: "text",
						placeholder: "Vennligst gi detaljer",
					},
				},
			},
		},
	},
};

/*		***INFO***
Opprettet : 31.03.24
Lastet opp: 31.03.24 (Firestore Db)
Kan brukes som mal for de andre fokusområdene!
-----Redigert-----


-------End-------

---scripts/uploadquestion.js


***END****
*/

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
				// Definer spørsmål for hver oppfølging Spørsmål (1)
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
					neck_gen1_nei_1: {
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
				// Definer spørsmål for hver oppfølging Spørsmål (2)
				neck_gen2_ja: {
					text: "Fortell mer om den tidligere skaden i dette området",
					type: "multipleChoice",
					options: [
						"Behandlet med fysioterapi",
						"Operasjon gjennomført",
						"Selvbehandling",
						"Ikke behandlet",
						"Annet",
					],
					followUp: {
						"Behandlet med fysioterapi": "neck_gen2_ja_1",
						"Operasjon gjennomført": "neck_gen2_ja_2",
						Selvbehandling: "neck_gen2_ja_3",
						"Ikke behandlet": "neck_gen2_ja_4",
					},
					neck_gen2_ja_1: {
						text: "Hvordan reagerte kroppen din på fysioterapibehandlingen?",
						type: "multipleChoice",
						options: [
							"Tilfriskning uten problemer",
							"Noen forbedringer, men ikke helt tilfrisknet",
							"Ingen endring i tilstand",
							"Forverring av tilstand",
							"Annet",
						],
						followUp: {
							"Tilfriskning uten problemer": "neck_gen2_ja_1_1",
							"Noen forbedringer, men ikke helt tilfrisknet":
								"neck_gen2_ja_1_2",
							"Ingen endring i tilstand": "neck_gen2_ja_1_3",
							"Forverring av tilstand": "neck_gen2_ja_1_4",
							"beskrivelse av tilstand": "neck_gen2_ja_1_5",
						},
					},
					neck_gen2_ja_1_1: {
						text: "For å opprettholde din gode tilstand, hvilke vedlikeholdstiltak har du iverksatt?",
						type: "multipleChoice",
						options: [
							"Regelmessige øvelser eller fysisk aktivitet",
							"Periodiske kontroller hos fysioterapeut",
							"Ingen spesielle tiltak, føler meg frisk",
							"Annet",
						],
						// Ingen videre oppfølging da dette er slutten på rekken.
					},
					neck_gen2_ja_1_2: {
						text: "Hvilke planer har du for å adressere de gjenværende symptomene?",
						type: "multipleChoice",
						options: [
							"Fortsette med fysioterapi eller profesjonell oppfølging",
							"Selvadministrerte øvelser og behandlinger",
							"Vurderer alternative behandlingsmetoder",
							"Annet",
						],
						followUp: {
							"Vurderer alternative behandlingsmetoder": "neck_gen2_ja_1_2_alt",
						},
					},
					neck_gen2_ja_1_2_alt: {
						text: "Hvilke alternative behandlingsmetoder vurderer du?",
						type: "text",
						// Her tillater vi brukeren å gi en åpen tekstrespons.
					},
					neck_gen2_ja_1_3: {
						text: "Hva er ditt neste skritt ettersom tilstanden ikke har endret seg?",
						type: "multipleChoice",
						options: [
							"Søke en ny vurdering fra en annen helseprofesjonell",
							"Utforske nye behandlingsmetoder",
							"Fortsette å observere tilstanden over tid",
							"Annet",
						],
						// Ytterligere oppfølging kan være nødvendig basert på brukerens respons.
					},
					neck_gen2_ja_1_4: {
						text: "Ettersom tilstanden din har forverret seg, hvilke umiddelbare tiltak har du planer om å ta?",
						type: "multipleChoice",
						options: [
							"Kontakte min fysioterapeut eller lege umiddelbart",
							"Ta ytterligere diagnostiske tester",
							"Revidere min nåværende behandlingsplan",
							"Annet",
						],
						// Ytterligere oppfølging kan være nødvendig for å tilpasse behandlingsplanen.
					},
					neck_gen2_ja_1_5: {
						text: "Vennligst beskriv eventuelle andre reaksjoner eller tiltak du har tatt i forhold til behandlingen.",
						type: "text",
						// Her tillater vi brukeren å gi en åpen tekstrespons.
					},
				},
				neck_gen2_nei: {
					text: "Hvis dette er første gangen, hvordan har du tidligere håndtert lignende smerte eller ubehag i andre deler av kroppen?",
					type: "multipleChoice",
					options: [
						"Vanligvis søker jeg medisinsk hjelp",
						"Jeg foretrekker selvbehandling",
						"Jeg venter og ser om det går over av seg selv",
						"Jeg har ikke hatt lignende smerte før",
						"Annet",
					],
					followUp: {
						"Vanligvis søker jeg medisinsk hjelp": "neck_gen2_nei_1",
						"Jeg foretrekker selvbehandling": "neck_gen2_nei_2",
						"Jeg venter og ser om det går over av seg selv": "neck_gen2_nei_3",
						"Jeg har ikke hatt lignende smerte før": "neck_gen2_nei_4",
						"Vennligst sesifiser": "neck_gen2_nei_5",
					},
					neck_gen2_nei_1: {
						text: "Hvilken type medisinsk hjelp søker du vanligvis?",
						type: "multipleChoice",
						options: ["Fastlege", "Fysioterapeut", "Kiropraktor", "Annet"],
					},
					neck_gen2_nei_2: {
						text: "Hvilke selvbehandlingstiltak har du funnet mest effektive?",
						type: "multipleChoice",
						options: [
							"Smertestillende medisiner",
							"Tøyninger og øvelser",
							"Varme- eller isbehandlinger",
							"Annet",
						],
						// Ingen videre oppfølging da dette er slutten på rekken.
					},
					neck_gen2_nei_3: {
						text: "Hvor lenge venter du vanligvis før du vurderer å søke hjelp hvis smerten ikke forbedrer seg?",
						type: "slider",
						min: 0,
						max: 90,
						step: 1,
						unit: "dager",
						defaultValue: 14,
						label: "Vennligst angi antall dager (0-90 dager)",
					},
					neck_gen2_nei_4: {
						text: "Hvordan planlegger du å håndtere denne nye smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Søke informasjon online",
							"Konsultere en helseprofesjonell",
							"Avvente og se om det forbedrer seg med tiden",
							"Annet",
						],
					},
					neck_gen2_nei_5: {
						text: "Vennligst spesifiser andre måter du har håndtert lignende smerte eller ubehag på.",
						type: "text",
						placeholder: "Gi en detaljert beskrivelse.",
					},
				},
				// Definer spørsmål for hver oppfølging Spørsmål (3)
				neck_gen3_ja: {
					text: "Beskriv hvordan og når smerten eller ubehaget først startet.",
					type: "multipleChoice",
					options: [
						"Plutselig under en spesifikk aktivitet",
						"Gradvis, uten en spesifikk start",
						"Etter en skade",
						"Annet",
					],
					followUp: {
						"Plutselig under en spesifikk aktivitet": "neck_gen3_ja_1",
						"Gradvis, uten en spesifikk start": "neck_gen3_ja_2",
						"Etter en skade": "neck_gen3_ja_3",
					},

					neck_gen3_ja_1: {
						text: "Beskriv omstendighetene nærmere. Var det under spesifikke aktiviteter eller i hvile?",
						type: "multipleChoice",
						options: [
							"Under fysisk aktivitet",
							"I hvile eller uten aktivitet",
							"Ved spesielle bevegelser",
							"Kan ikke knytte det til spesifikke handlinger",
							"Spesifiser",
						],
						followUp: {
							"Under fysisk aktivitet": "neck_gen3_ja_1_1",
							"I hvile eller uten aktivitet": "neck_gen3_ja_1_2",
							"Ved spesielle bevegelser": "neck_gen3_ja_1_3",
							"Kan ikke knytte det til spesifikke handlinger":
								"neck_gen3_ja_1_4",
						},
						neck_gen3_ja_1_1: {
							text: "Hva slags fysisk aktivitet var du engasjert i da smerten oppstod?",
							type: "multipleChoice",
							options: [
								"Trening eller sport",
								"Husarbeid eller hagearbeid",
								"På jobb eller under profesjonelle aktiviteter",
								"Fritidsaktiviteter",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen3_ja_1_1_alt",
							},
							neck_gen3_ja_1_1_alt: {
								text: "Vennligst spesifiser typen fysisk aktivitet.",
								type: "text",
							},
						},
						neck_gen3_ja_1_2: {
							text: "Du nevnte at smerten oppstod i hvile eller uten aktivitet. Kan du beskrive nærmere omstendighetene rundt når og hvordan smerten oppstår?",
							type: "multipleChoice",
							options: [
								"Under langvarig sittende eller stående",
								"Om natten eller ved hvile",
								"Uten noen åpenbar utløsende faktor",
								"Ved spesifikke hvilestillinger",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen3_ja_1_2_1",
							},
							neck_gen3_ja_1_2_1: {
								text: "Vennligst beskriv andre tiltak du har forsøkt.",
								type: "text",
							},
						},
						neck_gen3_ja_1_3: {
							text: "Du nevnte at smerten oppstår ved spesielle bevegelser. Kan du beskrive hvilke bevegelser som utløser smerten?",
							type: "multipleChoice",
							options: [
								"Bøying eller vridning av nakken",
								"Løfting av gjenstander",
								"Rekkevidde eller strekking",
								"Hodets bevegelser, som å se opp eller ned",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen3_ja_1_3_alt",
							},
						},
						neck_gen3_ja_1_3_alt: {
							text: "Vennligst spesifiser hvilke andre bevegelser som utløser smerten.",
							type: "text",
						},
						neck_gen3_ja_1_4: {
							text: "Du nevnte at du ikke kan knytte smerten til spesifikke handlinger. Kan du beskrive smertens karakter eller når den føles mest intens?",
							type: "multipleChoice",
							options: [
								"Konstant smerte uavhengig av bevegelse",
								"Intermitterende, uten åpenbar utløsende årsak",
								"Forverres i løpet av dagen",
								"Forverres etter perioder med inaktivitet",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen3_ja_1_4_alt",
							},
						},

						neck_gen3_ja_1_4_alt: {
							text: "Vennligst beskriv andre omstendigheter rundt smerten.",
							type: "text",
						},
					},
				},
				neck_gen3_nei: {
					text: "Siden smerten/ubehaget ikke oppstod plutselig uten en åpenbar årsak, kan du identifisere faktorer eller situasjoner som bidro til eller forverret smerten?",
					type: "multipleChoice",
					options: [
						"Stress eller emosjonelt press",
						"Fysiske aktiviteter eller overanstrengelse",
						"Langvarig stilling, som sittende eller stående",
						"Endringer i vær eller klima",
						"Annet",
					],
					followUp: {
						"Stress eller emosjonelt press": "neck_gen3_nei_1",
						"Fysiske aktiviteter eller overanstrengelse": "neck_gen3_nei_2",
						"Langvarig stilling, som sittende eller stående": "neck_gen3_nei_3",
						"Endringer i vær eller klima": "neck_gen3_nei_4",
					},
					neck_gen3_nei_1: {
						text: "Du nevnte stress eller emosjonelt press. Har du prøvd noen teknikker eller metoder for å håndtere dette som har påvirket smerten?",
						type: "multipleChoice",
						options: [
							"Ja, med positiv effekt på smerten",
							"Ja, men uten merkbar effekt på smerten",
							"Nei, har ikke prøvd spesifikke metoder",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen3_nei_1_alt",
						},
					},

					neck_gen3_nei_1_alt: {
						text: "Vennligst beskriv hvilke andre metoder eller teknikker du har vurdert eller prøvd.",
						type: "text",
					},
					neck_gen3_nei_2: {
						text: "Du nevnte fysiske aktiviteter eller overanstrengelse. Kan du beskrive disse aktivitetene nærmere, og om du tok noen tiltak for å redusere smerten etterpå?",
						type: "multipleChoice",
						options: [
							"Trening eller sport som belaster nakken",
							"Arbeidsrelaterte aktiviteter som forårsaker spenning",
							"Tunge løft eller repetitiv bevegelse",
							"Ingen spesifikke tiltak tatt, smerten forsvant gradvis",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen3_nei_2_alt",
						},
					},

					neck_gen3_nei_2_alt: {
						text: "Vennligst beskriv hvilke andre aktiviteter som kan ha bidratt til smerten, eller hvilke tiltak du vurderer å ta.",
						type: "text",
					},
					neck_gen3_nei_3: {
						text: "Du nevnte langvarig stilling, som sittende eller stående. Har du gjort noen endringer i din daglige rutine eller arbeidsmiljø for å forbedre situasjonen?",
						type: "multipleChoice",
						options: [
							"Ja, jeg har tilpasset min arbeidsstasjon for bedre ergonomi",
							"Ja, jeg tar regelmessige pauser for å bevege meg",
							"Nei, men jeg er åpen for forslag",
							"Jeg har prøvd, men smerten vedvarer",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen3_nei_3_alt",
						},
					},

					neck_gen3_nei_3_alt: {
						text: "Vennligst del hvilke spesifikke endringer eller tiltak du har vurdert eller allerede implementert for å håndtere smerten.",
						type: "text",
					},
				},
				// Definer spørsmål for hver oppfølging Spørsmål (4)
				neck_gen4_ja: {
					text: "Hva slags endring gjorde du i ditt fysiske aktivitetsnivå eller hvilken ny type trening startet du nylig?",
					type: "multipleChoice",
					options: [
						"Startet med en ny sport",
						"Økte intensiteten på eksisterende treningsrutine",
						"Gjenopptok trening etter en pause",
						"Endret type fysiske aktiviteter",
						"Annet",
					],
					followUp: {
						"Startet med en ny sport": "neck_gen4_ja_1",
						"Økte intensiteten på eksisterende treningsrutine":
							"neck_gen4_ja_2",
						"Gjenopptok trening etter en pause": "neck_gen4_ja_3",
						"Endret type fysiske aktiviteter": "neck_gen4_ja_4",
						Annet: "neck_gen4_ja_5",
					},
					neck_gen4_ja_1: {
						text: "Fortell mer om den nye sporten du startet med. Tror du den har bidratt til smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Ja, smerten oppstod etter å ha startet med denne sporten",
							"Nei, smerten synes ikke å være relatert",
							"Usikker på sammenhengen",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen4_ja_1_alt",
						},
						neck_gen4_ja_1_alt: {
							text: "Vennligst beskriv din opplevelse og tanker rundt den nye sporten og smerten.",
							type: "text",
						},
					},
					neck_gen4_ja_2: {
						text: "Hvordan økte du intensiteten i din eksisterende treningsrutine, og hvordan tror du det påvirket smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Økte varigheten av treningsøkter",
							"Inkluderte mer krevende øvelser",
							"Reduserte hviletiden mellom sett",
							"Økte treningsfrekvensen",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen4_ja_2_alt",
						},

						neck_gen4_ja_2_alt: {
							text: "Vennligst beskriv den spesifikke endringen i din treningsrutine.",
							type: "text",
						},
					},
					neck_gen4_ja_3: {
						text: "Hvilke tiltak tok du for å gjenoppta treningen etter pausen, og føler du at det hadde noen effekt på smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Startet gradvis for å bygge opp styrke",
							"Fokuserte på lav-impact øvelser",
							"Konsultasjon med treningsveileder for en tilpasset plan",
							"Ingen spesielle tiltak, gjenopptok tidligere rutine",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen4_ja_3_alt",
						},

						neck_gen4_ja_3_alt: {
							text: "Vennligst gi detaljer om hvordan du gjenopptok treningen og eventuelle utfordringer du møtte.",
							type: "text",
						},
					},
					neck_gen4_ja_4: {
						text: "Hvilken type fysiske aktiviteter endret du til, og hvordan vurderer du effekten dette hadde på smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Byttet til en lavere impact aktivitet",
							"Varierte treningsaktiviteter for bedre balanse",
							"Innførte flere hviledager",
							"Fokuserte mer på fleksibilitet og bevegelighet",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen4_ja_4_alt",
						},

						neck_gen4_ja_4_alt: {
							text: "Vennligst forklar nærmere om endringene i dine fysiske aktiviteter og hvordan de påvirker deg.",
							type: "text",
						},
					},

					neck_gen4_ja_5: {
						text: "Du valgte 'Annet'. Vennligst beskriv den endringen du gjorde i din fysiske aktivitet eller trening.",
						type: "text",
					},
				},
				neck_gen4_nei: {
					text: "Siden det ikke har vært noen nylig endring i ditt fysiske aktivitetsnivå eller trening, kan det være andre faktorer som har bidratt til smerten eller ubehaget. Kan du identifisere noen slike faktorer?",
					type: "multipleChoice",
					options: [
						"Endringer i daglige rutiner",
						"Ny arbeidssituasjon eller arbeidsmiljø",
						"Psykologisk stress eller emosjonelle endringer",
						"Endringer i søvnmønster",
						"Annet",
					],
					followUp: {
						"Endringer i daglige rutiner": "neck_gen4_nei_1",
						"Ny arbeidssituasjon eller arbeidsmiljø": "neck_gen4_nei_2",
						"Psykologisk stress eller emosjonelle endringer": "neck_gen4_nei_3",
						"Endringer i søvnmønster": "neck_gen4_nei_4",
						Annet: "neck_gen4_nei_5",
					},
					neck_gen4_nei_1: {
						text: "Kan du beskrive hvilke endringer i daglige rutiner som har funnet sted nylig?",
						type: "text",
					},

					neck_gen4_nei_2: {
						text: "Hvordan har den nye arbeidssituasjonen eller arbeidsmiljøet påvirket deg fysisk og mentalt?",
						type: "text",
					},

					neck_gen4_nei_3: {
						text: "Hvilke metoder eller teknikker har du brukt for å håndtere det psykologiske stresset eller de emosjonelle endringene?",
						type: "multipleChoice",
						options: [
							"Meditasjon eller mindfulness",
							"Fysisk aktivitet",
							"Sosial støtte fra venner eller familie",
							"Profesjonell hjelp (psykolog, terapeut)",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen4_nei_3_alt",
						},
					},
				},
				// Definer spørsmål for hver oppfølging Spørsmål (5)
				neck_gen5_ja: {
					text: "Du nevnte at daglige aktiviteter eller spesifikke bevegelser utløser eller forverrer smerten/ubehaget. Kan du identifisere hvilke aktiviteter eller bevegelser dette gjelder?",
					type: "multipleChoice",
					options: [
						"Sitting for lange perioder",
						"Stående arbeid eller aktiviteter",
						"Løfting av tunge gjenstander",
						"Repetitive bevegelser (f.eks., tastaturbruk, bruk av verktøy)",
						"Trening eller sport",
						"Annet",
					],
					followUp: {
						"Sitting for lange perioder": "neck_gen5_ja_1",
						"Stående arbeid eller aktiviteter": "neck_gen5_ja_2",
						"Løfting av tunge gjenstander": "neck_gen5_ja_3",
						"Repetitive bevegelser (f.eks., tastaturbruk, bruk av verktøy)":
							"neck_gen5_ja_4",
						"Trening eller sport": "neck_gen5_ja_5",
						Annet: "neck_gen5_ja_6",
					},
					neck_gen5_ja_1: {
						text: "Har du prøvd å endre sittestillingen eller ta regelmessige pauser for å se om det påvirker smerten?",
						type: "multipleChoice",
						options: [
							"Ja, og det har hjulpet",
							"Ja, men det har ikke gjort noen forskjell",
							"Nei, har ikke prøvd dette",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_ja_1_alt",
						},
					},
					neck_gen5_ja_1_alt: {
						text: "Vennligst beskriv andre tiltak du har tatt for å håndtere smerten relatert til langvarig sitting.",
						type: "text",
					},
					// Stående arbeid eller aktiviteter
					neck_gen5_ja_2: {
						text: "Hvordan påvirker stående arbeid eller aktiviteter smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Forverrer smerten etter en viss tid",
							"Konstant ubehag uavhengig av tidsperiode",
							"Smerten avtar med bevegelse eller ved å endre stilling",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_ja_2_alt",
						},
					},
					neck_gen5_ja_2_alt: {
						text: "Vennligst beskriv nærmere hvordan stående arbeid eller aktiviteter påvirker deg.",
						type: "text",
					},

					// Løfting av tunge gjenstander
					neck_gen5_ja_3: {
						text: "Beskriv hvordan løfting av tunge gjenstander påvirker smerten eller ubehaget.",
						type: "multipleChoice",
						options: [
							"Umiddelbar økning i smerte under eller etter løft",
							"Gradvis økning i ubehag etter flere løft",
							"Ingen merkbar endring i smerte eller ubehag",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_ja_3_alt",
						},
					},
					neck_gen5_ja_3_alt: {
						text: "Vennligst beskriv eventuelle spesifikke forhold eller metoder du bruker når du løfter som påvirker smerten.",
						type: "text",
					},

					// Repetitive bevegelser (f.eks., tastaturbruk, bruk av verktøy)
					neck_gen5_ja_4: {
						text: "Hvordan påvirker repetitive bevegelser smerten eller ubehaget?",
						type: "multipleChoice",
						options: [
							"Forverring med langvarig bruk av tastatur eller verktøy",
							"Periodisk ubehag som kommer og går med aktivitet",
							"Ingen klar sammenheng mellom aktivitet og smerte",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_ja_4_alt",
						},
					},
					neck_gen5_ja_4_alt: {
						text: "Vennligst spesifiser de repetitive bevegelsene og hvordan de påvirker smerten eller ubehaget.",
						type: "text",
					},

					neck_gen5_ja_5: {
						text: "Kan du identifisere spesifikke treningsformer eller sporter som utløser eller forverrer smerten?",
						type: "multipleChoice",
						options: [
							"Ja, visse treningsformer forverrer smerten",
							"Nei, trening synes ikke å påvirke smerten",
							"Usikker på sammenhengen mellom trening og smerte",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_ja_5_alt",
						},
					},
					neck_gen5_ja_5_alt: {
						text: "Vennligst beskriv treningsformene eller sportene og din erfaring med smerten.",
						type: "text",
					},

					// Annet
					neck_gen5_ja_6: {
						text: "Du valgte 'Annet'. Vennligst beskriv hvilke andre aktiviteter eller bevegelser som utløser eller forverrer smerten.",
						type: "text",
					},
				},
				neck_gen5_nei: {
					text: "Siden daglige aktiviteter eller spesifikke bevegelser ikke utløser eller forverrer smerten, hva tror du bidrar til å holde smerten eller ubehaget i sjakk?",
					type: "multipleChoice",
					options: [
						"Regelmessig fysisk aktivitet eller trening",
						"Bevissthet om kroppsholdning og ergonomi",
						"Strekkeøvelser eller avslapningsteknikker",
						"Riktig smertehåndtering og medikasjon",
						"Annet",
					],
					followUp: {
						"Regelmessig fysisk aktivitet eller trening": "neck_gen5_nei_1",
						"Bevissthet om kroppsholdning og ergonomi": "neck_gen5_nei_2",
						"Strekkeøvelser eller avslapningsteknikker": "neck_gen5_nei_3",
						"Riktig smertehåndtering og medikasjon": "neck_gen5_nei_4",
						Annet: "neck_gen5_nei_5",
					},

					neck_gen5_nei_1: {
						text: "Hvordan bidrar regelmessig fysisk aktivitet eller trening til å håndtere smerten?",
						type: "multipleChoice",
						options: [
							"Øker generell fysisk helse og fleksibilitet",
							"Bidrar til styrking av muskler rundt smerteområdet",
							"Reduserer stivhet og forbedrer blodsirkulasjon",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_nei_1_alt",
						},
					},
					neck_gen5_nei_1_alt: {
						text: "Vennligst beskriv nærmere hvordan regelmessig fysisk aktivitet eller trening påvirker smerten.",
						type: "text",
					},
					neck_gen5_nei_2: {
						text: "På hvilken måte har bevissthet om kroppsholdning og ergonomi påvirket din opplevelse av smerte eller ubehag?",
						type: "multipleChoice",
						options: [
							"Forbedret holdning har redusert smerten",
							"Ergonomiske justeringer på arbeidsplassen har hatt positiv effekt",
							"Lite eller ingen endring merket",
							"Annet",
						],
						followUp: {
							Annet: "neck_gen5_nei_2_alt",
						},

						neck_gen5_nei_2_alt: {
							text: "Vennligst gi detaljer om andre ergonomiske eller holdningsmessige tilpasninger du har prøvd.",
							type: "text",
						},
						neck_gen5_nei_3: {
							text: "Hvordan har strekkeøvelser eller avslapningsteknikker påvirket din smerte eller ubehag?",
							type: "multipleChoice",
							options: [
								"Regelmessige strekkeøvelser har bidratt til smertelindring",
								"Avslapningsteknikker har hjulpet med å håndtere smerten",
								"Har prøvd, men merket lite til ingen forbedring",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen5_nei_3_alt",
							},
						},
						neck_gen5_nei_3_alt: {
							text: "Vennligst beskriv hvilke strekkeøvelser eller avslapningsteknikker du har funnet nyttige eller ikke.",
							type: "text",
						},

						neck_gen5_nei_4: {
							text: "Hvordan har riktig smertehåndtering og bruk av medikasjon påvirket din smerte?",
							type: "multipleChoice",
							options: [
								"Medikasjon har effektivt redusert smerten",
								"Smertehåndteringsteknikker har vært hjelpsomme",
								"Har ikke funnet en effektiv løsning ennå",
								"Annet",
							],
							followUp: {
								Annet: "neck_gen5_nei_4_alt",
							},
						},
						neck_gen5_nei_4_alt: {
							text: "Vennligst beskriv din erfaring med smertehåndtering og medikasjon, inkludert hva som har eller ikke har fungert.",
							type: "text",
						},
						neck_gen5_nei_5: {
							text: "Du valgte 'Annet'. Vennligst beskriv hva du tror bidrar til å holde smerten eller ubehaget i sjakk.",
							type: "text",
						},
					},
				},
			},
		},
	},
};
module.exports = { questionsData };
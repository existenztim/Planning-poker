Uppgiftsbeskrivning

Ni ska bygga en egen webbapp för "planning poker".

Läs igenom båda betygskravlistorna, om ni satsar på VG. En del av G-kraven kan ni då hoppa över.

Se nedan wireframe(s) för inspiration/grepp om hur det är tänkt att fungera. 
![planning-poker 381a1b13](https://user-images.githubusercontent.com/100682425/235712281-09ca7494-0902-449b-b980-3f6fd52badce.jpg)

Planning poker

Design, UX och UI bestämmer ni själva - liksom vilka (övriga) tekniker ni vill använda.
Agilt
För G

    Ni ska ha gjort en sprint-planering inkl. estimat (story points) i GitHub eller Trello, skärmdumpat den (så att ALLT syns) och lagt in skärmdumpen i mappen scrum-ceremonier.
    Ni ska dokumentera era daily stand-ups. Använd co-authoring-funktionen på GitHub om ni gör en gemensam commit.
    Jag kommer att titta på hur "contribution graph" ser ut för repot, så planera uppgifterna så att de blir jämnt fördelade i gruppen och har en rimlig arbetsbelastning per uppgift. Exempelvis är en uppgift som heter "Backend" på 24 SP inte OK.
    Ni ska på fredagar (eller måndag morgon) dokumentera er retro.
    Ni håller i en demo varje fredag för "stakeholders".
    Ni har valt en scrum master.

För VG

    Sprint-planeringen är rimlig och uppgifterna är nedbrutna på en rimlig nivå som visar på djup förståelse för den agila processen.
    Ni har kontinuerligt anpassat prioriteringar och dokumenterat ev. förändringar under kursens gång (löpande, ej i sista minuten sista fredagen på kursen)
    Ni uppvisar en djupare förståelse för den agila processen genom att kontinuerligt uppvisa och applicera agila arbetsmetoder.
    Era pull requests håller hög kvalitet och motsvarar de uppgifter ni har definierat i er backlog. Beskrivningen på PR:en innehåller beskrivning på vilken förändring den applicerar, och om det är en större förändring, nödvändiga tilägg såsom exempelvis en skärmdump, länk till demomiljö eller motsv.
    Det finns tillräckligt med bedömningsunderlag för att se att ni har tagit del av den agila processen, t.ex. är daily standup-dokumentationen utförlig liksom retros, reviews, etc. Ni för, med andra ord, kontinuerlig logg för att uppvisa att ni förstår det agila arbetssättet (då jag inte kommer att kunna vara med på varje retro).
    Vid problem lyfter ni upp detta proaktivt.
    Ni tacklar oväntade problem som dyker upp enligt principerna för det agila arbetssättet.

Programmeringsdelen

    OBS! I kursen bedöms det agila arbetssättet (och koden får mindre fokus), men för att ni ska ha något att arbeta med så gör ni ett projekt. Projektet bedöms rimligt på 3-4 personer på två veckor, givet att ni arbetar vidare med tekniker ni har existerande kunskaper om. Jag råder er inte att påbörja något "nytt", om ni inte är säkra på att ro det i land och har provat det förr. Däremot kommer jag att titta på koden och den löpande processen för att se att ni använder er av det agila arbetssättet löpande, så även kodens kvalitet, commits och uppgifter spelar roll.

För G

    Personen ska kunna ansluta till sessionen med sitt namn
    Personen ska kunna välja ett fixerat värde av 0, 1, 3, 5, 8 story points, eller ett frågetecken om personen inte kan avgöra uppgiftens komplexitet.
    Det finns ingen begränsning för hur många personer som kan ansluta till en session.
    När en person har röstat, ska kortet vändas och visa personens namn och poängen personen gav till uppgiften.
    Admin ska kunna mata in en lista med alla "tasks" som det ska röstas om i sessionen.
    Endast en uppgift visas åt gången för omröstning.
    Admin ska kunna klicka på "Nästa uppgift", och då ska "nästa uppgift" i listan matas fram för omröstning.
    Om en användare trillar ur sessionen, ska admin kunna "radera" den personens kort.

För VG

    Alla korten vänds först när alla deltagare har röstat.
    Det ska visas ett avrundat medelvärde för röstningens resultat. Bonus om ni avrundar till närmsta Fibonacci-tal.
    Admin ska kunna avsluta sessionen.
    Om en användare trillar ur sessionen, ska användaren kunna återansluta.
    Om en användare trillar ur sessionen, ska dennes kort automatisk försvinna.
    Admin ska kunna välja valfri uppgift som ska röstas om härnäst, dvs. behöver inte gå i ordning.
    Admin ska kunna skriva in överenskommen poäng för uppgiften. När admin väljer nästa uppgift, ska den föregående uppgiften och dess poäng "sparas undan".
    Det ska visas en lista där uppgifterna man redan röstat om ska visas med deras överenskomna poäng bredvid.
    Det ska visas en lista med alla uppgifter som man ännu inte röstat om.

Bedömningsmall/examinationsmoment

    När jag sätter betyg, tittar jag även på följande saker utöver de enskilda momenten i uppgiften som beskrivits ovan

    Förmåga att läsa och tolka felmeddelanden
    Förmåga till felsökning och att hitta optimala lösningar
    (Effektiv) refaktorering
    Kodkvalitet (namngivning, best practice, kunskaper från tidigare kurser)
    Förmåga att läsa dokumentation och hitta information
    Versionshistorik (läsbarhet & antal ändringar per commit)
    Gitflow och användning av olika arbetsmetoder
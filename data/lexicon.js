/* ============================================================
   Lexicon — wbudowany zestaw słów angielskich
   ------------------------------------------------------------
   Format jest celowo "zwarły" (jedna linia = jeden wpis),
   bo przy 250+ słowach JSON byłby nieczytelny.

   Warianty tej samej formy rozdzielamy "/":  burnt/burned

   POZYCJE (kolejność ma znaczenie):
     verbs      base | past | pp | 3rd | -ing | plural | PL | IPA | example
     nouns      sing | plural | PL | IPA | example
     adjectives base | comparative | superlative | PL | IPA | example
     extra      word | POS | PL | IPA | definition(EN) | example | tier
   ============================================================ */

window.LEXICON_RAW = {

  /* ---------- CZASOWNIKI NIEREGULARNE ---------- */
  verbs: `be|was/were|been|is|being|am/is/are|być|bɪ|biː|She has been to Paris twice.
become|became|become|becomes|becoming|became|stać się|bɪˈkʌm|He became a doctor last year.
begin|began|begun|begins|beginning|began|zacząć, rozpoczynać|bɪˈɡɪn|We began the lesson at nine.
bend|bent|bent|bends|bending|bent|zginać, zginać się|bɛnd|Metal bends under pressure.
bet|bet|bet|bets|betting|bet|obstawiać, zakładać się|bɛt|I bet he is still at home.
bind|bound|bound|binds|binding|bound|wiązać, oprawiać|baɪnd|She bound the book in leather.
bite|bit|bitten|bites|biting|bit|gryźć, kąsać|baɪt|The dog bit my finger.
bleed|bled|bled|bleeds|bleeding|bled|krwawić|bliːd|His nose began to bleed.
break|broke|broken|breaks|breaking|broke|łamać, przerywać|breɪk|Do not break the glass.
breed|bred|bred|breeds|breeding|bred|hodować, krzyżować|briːd|They breed horses on the farm.
bring|brought|brought|brings|bringing|brought|przynosić, przynosić|brɪŋ|Bring me a cup of coffee.
build|built|built|builds|building|built|budować, stawiać|bɪld|They are building a new library.
burn|burnt/burned|burnt/burned|burns|burning|burnt| palić (się), płonąć|bɜːrn|The paper burns very quickly.
burst|burst|burst|bursts|bursting|burst|pęknąć, rozerwać|bɜːst|The balloon burst with a loud bang.
buy|bought|bought|buys|buying|bought|kupować, nabywać|baɪ|I bought a new phone yesterday.
catch|caught|caught|catches|catching|caught|łapać, chwycić|kætʃ|Catch me if you can.
choose|chose|chosen|chooses|choosing|chose|wybierać|tʃuːz|You can choose either seat.
come|came|come|comes|coming|came|przychodzić, przyjść|kʌm|Come here for a moment.
cost|cost|cost|costs|costing|cost|kosztować|kɒst|How much does the ticket cost?
cut|cut|cut|cuts|cutting|cut|ciąć, krajać|kʌt|Cut the cake into eight pieces.
deal|dealt|dealt|deals|dealing|dealt|handlować, postępować|diːl|Let us deal with it tomorrow.
dig|dug|dug|digs|digging|dug|kopać, dołykać|dɪɡ|The dog dug a hole in the garden.
do|did|done|does|doing|did|robić, wykonywać|duː|What do you do for a living?
draw|drew|drawn|draws|drawing|drew|rysować, ciągnąć|drɔː|She drew a picture of the cat.
dream|dreamt/dreamed|dreamt/dreamed|dreams|dreaming|dreamt|śnić, marzyć|driːm|I dreamed about flying.
drink|drank|drunk|drinks|drinking|drank|pić, napić się|drɪŋk|He drank two cups of tea.
drive|drove|driven|drives|driving|drove|prowadzić (samochód)|draɪv|She drives to work every day.
eat|ate|eaten|eats|eating|ate|jeść, zjadać|iːt|We ate at a small restaurant.
fall|fell|fallen|falls|falling|fell|upadać, padać|fɔːl|Leaves fall from the trees in autumn.
feed|fed|fed|feeds|feeding|fed|karmić|fiːd|She feeds the birds every morning.
feel|felt|felt|feels|feeling|felt|czuć, czuć się|fiːl|I feel much better today.
fight|fought|fought|fights|fighting|fought|walczyć, kłócić się|faɪt|They fought for the right to vote.
find|found|found|finds|finding|found|znaleźć, znajdować|faɪnd|I found my keys under the bed.
fly|flew|flown|flies|flying|flew|latać, lecieć|flaɪ|Birds fly south in the winter.
forget|forgot|forgotten/forgot|forgets|forgetting|forgot|zapominać|fərˈɡet|Do not forget to lock the door.
forgive|forgave|forgiven|forgives|forgiving|forgave|wybaczać|pərˈɡɪv|She forgave him for the lie.
freeze|froze|frozen|freezes|freezing|froze|zamarzać, mrozić|friːz|Water freezes at zero degrees.
get|got/gotten|got/gotten|gets|getting|got|dostawać, zdobywać|ɡet|I got a message from you.
give|gave|given|gives|giving|gave|dawać, dawać|ɡɪv|Give me a minute to think.
go|went|gone|goes|going|went|iść, jechać, chodzić|ɡoʊ|We went to the beach yesterday.
grow|grew|grown|grows|growing|grew|rosnąć, hodować|ɡroʊ|These flowers grow very fast.
hang|hung|hung|hangs|hanging|hung|wieszać, zawieszać|hæŋ|Hang your coat behind the door.
have|had|had|has|having|had|mieć, posiadać|hæv|I have two sisters.
hear|heard|heard|hears|hearing|heard|słyszeć|hɪər|I can hear the rain outside.
hide|hid|hidden|hides|hiding|hid|chować, ukrywać|haɪd|The cat hides under the bed.
hit|hit|hit|hits|hitting|hit|uderzać, trafiać|hɪt|The ball hit the wall.
hold|held|held|holds|holding|held|trzymać, dzielić się|həʊld|Hold my hand for a second.
hurt|hurt|hurt|hurts|hurting|hurt|ranić, boleć|hɜːt|My leg hurts after the run.
keep|kept|kept|keeps|keeping|kept|zachowywać, trzymać|kiːp|Keep the receipt, just in case.
kick|kicked/kicked|kicked|kicks|kicking|kicked|kopnąć, kopnąć|kɪk|He kicked the ball into the net.
know|knew|known|knows|knowing|knew|znać, wiedzieć|nəʊ|Do you know where she lives?
lay|laid|laid|lays|laying|laid|kłaść, kładzieć|leɪ|Lay the book on the table.
lead|led|led|leads|leading|led|prowadzić, kierować|liːd|She led the team to victory.
learn|learnt/learned|learnt/learned|learns|learning|learnt|uczyć się, nauczać|lɜːn|I learned Spanish in two months.
leave|left|left|leaves|leaving|left|opuszczać, zostawiać|liːv|Do not leave your bag here.
lend|lent|lent|lends|lending|lent|pożyczać|lɛnd|Can you lend me your pen?
let|let|let|lets|letting|let|pozwalać, niech będzie|lɛt|Let me help you.
lie|lay|lain|lies|lying|lay|kłać się, leżeć|laɪ|He lay on the grass all afternoon.
lose|lost|lost|loses|losing|lost|tracić, przegrać|luːz|Do not lose your keys again.
make|made|made|makes|making|made|robić, tworzyć|meɪk|She made a cake for the party.
mean|meant|meant|means|meaning|meant|znaczyć, oznaczać|miːn|What does this word mean?
meet|met|met|meets|meeting|met|spotkać, poznać|miːt|Nice to meet you.
pay|paid|paid|pays|paying|paid|płacić|peɪ|You have to pay for the tickets.
put|put|put|puts|putting|put|wkładać, kłaść|pʊt|Put the keys back on the shelf.
read|read|read|reads|reading|read|czytać|riːd|He read the whole book last night.
ride|rode|ridden|rides|riding|rode|jechać (koniem), jeździć|raɪd|We rode bikes along the river.
ring|rang|rung|rings|ringing|rang|dzwonić|rɪŋ|The phone rang twice.
rise|rose|risen|rises|rising|rose|rosnąć, wschodzić|raɪz|The sun rises in the east.
run|ran|run|runs|running|ran|biegać, prowadzić|rʌn|She runs every morning.
say|said|said|says|saying|said|mówić, powiedzieć|seɪ|What did you say to her?
see|saw|seen|sees|seeing|saw|widzieć, zauważać|siː|I can see the mountains from here.
sell|sold|sold|sells|selling|sold|sprzedawać|sɛl|They sell fresh bread daily.
send|sent|sent|sends|sending|sent|wysyłać|sɛnd|Send me the file, please.
shake|shook|shaken|shakes|shaking|shook|potrząsać, trząść|ʃeɪk|He shook my hand warmly.
shine|shone|shone|shines|shining|shone|świecić, lśnić|ʃaɪn|The moon shone through the clouds.
shoot|shot|shot|shoots|shooting|shot|strzelać, kręcić|ʃuːt|He shot two goals in the match.
show|showed|shown|shows|showing|showed|pokazywać, wyświetlać|ʃoʊ|Show me how it works.
shrink|shrank|shrunk|shrinks|shrinking|shrank|kurczyć się, zmniejszać|ʃrɪŋk|This shirt shrank in the wash.
sing|sang|sung|sings|singing|sang|śpiewać|sɪŋ|They sang together all evening.
sink|sank|sunk|sinks|sinking|sank|tonąć, zatapiać|sɪŋk|The boat sank in the storm.
sit|sat|sat|sits|sitting|sat|siedzieć|sɪt|Please sit down.
sleep|slept|slept|sleeps|sleeping|slept|spać|sliːp|I did not sleep well last night.
speak|spoke|spoken|speaks|speaking|spoke|mówić, przemawiać|spiːk|Can you speak a bit slower?
spell|spelt/spelled|spelt/spelled|spells|spelling|spelt|literować|spɛl|How do you spell your name?
spend|spent|spent|spends|spending|spent|wydawać (pieniądze), spędzać|spɛnd|We spent the weekend at the lake.
spread|spread|spread|spreads|spreading|spread|rozprzestrzeniać, smarować|spred|Spread the butter on the bread.
stand|stood|stood|stands|standing|stood|stać, znosić|stænd|She stood by the window.
steal|stole|stolen|steals|stealing|stole|kraść|stiːl|Somebody stole my bicycle.
stick|stuck|stuck|sticks|sticking|stuck|przyklejać, wtykać|stɪk|Stick to your plan.
sting|stung|stung|stings|stinging|stung|żądlić, kłuć|stɪŋ|A bee stung my arm.
swim|swam|swum|swims|swimming|swam|plywać|swɪm|We swam in the lake.
swing|swung|swung|swings|swinging|swung|kołysać, machać|swɪŋ|Her swing moves back and forth.
take|took|taken|takes|taking|took|brać, wziąć|teɪk|Take an umbrella with you.
teach|taught|taught|teaches|teaching|taught|uczyć (kogoś)|tiːtʃ|She teaches maths at school.
tear|tore|torn|tears|tearing|tore|darzyć, rozdzierać|tɛə|He tore the paper in half.
tell|told|told|tells|telling|told|mówić, opowiadać|tɛl|Tell me the truth.
think|thought|thought|thinks|thinking|thought|myśleć, sądzić|θɪŋk|I think you are right.
throw|threw|thrown|throws|throwing|threw|rzucać, wyrzucać|θroʊ|Do not throw the ball so hard.
understand|understood|understood|understands|understanding|understood|rozumieć|ˌʌndərˈstænd|I do not understand this rule.
wear|wore|worn|wears|wearing|wore|nosić (na sobie)|wɛə|She wore a red jacket.
win|won|won|wins|winning|won|wygrywać|wɪn|Our team won the match.
write|wrote|written|writes|writing|wrote|pisać|raɪt|Write your name on the line.
arise|arose|arisen|arises|arising|arose|powstawać, wynikać|əˈraɪz|A problem arose during the meeting.
awake|awoke|awoken|awakes|awaking|awoke|budzić się|əˈweɪk|I woke up at six.
beat|beat|beaten|beats|beating|beat|bić, pokonywać|biːt|Our team beat them twice.
forbid|forbade|forbidden|forbids|forbidding|forbade|zabraniać|fərˈbɪd|The rules forbid smoking here.
seek|sought|sought|seeks|seeking|sought|szukać, dążyć|siːk|We are seeking a solution.
sew|sewed|sewn|sews|sewing|sewed|szyć|soʊ|She sewed a new dress.
strike|struck|struck|strikes|striking|struck|uderzać, strajkować|straɪk|The clock struck twelve.
swear|swore|sworn|swears|swearing|swore|przysięgać, kląć|swɛə|She swore she was innocent.
sweep|swept|swept|sweeps|sweeping|swept|zamiatać, sprzątać|swiːp|I sweep the floor every Saturday.
wake|woke|woken|wakes|waking|woke|budzić (kogoś)|weɪk|Please wake me up at seven.
wind|wound|wound|winds|winding|wound|kręcić, nawijać|wɪnd|She wound the yarn around the ball.
overcome|overcame|overcome|overcomes|overcoming|overcame|przezwyciężyć, pokonać|ˌoʊvərˈkʌm|He overcame his fear of flying.`,

  /* ---------- RZECZOWNIKI Z NIREGULARNĄ LICZBĄ MNOGĄ ---------- */
  nouns: `child|children|dziecko|tʃaɪld|The children are playing outside.
man|men|mężczyzna|mæn|The men work in the factory.
woman|women|kobieta|wʊmən|She is the only woman on the team.
person|people|osoba|pɜːsən|Many people came to the concert.
foot|feet|stopa|fʊt|My left foot hurts.
tooth|teeth|ząb|tuːθ|Brush your teeth twice a day.
goose|geese|gęś|ɡuːs|A flock of geese flew over.
mouse|mice|mysz|maʊs|The mouse ran under the shelf.
louse|lice|wsz|laʊs|This shampoo kills lice.
die|dice|kość do gry|daɪ|Roll the dice and move.
ox|oxen|byk|ɒks|The ox pulls the cart.
penny|pence|pens|ˈpeni|I paid fifty pence for it.
leaf|leaves|liść|liːf|The leaves are falling down.
knife|knives|nóż|naɪf|Be careful with that knife.
life|lives|życie|laɪf|He saved my life.
wife|wives|żona|waɪf|His wife is a doctor.
half|halves|połowa|hɑːf|We waited half an hour.
shelf|shelves|półka|ʃɛlf|The book is on the top shelf.
loaf|loaves|bochenek|loʊf|Buy two loaves of bread.
thief|thieves|złodziej|θiːf|The thief ran out of the shop.
calf|calves|łydka, cielę|kɑːf|Her calf hurts after running.
elf|elves|chochlik|ɛlf|The elves work at night.
scarf|scarves|szalik|skɑːf|Wear a scarf in the cold.
wolf|wolves|wilk|wʊlf|A wolf howled in the forest.
potato|potatoes|ziemniak|pəˈteɪtoʊ|Boil the potatoes for ten minutes.
tomato|tomatoes|pomidor|təˈmɑːtoʊ|Add two tomatoes to the salad.
hero|heroes|bohater|ˈhɪəroʊ|He became a national hero.
echo|echoes|echo|ˈekoʊ|Her voice echoed in the hall.
photo|photos|zdjęcie|ˈfoʊtoʊ|I took three photos.
piano|pianos|fortepian|piˈænoʊ|She plays the piano beautifully.
studio|studios|studio|ˈstjuːdioʊ|He works in a small studio.
radio|radios|radio|ˈreɪdioʊ|Turn on the radio, please.
video|videos|wideo|ˈvɪdioʊ|Upload the video tonight.
logo|logos|logo|ˈloʊɡoʊ|The logo is in the corner.
memo|memos|notatka|ˈmɛmoʊ|He left a memo on my desk.
kilo|kilos|kilogram|ˈkiːloʊ|The bag weighs three kilos.
scenario|scenarios|scenariusz|səˈnɛrioʊ|That scenario is very unlikely.
volcano|volcanoes|wulkan|vɑlˈkeɪnoʊ|The volcano erupted last year.
tornado|tornadoes|tornado|tɔrˈneɪdoʊ|A tornado touched down nearby.
solo|solos|solo|ˈsoʊloʊ|She played a guitar solo.
menu|menus|menu|ˈmɛnjuː|Tick the dishes on the menu.
curriculum|curricula|program nauczania|kəˈrɪkjələm|The curriculum includes two languages.
criterion|criteria|kryterium|kraɪˈtɪriən|It meets all three criteria.
phenomenon|phenomena|zjawisko|fəˈnɑːmɪnɑːn|A rare phenomenon was observed.
analysis|analyses|analiza|əˈnæləsɪs|Their analysis was very careful.
basis|bases|podstawa|ˈbeɪsɪs|We meet on a weekly basis.
crisis|crises|kryzys|ˈkraɪsɪs|The country is in a crisis.
thesis|theses|teza|ˈθiːsɪs|He defended his thesis in June.
hypothesis|hypotheses|hipoteza|haɪˈpɑːθəsɪs|The experiment confirmed the hypothesis.
diagnosis|diagnoses|diagnoza|daɪəɡˈnoʊsɪs|The doctor made a diagnosis.
parenthesis|parentheses|nawias|pəˈrɛnθəsɪs|Put the word in parentheses.
axis|axes|oś|ˈæksɪs|Rotate the shape around the x axis.
index|indices|indeks|ˈɪndɛks|Look up the word in the index.
matrix|matrices|macierz|ˈmeɪtrɪks|Multiply the two matrices.
vertex|vertices|wierzchołek|ˈvɜːrtɛks|The three points form a triangle.
appendix|appendices|załącznik|əˈpɛndɪks|See the appendix for details.
cactus|cacti|kaktus|ˈkæktəs|This cactus needs very little water.
fungus|fungi|grzyb|ˈfʌŋɡəs|Mushrooms are a type of fungus.
radius|radii|promień|ˈreɪdiəs|Draw a circle with a radius of five.
stimulus|stimuli|bodziec|ˈstɪmjələs|The dog needs a stimulus to move.
bacterium|bacteria|bakteria|bækˈtɪəriəm|Bacteria live in the soil.
formula|formulae|wzór|ˈfɔːrmjələs|The formula is on the board.
symposium|symposia|sympozjum|sɪmˈpoʊziəm|He spoke at an international symposium.
addendum|addenda|dodatek|əˈdɛndəm|See the addendum on page four.
stratum|strata|warstwa|ˈstreɪtəm|The soil has several strata.
memorandum|memoranda|memorandum|mɛməˈrændəm|Read the memorandum before Friday.
police|police|siły policyjne|pəˈliːs|Call the police, please.
advice|—|rada|ədˈvaɪs|Can you give me some advice?
furniture|—|meble|ˈfɜːrnɪtʃər|We bought new furniture.
information|—|informacja|ˌɪnfərˈmeɪʃn|I need more information.
luggage|—|bagaż|ˈlʌɡɪdʒ|My luggage is over there.
news|—|wiadomości|nuːz|Good news travels fast.
research|—|badania naukowe|ˈriːsɜːrtʃ|The research took two years.
evidence|—|dowody|ˈɛvɪdəns|There is no evidence against him.
knowledge|—|wiedza|ˈnɑːlɪdʒ|She has a good knowledge of history.
progress|—|postęp|ˈprɑːɡrɛs|We are making good progress.
equipment|—|sprzęt|ɪˈkwɪpmənt|The equipment is in the lab.`,

  /* ---------- PRZYMIOTNIKI NIEREGULARNE ---------- */
  adjectives: `good|better|best|dobry|ɡʊd|This is a better idea than yours.
bad|worse|worst|zły|bæd|The weather was worse than expected.
far|farther/further|farthest/farthest|daleko|fɑːr|We walked farther than planned.
little|less|least|mało|məˈlɪt|There is little time left.
much/many|more|most|wiele|mʌtʃ|Much more people joined this year.
old|older/older|oldest/oldest|stary|oʊld|My older brother is a teacher.
late|later|latest|późny|leɪt|Do not be late again.
high|higher|highest|wysoki|haɪ|The price is too high.
low|lower|lowest|niski|loʊ|Speak in a low voice.
easy|easier|easiest|łatwy|ˈiːzi|The test was easy.
happy|happier|happiest|szczęśliwy|ˈhæpi|She looked happy with the result.
heavy|heavier|heaviest|ciężki|ˈhɛvi|This box is too heavy.
early|earlier|earliest|wcześny|ˈɜːrli|I always get up early.
fine|finer|finest|wyśmienity, dobry|faɪn|It is a fine day.
nice|nicer|nicest|miły|naɪs|The food was really nice.
short|shorter|shortest|krótki|ʃɔːrt|We took a short break.
long|longer|longest|długi|lɔːŋ|It was a long journey.
strong|stronger|strongest|silny|strɔːŋ|He has a strong voice.
young|younger|youngest|młody|jʌŋ|My younger sister is fifteen.
pretty|prettier|prettiest|ładny|prɪti|The garden looks pretty in May.
funny|funnier|funniest|zabawny|fʌni|That was a funny story.
thin|thinner|thinnest|chudy|θɪn|He is thinner than last year.
fat|fatter|fattest|gruby|fæt|The cat got quite fat.
clean|cleaner|cleanest|czysty|kliːn|Keep your hands clean.
rich|richer|richest|bogaty|rɪtʃ|He became a rich businessman.
safe|safer|safest|bezpieczny|seɪf|Drive safe on the icy roads.
wide|wider|widest|szeroki|waɪd|The river is very wide here.
deep|deeper|deepest|głęboki|diːp|The well is deeper than you think.
broad|broader|broadest|szeroki, rozległy|brɔːd|He has broad interests.
gentle|gentler|gentlest|łagodny|ˈdʒɛntl|Be gentle with the baby.
simple|simpler|simplest|prosty|ˈsɪmpəl|The rule is very simple.
angry|angrier|angriest|zły (na kogoś)|ˈæŋɡri|He got angry with his brother.
hungry|hungrier|hungriest|głodny|ˈhʌŋɡri|The children are hungry already.
lazy|lazier|laziest|leniwy|ˈleɪzi|Do not be lazy on Monday.
nervous|nervouser|nervousest|nerwowy|ˈnɜːrvəs|She felt nervous before the exam.
serious|more serious|most serious|poważny|ˈsɪriəs|It is a serious problem.
careful|more careful|most careful|ostrożny|ˈkerfləl|Be careful with the knife.`,

  /* ---------- SŁOWA REGULARNE (uzupełnienie siatki) ---------- */
  extra: `hello|interjection|cześć|həˈloʊ|A greeting used when meeting somebody.|Hello, how are you today?|1
water|noun|woda|ˈwɔːtər|The clear liquid that people drink every day.|Please bring a bottle of water.|1
computer|noun|komputer|kəmˈpjuːtər|An electronic machine that processes information.|My computer is slow today.|2
phone|noun|telefon|foʊn|A device used to talk to people far away.|My phone battery is dead.|1
friend|noun|przyjaciel|frend|A person you like and enjoy spending time with.|She is my best friend.|1
family|noun|rodzina|ˈfæməli|Parents, children and other relatives living together.|We have dinner with my family.|1
school|noun|szkoła|skuːl|A place where children learn.|School starts at eight.|1
teacher|noun|nauczyciel|ˈtiːtʃər|A person whose job is to teach students.|Our teacher is very patient.|1
student|noun|uczeń|ˈstuːdənt|A person who studies at a school or university.|She is a medical student.|1
library|noun|biblioteka|ˈlaɪbreri|A public place where you can borrow books.|I found the book in the library.|1
book|noun|książka|bʊk|Printed pages with words and pictures.|This book changed my mind.|1
music|noun|muzyka|ˈmjuːzɪk|Sound made by instruments or voices.|I listen to music while I study.|1
money|noun|pieniądze|ˈmʌni|Coins and notes used to buy things.|I am saving money for a trip.|1
city|noun|miasto|ˈsɪti|A large place where many people live.|Shanghai is a huge city.|1
country|noun|kraj|ˈkʌntri|An area of land with its own government.|Japan is a beautiful country.|1
job|noun|praca|dʒɑːb|Work that you do to earn money.|He got a new job last week.|1
question|noun|pytanie|ˈkwɛstʃən|A sentence that asks for information.|May I ask a question?|1
answer|noun|odpowiedź|ˈænsər|A reply to a question.|I know the answer.|1
window|noun|okno|ˈwɪndoʊ|An opening in a wall that lets light in.|Open the window, please.|1
door|noun|drzwi|dɔːr|The thing you walk through to enter a room.|Someone is at the door.|1
table|noun|stół|ˈteɪbəl|A flat piece of furniture with legs.|Put the plates on the table.|1
chair|noun|krzesło|tʃɛr|A piece of furniture for one person to sit on.|This chair is very comfortable.|1
breakfast|noun|śniadanie|ˈbrɛkfəst|The first meal of the day.|We had eggs for breakfast.|1
dinner|noun|kolacja|ˈdɪnər|The main evening meal.|Dinner is ready!|1
today|adverb|dzisiaj|təˈdeɪ|The day that is happening now.|Today is Monday.|1
morning|noun|poranek|ˈmɔːrnɪŋ|The early part of the day.|I run every morning.|1
problem|noun|problem|ˈprɑːbləm|A difficult situation that needs fixing.|We solved the problem quickly.|1
important|adjective|ważny|ɪmˈpɔːrtnt|Mattering a lot to somebody.|It is important to sleep well.|1
difficult|adjective|trudny|ˈdɪfɪkəlt|Hard to do or to understand.|The exam was difficult.|1
beautiful|adjective|piękny|ˈbjuːtɪfəl|Very nice to look at.|What a beautiful morning!|1
example|noun|przykład|ɪɡˈzæmpəl|A case that shows how something works.|Let me give you an example.|2
number|noun|liczba|ˈnʌmbər|An amount or a single digit.|Give me your phone number.|1
system|noun|system|ˈsɪstəm|A set of parts working together.|The human body is a complex system.|2
program|noun|program|ˈproʊɡræm|A set of instructions for a machine.|She wrote a small program.|2
internet|noun|internet|ˈɪntərnɛt|The global network of computers.|I found the recipe on the internet.|2
message|noun|wiadomość|ˈmɛsɪdʒ|A piece of information sent to somebody.|I left you a message.|1
picture|noun|obraz|ˈpɪktʃər|A photograph or a painting.|Look at this picture.|1
word|noun|słowo|wɜːrd|A single group of letters.|Can you say that word again?|1
name|noun|imię|neɪm|The word that identifies somebody.|What is your name?|1
language|noun|język|ˈlæŋɡwɪdʒ|The words people use to communicate.|She speaks three languages.|1
travel|verb|podróżować|ˈtrævl|To go from one place to another.|I want to travel around Europe.|2
study|verb|studiować|ˈstʌdi|To learn about a subject at school.|He studies physics in Kraków.|2
email|noun|e-mail|ˈiːmeɪl|A message sent electronically.|Send me an email tomorrow.|3
password|noun|hasło|ˈpæswɜːrd|A secret word that protects an account.|Never share your password.|3
keyboard|noun|klawiatura|ˈkiːbɔːrd|The set of keys on a computer.|My keyboard is broken.|3
folder|noun|folder|ˈfoʊldər|A place for storing files.|Save the file in this folder.|3
file|noun|plik|faɪl|Information saved on a computer.|The file is too big to send.|3
settings|noun|ustawienia|ˈsɛtɪŋz|Options that control how a program works.|Check the settings first.|3
account|noun|konto|əˈkaʊnt|A record of what you use an app for.|Log in to your account.|3
search|verb|szukać|sɜːrtʃ|To look for something.|I searched for the word online.|1
update|verb|aktualizować|ˌʌpˈdeɪt|To make something more modern.|Please update your software.|3
click|verb|kliknąć|klɪk|To press a button with the mouse.|Click the icon twice.|1
printer|noun|drukarka|ˈprɪntər|A machine that prints paper.|The printer is out of paper.|3
server|noun|serwer|ˈsɜːrvər|A computer that gives data to other computers.|The server is down.|3`
};

/* ============================================================
   Parsowanie zwartego formatu w rekordy
   ============================================================ */
(function buildLexicon(raw) {
  const parse = (block) => block
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split('|').map(f => f.trim()));

  const words = [];
  const byForm = new Map();   // dowolna forma -> rekord

  const register = (w) => {
    w.forms = [w.word];
    for (const f of (w.altForms || [])) if (f && f !== '—') w.forms.push(f);
    words.push(w);
  };

  /* --- czasowniki --- */
  parse(raw.verbs).forEach((f, i) => {
    const [base, past, pp, third, ing, plural, pl, ipa, ex] = f;
    if (!base || base === 'skip') return;
    register({
      word: base, pos: 'verb', irregular: true, pl, ipa, ex,
      altForms: [past, pp, third, ing, plural],
      verb: { base, past, pp, third, ing, plural },
      tier: i < 50 ? 1 : i < 92 ? 2 : 3,
    });
  });

  /* --- rzeczowniki --- */
  parse(raw.nouns).forEach((f, i) => {
    const [sing, plural, pl, ipa, ex] = f;
    if (!sing || sing === 'skip') return;
    register({
      word: sing, pos: 'noun', irregular: true, pl, ipa, ex,
      altForms: [plural],
      noun: { singular: sing, plural },
      tier: i < 42 ? 1 : i < 70 ? 2 : 3,
    });
  });

  /* --- przymiotniki --- */
  parse(raw.adjectives).forEach((f, i) => {
    const [base, comp, sup, pl, ipa, ex] = f;
    if (!base || base === 'skip') return;
    register({
      word: base, pos: 'adjective', irregular: true, pl, ipa, ex,
      altForms: [comp, sup],
      adj: { base, comparative: comp, superlative: sup },
      tier: i < 24 ? 1 : i < 34 ? 2 : 3,
    });
  });

  /* --- pozostałe słowa --- */
  parse(raw.extra).forEach(f => {
    const [word, pos, pl, ipa, def, ex, tier] = f;
    if (!word || word === 'skip') return;
    const head = word.split('/')[0].trim();
    register({
      word: head, pos, pl, ipa, def, ex,
      irregular: false,
      tier: Number(tier) || 2,
    });
  });

  /* Indeks wszystkich form -> rekord */
  words.forEach(w => w.forms.forEach(f => {
    const key = f.toLowerCase();
    if (!byForm.has(key)) byForm.set(key, w);
  }));

  /* Usunięcie duplikatów (ostatni wygrywa) */
  const seen = new Set();
  const unique = [];
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i];
    if (seen.has(w.word)) continue;
    seen.add(w.word);
    w.builtIn = true;
    unique.unshift(w);
  }

  window.LEXICON = {
    words: unique,
    byForm,
    count: unique.length,
    irregularCount: unique.filter(w => w.irregular).length,
  };
})(window.LEXICON_RAW);
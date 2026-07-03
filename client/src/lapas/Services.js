import React, { useState, useRef, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import './Services.css';

const getIcon = (name) => `/images/${name || 'default-icon.svg'}`;

const servicesData = [
    {
        title: 'Auto diagnostika',
        icon: 'checklist.svg',
        description: 'Lai servisa meistars spētu veikt korektu un kvalitatīvu automašīnas remontu, nepieciešams veikt sākotnēju diagnostiku. Iegādājoties auto rekomendējam veikt pilnu auto diagnostiku.',
        items: [
            { name: 'Auto pirms pirkšanas pārbaude / kompleksā diagnostika', 
                details: `Uzskatām, ka šī ir obligāta nepieciešamība pie jebkura mazlietota vai lietota auto iegādes. Šāda veida pārbaude mūsu autoservisā sniegs atbildes par konkrētā auto vispārējo tehnisko un vizuālo stāvokli/ nolietojumu. Servisa vadītājs spēs komentēt izvēlētā auto ekspluatācijas izmaksas, kā arī informēs par auto vājajiem mezgliem, paredzamajiem remontiem un to izmaksām.

Diagnostika ietver:
• Vizuāla auto apskate (virsbūve, šasija, salons, bagāžas nodalījums)
• Virsbūves detaļu pārbaude ar krāsas biezuma mērītāju
• Datora diagnostika
• Ritošās daļas diagnostika
• Dzinēja un transmisijas diagnostika
• Testa brauciena veikšana

Kopējais diagnostikas laiks - 2 līdz 3 stundas

Kopējās izmaksas -
65.00 EUR ar PVN bez carVertical atskaite
85.00 EUR ar PVN ar carVertical atskaite` },
            { name: 'Sagatavošana CSDD tehniskajai apskatei', 
                details: `Sagatavošanas laikā būtībā tiek veikta identiska pārbaude, kādu veic CSDD TA inspektori, izņemot dzinēja atgāžu (CO, CH) pārbaudi, kā arī tiek iekļauta apgaismojuma maiņa un šķidrumu papildināšana nepieciešamības gadījumā. Pēc pārbaudes klients saņem nepieciešamo remontdarbu sarakstu un to izmaksas.

Kopējais pārbaudes laiks - 2 stundas
Kopējās izmaksas - 60.00 EUR ar PVN` },
            { name: 'Dzinēja diagnostika', 
                details: `Diagnostikas laikā tiek veikta datora diagnostika, kuras laikā iespējams pārliecināties par dzinēja mezglu darbību. Tiek veikta kļūdu nolasīšana un to analīze. Dzinējam tiek veikta vizuāla apskate, lai pārliecinātos, ka dzinējam nav degvielas/ dzesēšanas šķidruma/ eļļu noplūde.

Diagnostikas laiks - 2 stundas
Izmaksas - 60.00 EUR ar PVN
Padziļināta elektrosistēmas diagnostika - 55.00 EUR / h ar PVN` },
            { name: 'Ritošās daļas diagnostika', 
                details: `Ritošās daļas diagnostikā tiek pārbaudīta visa automašīnas piekare- sviras, bukses, sailentbloki, stūres iekārta/ reika, stūres stieņi un šarnīri, rumbas gultņi, atsperes, amortizatori un amortizatoru atbalsta gultņi, atbalsta šarnīri, kā arī piedziņas elementi- pusasis un/ vai kardānvārpsta.
Ritošās diagnostikas laikā tiek veikta arī bremžu sistēmas pārbaude- tiek pārbaudīts bremžu disku un uzliku stāvoklis.

Diagnostikas laiks - 1 stunda
Izmaksas - 35.00 EUR ar PVN
Bremžu pārbaude uz stenda - 15.00 EUR ar PVN` },
            { name: 'Transmisijas diagnostika - manuālajām, robotizētajām un automātiskajām ātrumkārbām', 
                details: `Automātiskajām un robotizētajām (DSG, Stronic) ātrumkārbām diagnostika tiek veikta ar vispārēju pārbaudi- eļļas līmeņa un viskozitātes pārbaudi. Tiek veikta datora diagnostika ar specializētām iekārtām, ar kurām tiek testēta elektroniskās vadības sistēma (devēji, instalācija, solenoīdu vārsti, vadības bloks utt.), tiek veikts testa brauciens (ja auto ir braucams) meistara pavadībā pārbaudot automātiskās ātrumkārbas nekorektu darbību - izslīdēšanu, sitienus un tamlīdzīgus defektus.

Manuālajām ātrumkārbām diagnostika tiek veikta tikai ar testa braucienu (ja auto ir braucams) meistara pavadībā, testējot pašas ātrumkārbas darbību, sajūga elementu darbību/nolietojumu, kā arī novērtējot dubultmasas/ divmasas spararata stāvokli. Defektējot manuālās ātrumkārbas nākas saskarties ar gadījumiem, kad to ir iespējams defektēt tikai demontējot un izjaucot, bet jau iepriekš klientam spējam nosaukt aptuvenās remonta izmaksas ar kurām var rēķināties.
‍
Manuālās ātrumkārbas diagnostika - 35.00 EUR ar PVN
Automātiskās ātrumkārbas diagnostika - 55.00 EUR ar PVN` },
        ]
    },
    {
        title: 'Kondicionieru uzpilde',
        icon: 'ac_6835274.svg',
        description: 'Veicam gaisa kondicionieru sistēmas defektāciju, uzpildi un remontu.',
        directText: `Pienākot siltajam vasaras periodam, ieslēdzot kondicionieri var sagaidīt nepatīkamu pārsteigumu - automašīnas kondicioniera sistēma salonu neatdzesē līdz komfortablai temperatūrai. Visbiežāk kondicionēšanas sistēmai ir nepieciešama atkārtota uzpilde ar aukstuma aģentu (freonu). Jaunākām automašīnām tas ir R-1234 YF, bet visbiežāk sastopamais aukstuma aģents ir R134a.

Mūsu autocentrā ir nepieciešamais aprīkojums, lai sistēmas uzpildītu ar abiem no ražotāja noteiktajiem aukstuma aģentiem.
Pirms tiek veikta uzpilde, veicam kondicionēšanas sistēmas diagnostiku ar vakuuma pārbaudi, lai pārbaudītu sistēmas hermētiskumu.Ja sistēma ir izgājusi vakuuma pārbaudi veiksmīgi, sistēma tiek uzpildīta ar aukstuma aģentu.

Kondicioniera sistēmas vakuuma pārbaude + uzpilde: 35.00 EUR
Izpildes laiks: 60 minūtes
Kondicioniera sistēmas uzpilde ar R134a gāzi - 5.00 eur/ 100 gr.
Kondicioniera sistēmas uzpilde ar R1234yf gāzi - 20.00 eur/ 100 gr.`,
    images: [
        { src: 'a1.png', size: 'large' },
        { src: 'a2.png', size: 'large' },
        { src: 'a3.png', size: 'medium' }
    ]
},
    {
        title: 'Dzinēja remonts',
        icon: 'piston_11098484.svg',
        description: 'Veicam pilna spektra dzinēju remontu un apkopes pēc ražotāja noteiktiem standartiem.',
        items: [
            { 
                name: 'Turbīnas maiņa / remonts / atjaunošana', 
                details: `Saskaroties ar turbīnas defektu klientiem piedāvājam trīs remonta risinājumus:
• Uzstādīt jaunu turbīnu
• Uzstādīt rūpnieciski atjaunotu turbīnu
• Atjaunot/ restaurēt esošo turbīnu

Pirmais variants vienmēr ir krietni dārgāks, jaunas turbīnas izmaksas parasti ir robežās no 800.00 – 2500.00 EUR. 
Otrais un trešais variants izmaksu ziņā ir ļoti līdzīgs 250.00 – 500.00 EUR. Uzstādot rūpnieciski atjaunotu turbīnu, mēs spējam ieekonomēt laiku; trešo variantu izvēlamies, kad otro variantu nav iespējams iegādāties.

Turbīnas demontāža/ montāža katram auto ir stipri atšķirīga, kā arī izmaksas. Veicot turbīnas maiņu, obligāti nepieciešams veikt eļļošanas cauruļu, dzesētāja (intercoolera) un dzesētāja cauruļu mazgāšanu ar ultraskaņas metodi, lai visus šos elementus mēs attīrītu no svešķermeņiem/ uzdegumiem un eļļām. Ja turbīna ir pastiprināti dzinusi eļļu izplūdes sistēmā, tad ir jāpārliecinās par katalizatora un/ vai kvēpu (DPF) filtra stāvokli un nepieciešamības gadījumā to mazgāt.

Kad visas šīs pozīcijas ir izpildītas, nepieciešams veikt dzinēja gaisa filtra/ eļļas filtra un eļļas maiņu.` 
            }, 
            {
                name: 'Ķēžu komplekta maiņa', 
                details: `Ražotājs noteicis katram dzinējam ķēžu komplekta maiņas intervālu vai tā resursu. Vidēji ķēžu maiņa ir jāveic ik pēc 200 000 km nobraukuma. Mēs piedāvājam veikt ķēžu komplektu maiņu visām automašīnu markām ar dīzeļdzinējiem vai benzīna dzinējiem, bet visbiežāk gan saskaramies ar BMW 2.0D un 3.0D (M47,N47, M57, N57) dzinējiem vai AUDI un VW dzinējiem 3.0D un 4.2D dzinējiem.

Pirmie simptomi, kad ir pamats bažīties, ka dzinēja ķēdes savu resursu ir izsmēlušas:
• ir tirkšķoša skaņa piedarbinot automašīnu;
• žļerkstoša skaņa uzsilušai automašīnai;
• nevienmērīga dzinēja darbība.

Šādos gadījumos ir beigti ķēdes slīdņi, beigti ķēžu spriegotāji, nodiluši zobrati vai pašas ķēdes ir izstiepušās. Ja šāda veida dzinēja problēma netiek novērsta savlaicīgi, tas var rezultēties ar pārplīsušu dzinēja ķēdi, kas nozīmē apjomīgu dzinēja remontu.

Katram dzinējam šī procedūra ir atšķirīga, ir nepieciešami specinstrumenti, lai būtu iespējams korekti nostādīt visus zobratus un ķēdes pa atzīmēm. Svarīgi ir visas demontētās detaļas, dzinēja vākus, vārstu vāku un karteri kārtīgi nomazgāt un attaukot. Veicot šo remontu mēs visas šīs daļas mazgājam ultraskaņas vannā.`
            },
            {
                name: 'Zobsiksnas komplekta maiņa', 
                details: `Ražotājs noteicis katram dzinējam zobsiksnas komplekta maiņas intervālu vai tā resursu.
Katram auto ražotājam šie intervāli ir individuāli un tie mēdz būt no 80 000 km - 220 000 km.

Mēs piedāvājam veikt zobsiksnas komplektu maiņu visām automašīnu markām ar dīzeļdzinējiem vai benzīna dzinējiem. Svarīgi veicot šo procedūru ir veikt visu komplektā ietilpstošo ruļļu nomaiņu, spriegotājmehānismu nomaiņu un dzesēšanas sūkņa nomaiņu, ja tas tiek piedzīts ar zobsiksnu.

Zobsiksnas komplektu maiņas izmaksas ir atkarīgas no automašīnas modeļa un pielietoto rezerves daļu ražotāju cenām. Lai noskaidrotu zobsiksnas komplekta maiņas izmaksas priekš savas automašīnas, sazinieties ar mums un mēs sagatavosim detalizētu piedāvājumu.`
            }
        ]
    },
    {
        title: 'Transmisijas remonts',
        icon: 'gear-box.svg',
        description: 'Veicam manuālo, automātisko un robotizēto ātrumkārbu remontu un apkopes pēc ražotāja noteiktiem standartiem.',
        items: [
            { 
                name: 'S-Tronic ātrumkārbu remonts, diagnostika un apkope', 
                details: `Ražotājs šīm ātrumkārbām ir noteicis eļļas maiņas intervālu ik pēc 60 000 km. Šīs ātrumkārbas uzbūve paredz, ka eļļa ir jāmaina divos atsevišķos nodalījumos:
- transmisijas daļā
- slapjā sajūga daļā

Katram no šiem nodalījumiem ir arī filtrs, kurus šīs apkopes laikā obligāti ir jāmaina.

Izpildes laiks: 3h, izmaksas:
Filtrs (VAICO) - 54.60 EUR
Filtrs (VAICO) - 23.53 EUR
Eļļa (MOTUL DCTF) 12.5L - 106.87 EUR
Apkope - 80.00 EUR
Kopā: 265.00 EUR

S-tronic ātrumkārbas sajūga un vai spararata defekts.
Nereti saskaramies ar Stronic ātrumkārbu sajūga defektu. Pirmie simptomi šim defektam ir nekorekta ātrumu pārslēgšana, sitieni pie pārslēgšanās un sajūga izslīdēšana, kas izpaužas kā strauja apgriezienu pacelšanās, kas nesabalansējas ar auto paātrinājumu. Sajūga maiņas gadījumā AUDI vēl ir paredzējis mainīt remontkomplektu, kas sastāv no solenoīdu vārstiem, vadu savienojumiem un citām detaļām. Veicot sajūga maiņu eļļas maiņa ir obligāta prasība, kā arī pēc remonta nepieciešams veikt ātrumkārbas adaptāciju. Ja auto tukšgaitā dzirdamas metāliskas skaņas no ātrumkārbas apvidus tad defekts ir dubultmasas spararatā.  
‍
Izpildes laiks: 1-3 darba dienas, izmaksas (spararata defekta gadījumā):  
Ātrumkārbas demontāža/ montāža - 280.00 EUR
Atjaunots dubultmasas spararats - 200.00 EUR
Jauns dubultmasas spararats - 600.00 - 1200.00 EUR
Kopā: 480.00 vai 880.00 EUR
‍
Izmaksas (sajūga defekta gadījumā):  
Ātrumkārbas demontāža/ montāža + sajūga maiņa  + ātrumkārbas adaptācija - 380.00 EUR
Sajūgs (OE AUDI) - 1460.00 EUR
Remontkomplekts (OE AUDI) - 557.53 EUR
Priekšējā vāka o -rings + blīvslēgs (OE AUDI) - 41.91 EUR
Ātrumkārbas eļļa + filtri - 185.00 EUR
Kopā: 2624.44 EUR` 
            }, 
            {
                name: 'DSG ātrumkārbu remonts, diagnostika un apkope', 
                details: `Liela daļa VAG grupas automašīnas ir aprīkotas ar DSG ātrumkārbām. DSG (Direct Shift Gearbox) ātrumkārba ir moderna robotizēta divu sajūgu automātiskā ātrumkārba. Ražotājs sērijveidā ir aprīkojis automašīnas ar divu veidu DSG pārnesumkārbām- DSG-6 un DSG-7. 

DSG-6 pakāpju ātrumkārbām ražotājs ir noteicis eļļas maiņas intervālu ik pēc 60 000 km.
Veicot eļļas maiņu obligāti ir jāmaina arī filtrs.

Izpildes laiks: 2h, izmaksas:
Eļļa MOTUL DCTF 7 L - 95.31 EUR
Filtrs (VAICO)-  19.69 EUR
Maiņa- 85.00 EUR
Kopā: 200.00 EUR

DSG-6 ātrumkārbas gadījumā slapjā sajūga, mehatorna vai solenoīdu vārstu defektu risināšanā parasti remonta izmaksas ir no 900.00 – 2500.00 EUR. Nereti klientiem piemeklējam citu lietotu ātrumkārbu, šādā remonta risinājumā ātrumkārbas maiņa ar jaunu eļļu + filtru un darbu izmaksā 1200.00 - 1400.00 EUR.
‍
Ja no ierindas ir izgājis dubultmasas spararats pirmie simptomi būs vibrācija un metāliskas skaņas no ātrumkārbas apvidus. Izpildes laiks: divas darba dienas, izmaksas:
Ātrumkārbas demontāža/ montāža - 250.00 EUR
Atjaunots dubultmasas spararats - 200.00 EUR
Jauns dubultmasas spararats - 550.00 EUR
Kopā: 450.00 vai 800.00 EUR

DSG-7 pakāpju ātrumkārbām ražotājs nav noteicis eļļas maiņas intervālu, bet gan “LIFE TIME” apzīmējumu. Gadījumos, kad DSG-7 ātrumkārbai no ierindas ir izgājis sajūgs vai spararats rekomendējam šos abus mezglus mainīt kopā. Mehatrona defekta gadījumā tiek remontēta hidrauliskā vai elektriskā daļa. 

Izpildes laiks: divas darba dienas, izmaksas:
Ātrumkārbas demontāža/ montāža - 250.00 EUR
Sajūga maiņa + ātrumkārbas adoptācija - 80.00 EUR
Atjaunots dubultmasas spararats - 200.00 EUR
Jauns dubultmasas spararats - 550.00 EUR
Sajūga komplekts - 460.00 EUR
Kopā: 990.00 vai 1340.00 EUR`
            },
        ]
    },
    {
        title: 'Ritošās daļas remonts',
        icon: 'tires.svg',
        description: 'Veicam ritošās daļas, bremžu sistēmas un auto amortizācijas remontu.',
        directText: `Veicam pilnu ritošās daļas diagnostiku/ remontu.
Nepieciešamību pēc ritošās daļas remonta visbiežāk norāda skaņas braucot pa nelīdzenu segumu vai apgrūtināta auto vadīšana, stūres rata novirze no centra braucot taisnā virzienā utt.

Lai uzsāktu remontu ir nepieciešama ritošās daļas diagnostika, kuras laikā tiek novērtēts:
• Bremžu diski un uzlikas
• Bremžu sistēmas suporti un caurules
• Amortizatori un atsperes
• Stūres iekārta/ reika
• Stūres pirksti un stūres stieņi
• Riteņu gultņi
• Tiltu bukses
• Pusasis un ārējie šarnīri
• Lodbalsti

Ja ir konstatēts kāds no stūres iekārtas/ reikas defketiem piedāvājam veikt kvalitatīvu atjaunošanu vai stūres iekārtas/ reikas maiņu.

Stūres iekārtas/ reikas defekti:
- Stūres mehānisma kustīgo daļu korozija
- Nolietošanās stūres mehānisma korpusā 
- Zobstieņa zobu nodilums
- Nodilums hidrauliskā sūkņa reduktora vārsta korpusā

Atjaunošanas procesā stūres iekārta tiek demontēta no automašīnas, pilnībā izjaukta un visi iekšējie mezgli kopā ar korpusu tiek mazgāti ultraskaņas vannā. Kad stūres iekārta ir atjaunota tiek skalota hidrauliskā sistēma, uzstāda jaunas putekļu gumijas, kā arī iepilda stūres pastiprinātāja šķidrumu. Beidzamais remonta posms ir savirzes/ savērsuma regulēšana.

Izmaksas: 380.00 – 600.00 EUR
Izpildes laiks: 2-3 darba dienas
Garantija: 1 gads`
    },
    {
        title: `Izplūdes sistēmas remonts\nKvēpu filtra (DPF) mazgāšana`,
        icon: 'exhaust.svg',
        displayTitle: 'Izplūdes sistēmas remonts / Kvēpu filtra (DPF) mazgāšana',
        description: 'Veicam kvēpu filtru (DPF) / katalizatoru profesionālu tīrīšanu, EGR vārstu nomaiņu vai remontu.',
        directText: `Veicam izplūdes sistēmas remontu, metināšanu, kā arī nodrošinām DPF kvēpu filtru profesionālu mazgāšanu un reģenerāciju. Mūsdienu dīzeļdzinējiem šī ir viena no svarīgākajām apkopes sastāvdaļām, lai nodrošinātu dzinēja ilgtspējību un jaudu.

Procedūras ietvaros:
• Tiek veikta sākotnējā datora diagnostika, lai novērtētu filtra aizsērējuma pakāpi.
• Filtra demontāža un vizuāla inspekcija.
• DPF filtra mazgāšana izmantojot specializētu hidrodinamisko iekārtu, kas izskalo pelnus, eļļas un kvēpu atlikumus.
• Žāvēšana un pretspiediena pārbaude pēc tīrīšanas.
• Filtra montāža atpakaļ automašīnā un adaptācija ar diagnostikas iekārtu.

Izmaksas un laiks ir atkarīgi no automašīnas modeļa un filtra novietojuma. Vidējās DPF filtra mazgāšanas izmaksas, ieskaitot montāžu un demontāžu: 150.00 – 250.00 EUR.`
    },
    {
        title: `Ieplūdes sistēmas remonts`,
        icon: 'engine-oil.svg',
        description: 'Ieplūdes kolektora un dzinēja galvas ieplūdes kanālu tīrīšana un attīrīšana dīzeļdzinējiem.',
        directText: `Ieplūdes kolektora un dzinēja galvas ieplūdes kanālu tīrīšana / attīrīšana.

Pārsvarā šāda veida procedūra tiek veikta dīzeļdzinējiem. Pirmie simptomi, ka šādu procedūru ir nepieciešams veikt ir apgriezienu staigāšana / lēkāšana aukstam dzinējam, veicot diagnostiku visbiežāk ir kļūdas par nosprūdušiem ieplūdes kolektora atloku vārstiem / klapītēm.

Iesākumā tiek demontēts ieplūdes kolektors ar papildus caurulēm un droseļvārstu, nepieciešamības gadījumā arī EGR vārsta caurules. Visas šīs komponentes tiek liktas ultraskaņas mazgāšanas vannā un pilnībā attīrītas no eļļas un piedegumiem. Ir jāpievērš uzmanība kolektora stāvoklim - vai nav izdiluši kolektora atloku vārsti / klapītes un jāpārbauda vai kolektora aizmugurējajā daļā, kur iziet laukā ass nav izveidojies izdilums un nav sākusies eļļas noplūde.

Kad kolektors ir demontēts varam sākt izvērtēt dzinēja galvas ieplūdes kanālu stāvokli, ja arī šie kanāli ir aizauguši tad ir nepieciešama to tīrīšana. Šajā procedūrā tiek izmantota gaisa plūsmas un smalka abrazīva strūklas tīrīšanas tehnoloģija, kas nekaitē dzinēja galvai / vārstiem. Kad visas šīs darbības esam veikuši varam uzsākt ieplūdes kolektora montāžu obligāti uzstādot jaunus blīvgredzenus.
‍
Izmaksas:
Kolektora demontāža / montāža – 80.00 - 950.00 EUR
Detaļu mazgāšana ar ultraskaņu – 35.00 - 180.00 EUR
Ieplūdes kanālu tīrīšana – 70.00 - 200.00 EUR
Blīvju komplekts – 15.00 - 120.00 EUR

*Cenu svārstība ir atkarīga no automašīnas markas / modeļa / cilindru skaita`
    },
];

const Services = () => {
    useEffect(() => {
        document.title = "Pakalpojumi - Apex Motors";
    }, []);

    const [activeServiceIndex, setActiveServiceIndex] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState(null);

    const detailsRef = useRef(null);
    const itemRefs = useRef([]);

    const toggleSubItem = (index) => {
        const isOpening = activeSubItem !== index;
        setActiveSubItem(isOpening ? index : null);
        if (isOpening) {
            setTimeout(() => {
                itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    };

    const handleServiceClick = (index) => {
        setActiveServiceIndex(index);
        setActiveSubItem(null);
        setTimeout(() => {
            detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const currentService = activeServiceIndex !== null ? servicesData[activeServiceIndex] : null;

    return (
        <section className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <h1>Mūsu pakalpojumi</h1>
                    <div className="header-divider"></div>
                    <p>Izvēlies sev nepieciešamo pakalpojumu un uzzini vairāk</p>
                </div>

                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card ${activeServiceIndex === index ? 'active' : ''}`}
                            onClick={() => handleServiceClick(index)}
                        >
                            <div className="service-card-icon">
                                <ReactSVG src={getIcon(service.icon)} className="service-icon" />
                            </div>
                            <span className="service-card-title">{service.title}</span>
                            {service.description && (
                                <p className="service-card-desc">{service.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                {currentService && (
                    <div className="active-service-details" ref={detailsRef}>
                        <div className="services-divider"></div>
                        <h2 className="selected-service-title">
                            {currentService.displayTitle || currentService.title}
                        </h2>
                        
                        <div className="sub-items-container">
                            {currentService.directText && (
                                <div className="direct-service-wrapper">
                                    <div className="direct-description-block">
                                        <p>{currentService.directText}</p>
                                    </div>
                                    
                                    {currentService.images && currentService.images.length > 0 && (
                                        <div className="sub-item-gallery direct-gallery">
                                            {currentService.images.map((img, imgIndex) => (
                                                <div key={imgIndex} className={`sub-item-img-wrapper ${img.size}`}>
                                                    <img 
                                                        src={`/images/photos/${img.src}`} 
                                                        alt={`Servisa attels ${imgIndex + 1}`} 
                                                        className="sub-item-img" 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {currentService.items &&
                                currentService.items.map((item, i) => (
                                    <div key={i} className={`sub-item ${activeSubItem === i ? 'open' : ''}`} ref={el => itemRefs.current[i] = el}>
                                        <button className="sub-item-header" onClick={() => toggleSubItem(i)}>
                                            <span>{item.name}</span>
                                            <span className={`arrow ${activeSubItem === i ? 'open' : ''}`}>▼</span>
                                        </button>
                                        {activeSubItem === i && (
                                            <div className="sub-item-content">
                                                <p>{item.details}</p>
                                                
                                                {item.images && item.images.length > 0 && (
                                                    <div className="sub-item-gallery">
                                                        {item.images.map((img, imgIndex) => (
                                                            <div key={imgIndex} className={`sub-item-img-wrapper ${img.size}`}>
                                                                <img 
                                                                    src={`/images/photos/${img.src}`} 
                                                                    alt={`Pakalpojuma attels ${imgIndex + 1}`} 
                                                                    className="sub-item-img" 
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
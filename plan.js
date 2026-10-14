/* 3 günlük döngü: ağırlık + kardiyo → ağırlık + kardiyo → dinlenme.
   img: ExerciseGymGifsDB içindeki hareketin yolu (kas/slug) — .gif olarak yüklenir.
   how: nasıl yapılır (sırayla), tips: dikkat edilecekler.
   unit: kayıt kutusunun birimi (varsayılan kg). log: false ise kayıt kutusu yok.
   timer: satırdaki zamanlayıcının bölümleri (yalnızca kardiyoda). */

/* Döngünün 1. gününün varsayılan tarihi. Sitedeki "Bugün kaçıncı gün?" seçimi bunu ezer. */
const CYCLE_START = "2026-10-01";

const GYM = {
  chestPress: {
    name: "Machine chest press", tr: "Makineli göğüs presi", img: "pectorals/lever-chest-press",
    how: [
      "Koltuğu, tutamaklar göğsünün ortası hizasına gelecek şekilde ayarla.",
      "Sırtını ve kalçanı pede tam yasla, ayakların yere bassın.",
      "Tutamakları kavra, nefes vererek kollarını öne doğru it.",
      "Kollar tam kilitlenmeden dur, bir an bekle.",
      "Nefes alarak 2-3 saniyede kontrollü geri getir; göğsünde gerilmeyi hisset.",
    ],
    tips: [
      "Dirsekler omuz hizasında yanlara açılmasın, gövdeyle yaklaşık 45° açı yapsın.",
      "Kürek kemiklerini geriye ve aşağı sıkıştır, omuzlarını kulaklarına kaldırma.",
      "Sırtını pedden ayırma, belini köprü yapma.",
      "Dirsekleri sertçe kilitleme.",
    ],
  },
  chestFly: {
    name: "Machine chest fly", tr: "Makineli göğüs fly (pec deck)", img: "pectorals/lever-seated-fly",
    how: [
      "Koltuğu, kolların açıkken omuz hizasında olacak şekilde ayarla.",
      "Sırtın pede yaslı, tutamakları kavra; dirsekler hafif bükük.",
      "Kollarını geniş bir yay çizerek önde birleştir.",
      "Önde göğsünü 1 saniye sık.",
      "Yavaşça aç; göğsünde hafif gerilme hissedince dur.",
    ],
    tips: [
      "Dirsek açısı baştan sona sabit kalsın; kolu bükerek itmeye çevirme.",
      "Geriye fazla açma — omzun önünde ağrı hissedersen aralığı kısalt.",
      "Göğsün dik, sırtın pedde kalsın.",
      "Hafif ağırlıkla başla; omuz eklemi bu harekette hassastır.",
    ],
  },
  shoulderPress: {
    name: "Machine shoulder press", tr: "Makineli omuz presi", img: "delts/lever-shoulder-press-v-3",
    how: [
      "Koltuğu, tutamaklar omuz hizasında ya da biraz üstünde olacak şekilde ayarla.",
      "Sırtın pede tam yaslı, ayakların yerde.",
      "Nefes vererek tutamakları yukarı it.",
      "Kollar tam kilitlenmeden dur.",
      "Kontrollü şekilde omuz hizasına geri indir.",
    ],
    tips: [
      "Karnını hafif sık, belini pedden ayırıp aşırı çukurlaştırma.",
      "Başını öne uzatma, boynun gevşek kalsın.",
      "Omuzlarını kulaklarına doğru silkme.",
      "İterken sırtını yayla kaldırıyorsan ağırlık fazla demektir.",
    ],
  },
  lateralRaise: {
    name: "Dumbbell lateral raise", tr: "Dambılla yana kaldırış", img: "delts/dumbbell-lateral-raise",
    how: [
      "Ayakta dur, ayaklar kalça genişliğinde, dambıllar iki yanında.",
      "Dirseklerin hafif bükük, gövden çok az öne eğik.",
      "Kollarını yanlara doğru omuz hizasına kadar kaldır.",
      "Üstte bir an dur.",
      "2-3 saniyede yavaşça indir.",
    ],
    tips: [
      "Omuz hizasının üzerine çıkma.",
      "Gövdeni sallayıp hız alma; sallanıyorsan ağırlık fazla. Başlangıçta 2-5 kg yeter.",
      "Dirseğin önde gitsin, el bileğin dirseğinden yukarı çıkmasın.",
      "Omuzlarını kulaklarına doğru kaldırma.",
    ],
  },
  latPulldown: {
    name: "Machine lat pulldown", tr: "Lat çekiş", img: "lats/cable-pulldown-pro-lat-bar",
    how: [
      "Diz pedini, dizlerin altında sıkıca sabitlenecek şekilde ayarla.",
      "Barı omuz genişliğinden biraz geniş, avuç içleri öne bakacak şekilde tut ve otur.",
      "Göğsünü hafif kaldır, çok az geriye yaslan.",
      "Dirseklerini aşağı ve geriye çekerek barı göğsünün üstüne getir.",
      "Kontrollü şekilde yukarı bırak, kolların tam uzansın.",
    ],
    tips: [
      "Barı ensenin arkasına çekme.",
      "Gövdeni geriye savurarak çekme; gövde sabit kalsın.",
      "\"Ellerimle değil dirseklerimle çekiyorum\" diye düşün — böylece sırt çalışır.",
      "Bar yukarı giderken ağırlığın seni çekmesine izin verme, yavaş bırak.",
    ],
  },
  seatedRow: {
    name: "Seated machine row", tr: "Oturarak makine kürek", img: "upper-back/lever-seated-row",
    how: [
      "Göğüs pedini, kolların uzanınca tutamaklara rahatça yetişeceğin şekilde ayarla.",
      "Göğsünü pede yasla, tutamakları kavra.",
      "Dirseklerini geriye çek, kürek kemiklerini birbirine sıkıştır.",
      "Arkada 1 saniye bekle.",
      "Kontrollü şekilde kollarını uzat.",
    ],
    tips: [
      "Göğsünü pedden ayırıp gövdeyle çekme.",
      "Omuzlarını yukarı kaldırma.",
      "Dirsekler gövdene yakın geçsin.",
      "Bileklerini bükme; ellerin sadece kanca gibi tutsun.",
    ],
  },
  cableCurl: {
    name: "Cable biceps curl", tr: "Kablo biceps curl", img: "biceps/cable-curl",
    how: [
      "Makarayı en alta indir, düz ya da EZ bar tak.",
      "Barı avuç içleri yukarı bakacak şekilde, omuz genişliğinde tut.",
      "Dirseklerini gövdenin yanına sabitle.",
      "Barı omuzlarına doğru kaldır, üstte biceps'ini sık.",
      "2-3 saniyede indir, kolların tam açılsın.",
    ],
    tips: [
      "Dirseklerin öne-arkaya kaymasın.",
      "Belinden sallanarak kaldırma, dik dur.",
      "İnişi bırakma, kontrollü indir.",
      "Bileklerin düz kalsın.",
    ],
  },
  pushdown: {
    name: "Cable triceps pushdown", tr: "Kablo triceps itiş", img: "triceps/cable-pushdown",
    how: [
      "Makarayı en üste al, düz bar ya da halat tak.",
      "Barı avuç içleri aşağı bakacak şekilde tut, makaraya yakın dur, gövden hafif öne eğik.",
      "Dirseklerini gövdenin yanına sabitle.",
      "Barı kolların tam düzleşene kadar aşağı it, triceps'ini sık.",
      "Dirsekler yaklaşık 90° olana kadar kontrollü geri bırak.",
    ],
    tips: [
      "Dirsekler sadece menteşe gibi çalışsın; kalkıp inmesin.",
      "Omuzlarınla ya da gövdenle üstüne abanarak bastırma.",
      "Bileklerini düz tut.",
      "Bar yukarı çıkarken dirseklerin de kalkıyorsa fazla yukarı bırakıyorsun.",
    ],
  },
  legPress: {
    name: "Leg press", tr: "Bacak presi", img: "glutes/sled-45-leg-press",
    how: [
      "Sırtını ve kalçanı koltuğa tam yasla.",
      "Ayaklarını platformun ortasına, omuz genişliğinde koy; parmak uçların hafif dışa baksın.",
      "Platformu biraz itip güvenlik kollarını aç.",
      "Dizlerini bükerek platformu kontrollü indir; dizler yaklaşık 90° olsun.",
      "Topuklarından iterek yukarı çık, dizleri kilitlemeden dur.",
      "Bitince güvenlik kollarını kapatıp platformu bırak.",
    ],
    tips: [
      "Dizlerini asla tam kilitleme — bu hareketin en önemli kuralı.",
      "Kalçan koltuktan kalkacak kadar derin inme; belin yuvarlanır.",
      "Dizlerin içe çökmesin, ayak parmaklarının yönünü takip etsin.",
      "Topuklarını platformdan kaldırma.",
      "Nefesini tutma: inerken al, iterken ver.",
    ],
  },
  legExt: {
    name: "Machine leg extension", tr: "Bacak ekstansiyonu", img: "quads/lever-leg-extension",
    how: [
      "Sırt pedini, dizlerin makinenin dönme noktasıyla aynı hizada olacak şekilde ayarla.",
      "Ayak pedini ayak bileğinin hemen üstüne getir.",
      "Yan tutamakları tut, kalçan koltukta otursun.",
      "Bacaklarını düzleşene kadar kaldır, üstte ön bacağını 1 saniye sık.",
      "2-3 saniyede indir.",
    ],
    tips: [
      "Ağırlığı fırlatma, yavaş ve kontrollü çalış.",
      "Kalçanı koltuktan kaldırma.",
      "Dizinde ağrı (yanma değil) hissedersen ağırlığı düşür ya da aralığı kısalt.",
      "Plakaları aşağıda birbirine çarptırma; gerilim sürsün.",
    ],
  },
  legCurl: {
    name: "Machine lying leg curl", tr: "Yüzüstü bacak curl", img: "hamstrings/lever-lying-leg-curl",
    how: [
      "Yüzüstü yat, dizlerin bankın kenarından hemen dışarıda kalsın.",
      "Ayak pedi ayak bileklerinin hemen üstünde, aşil tendonunda dursun.",
      "Tutamakları kavra, kalçanı banka bastır.",
      "Topuklarını kalçana doğru çek.",
      "Kontrollü indir, bacakların neredeyse düzleşsin.",
    ],
    tips: [
      "Kalçanı yukarı kaldırma; kaldırıyorsan ağırlık fazla.",
      "Belini çukurlaştırma, karnını hafif sık.",
      "İnişte ağırlığı bırakma, yavaş indir.",
      "Ayaklarını gevşek tut, parmak ucunu sertçe uzatma.",
    ],
  },
};

const TREADMILL = "cardio/walking-on-incline-treadmill";
const BIKE = "cardio/stationary-bike-walk";

/* Aynı makineyi kullanan seanslar aynı görseli paylaşır; `key` kayıtlarını ayrı tutar. */
const CARDIO = {
  bike: {
    name: "Easy bike", tr: "Rahat tempo bisiklet", img: BIKE, unit: "seviye",
    how: [
      "Seleyi, pedal en alttayken dizin hafif bükük kalacak yüksekliğe ayarla.",
      "İlk 5 dk en düşük dirençte çevir, ısın.",
      "Direnci en düşük 2-3 kademeden birine getir, dakikada 60-70 tur çevir.",
      "Sürenin sonuna kadar aynı rahat tempoda kal.",
    ],
    tips: [
      "Bacağın yanıyorsa direnç fazla: hızı değil direnci düşür.",
      "Yüksek sesle tam bir cümle kuramıyorsan yavaşla.",
      "Sele çok alçaksa diz, çok yüksekse kalça zorlanır.",
      "Gidonda kambur durma, sırtın düz kalsın.",
    ],
  },
  walk: {
    name: "Easy treadmill walk", tr: "Rahat tempo bant yürüyüşü", img: TREADMILL, unit: "km/s",
    how: [
      "Kenarlara basıp bant yavaşken üstüne çık, güvenlik klipsini tak.",
      "Eğimi %0-2, hızı 3.5-4.5 km/s arasına getir.",
      "Kollarını doğal şekilde salla, dik yürü.",
      "Son 5 dk eğimi 0'a, hızı 3.5 km/s'e indir; bant tamamen durunca in.",
    ],
    tips: [
      "Nefes nefese kalıyorsan önce eğimi, sonra hızı düşür.",
      "Tutamaklara tutunma; tutunman gerekiyorsa hız fazla.",
      "İç bacağın sürtünüyorsa dur, krem sür ya da bisiklete geç.",
      "30 dakikayı rahat yapınca eğimi bir kademe artır, hızı değil.",
    ],
  },
  film: {
    name: "Movie ride", tr: "Film eşliğinde bisiklet", img: BIKE, key: "cardio/film", unit: "seviye",
    how: [
      "Filmi ya da diziyi aç, telefonu gidona yerleştir.",
      "İlk 5 dk en düşük dirençte çevir.",
      "Direnci en düşük 2-3 kademede tut, dakikada 60-70 tur çevir.",
      "Bittiğinde not kutusuna filmde kaldığın dakikayı yaz (ör. Troy 0:42).",
    ],
    tips: [
      "Filmi takip edemiyorsan direnç fazla; düşür.",
      "Bu filmi yalnızca bisikletteyken izle, devamı bir sonraki kardiyo gününe kalsın.",
      "Ağırlıktan sonra 20 dk yeter; her hafta 5 dk ekleyerek 45 dk'ya çık.",
      "Sele acıtıyorsa 15-20 dakikada bir yarım dakika pedalların üstünde doğrul.",
    ],
  },
  ladder: {
    name: "Incline ladder", tr: "Eğim merdiveni", img: TREADMILL, key: "cardio/ladder", unit: "km/s",
    how: [
      "5 dk eğim 0, hız 3.5-4 km/s: ısınma.",
      "Hızı sabit tut, eğimi 3 dakikada bir değiştir: %1 → %2 → %3 → %4 → %3 → %2 → %1.",
      "Son 4 dk eğim 0, hız 3.5 km/s: soğuma.",
    ],
    tips: [
      "Hedefin yalnızca bir sonraki 3 dakika; toplam süreyi düşünme.",
      "%4 fazla geliyorsa %3'te dön, merdiveni kısalt.",
      "Tutamaklara tutunma.",
      "Merdiveni rahat bitirince en üst basamağı %5 yap.",
    ],
  },
  interval: {
    name: "Bike intervals", tr: "Bisiklet interval", img: BIKE, key: "cardio/interval", unit: "seviye",
    how: [
      "5 dk en düşük dirençte ısın.",
      "1 dk direnci bir kademe artır, 2 dk eski dirence dön. Bunu 7 kez tekrarla.",
      "Son 4 dk en düşük dirençte yavaş çevir.",
    ],
    tips: [
      "Zor dakika sprint değil: yalnızca bir kademe yüksek direnç, aynı pedal hızı.",
      "2 dakikalık dinlenmede nefesin toparlanmıyorsa turu atla, rahat tempoda devam et.",
      "Kayıt kutusuna zor dakikalarda kullandığın direnci yaz.",
    ],
  },
  elliptical: {
    name: "Elliptical", tr: "Eliptik bisiklet", img: "cardio/walk-elliptical-cross-trainer", unit: "seviye",
    how: [
      "Pedallara tam bas, tutamakları kavra.",
      "En düşük 2-3 direnç kademesinden birini seç.",
      "Rahat, düzenli bir tempoda çalış.",
    ],
    tips: [
      "Topuklarını pedaldan kaldırma.",
      "Dik dur, ağırlığını tutamaklara verme.",
      "Yüksek sesle tam bir cümle kuramıyorsan direnci düşür.",
    ],
  },
  short: {
    name: "Short ride", tr: "Kısa bisiklet", img: BIKE, key: "cardio/short", unit: "seviye",
    how: [
      "3 dk en düşük dirençte ısın.",
      "10 dk en düşük 2-3 kademede rahat tempoda çevir.",
      "2 dk en düşük dirençte yavaşla.",
    ],
    tips: [
      "Bu seans hiç gitmemenin yerine geçer; kısa diye küçümseme.",
      "Bitince iyi hissediyorsan 5-10 dk daha ekleyebilirsin, zorunda değilsin.",
    ],
  },
};

/* Zamanlayıcı bölümleri: etiket ve dakika. */
const part = (label, minutes) => ({ label, sec: minutes * 60 });

const TIMERS = {
  steady: (minutes) => [part("Isınma · en düşük seviye", 5), part("Rahat tempo", minutes - 5)],
  ladder: [
    part("Isınma · eğim 0", 5),
    ...[1, 2, 3, 4, 3, 2, 1].map((grade) => part("Eğim %" + grade, 3)),
    part("Soğuma · eğim 0", 4),
  ],
  interval: [
    part("Isınma · en düşük direnç", 5),
    ...Array.from({ length: 7 }, () => [part("Zor · direnç +1", 1), part("Rahat · eski direnç", 2)]).flat(),
    part("Soğuma · en düşük direnç", 4),
  ],
  short: [part("Isınma · en düşük direnç", 3), part("Rahat tempo", 10), part("Soğuma · en düşük direnç", 2)],
};

/* Ağırlık günlerinin ortak notları. */
const WEIGHT_NOTES = [
  "Önce ağırlık, sonra kardiyo. Başlamadan 5 dk koşu bandında yürüyerek ısın; ilk harekette hafif ağırlıkla 1 ısınma seti yap.",
  "Ağırlığı, 15 tekrarı düzgün yapabileceğin ama son 2-3 tekrarın zorladığı şekilde seç.",
  "Setler arasında 60-90 saniye dinlen.",
  "İki sette de 15 tekrarı rahat yapıyorsan sonraki antrenmanda ağırlığı bir kademe artır.",
  "Kas yanması normaldir; eklemde batma ya da keskin ağrı olursa o hareketi bırak.",
];

/* İki ağırlık gününün sonundaki kardiyo. Seans sırası iki gün arasında ortaktır:
   1. günde A yapıldıysa 2. günde B önerilir. */
const CARDIO_BLOCK = {
  slug: "kardiyo",
  notes: [
    "Ağırlıktan hemen sonra yapılır. Isınman zaten tamam; ilk dakikaları yine de rahat tempoda geçir.",
    "Çok mu ağır? Yüksek sesle tam bir cümle söyle. Yarıda nefes alman gerekiyorsa direnci ya da eğimi düşür.",
    "Doğru tempoda film izleyebilirsin. Bacağın ya da ciğerin yanıyorsa fazla yükleniyorsun; kolay tempo boşa gitmez, yağ yakımı ve dayanıklılık burada gelişir.",
    "Sürtünme: dize yakın boyda, bacağı saran tayt ya da spor şortu giy; iç bacağa önceden vazelin ya da sürtünme önleyici stick sür. Cildin hassassa sürtünmesi az bir seans seç.",
    "Ağırlıktan sonra bitkinsen F'yi (15 dk) seç; o gün yine sayılır. 30 dakikayı rahat yapınca önce süreyi, sonra direnci ya da eğimi artır.",
    "Göğüste baskı ya da ağrı, baş dönmesi, çarpıntı olursa hemen dur.",
  ],
  /* `spare` seanslar sırayla önerilmez, yalnızca elle seçilir. */
  sessions: [
    {
      key: "A", name: "Yarı yarıya", meta: "30 dk", chafe: "orta",
      when: "Varsayılan seans: yarısı bisiklet, yarısı yürüyüş.",
      work: [
        { ex: CARDIO.bike, sets: "15 dk", tag: "Direnç 2-3 · 60-70 tur/dk", timer: TIMERS.steady(15) },
        { ex: CARDIO.walk, sets: "15 dk", tag: "Eğim %0-2 · 3.5-4.5 km/s", timer: [part("Rahat tempo", 12), part("Soğuma · eğim 0", 3)] },
      ],
    },
    {
      key: "B", name: "Film günü", meta: "20-45 dk", chafe: "az",
      when: "Film ya da dizi açıp kafa boşaltmak istediğin gün.",
      work: [
        { ex: CARDIO.film, sets: "20-45 dk", tag: "Direnç 2-3 · 60-70 tur/dk" },
      ],
    },
    {
      key: "C", name: "Eğim merdiveni", meta: "30 dk", chafe: "orta",
      when: "Sıkıldığın gün: eğim 3 dakikada bir değişir.",
      work: [
        { ex: CARDIO.ladder, sets: "30 dk", tag: "Eğim %0-4 · 3.5-4.5 km/s", timer: TIMERS.ladder },
      ],
    },
    {
      key: "D", name: "Bisiklet interval", meta: "30 dk", chafe: "az",
      when: "Zaman geçmiyorsa: 1 dk biraz zor, 2 dk rahat.",
      work: [
        { ex: CARDIO.interval, sets: "30 dk", tag: "7 tur · 1 dk zor / 2 dk rahat", timer: TIMERS.interval },
      ],
    },
    {
      key: "E", name: "Makine turu", meta: "30 dk", chafe: "orta",
      when: "Tek makinede duramadığın gün.",
      work: [
        { ex: CARDIO.walk,       sets: "10 dk", tag: "Eğim %0-2 · 3.5-4.5 km/s", timer: [part("Yürüyüş", 10)] },
        { ex: CARDIO.bike,       sets: "10 dk", tag: "Direnç 2-3", timer: [part("Bisiklet", 10)] },
        { ex: CARDIO.elliptical, sets: "10 dk", tag: "Direnç 2-3", timer: [part("Eliptik", 10)] },
      ],
    },
    {
      key: "F", name: "Kısa gün", meta: "15 dk", chafe: "az", spare: true,
      when: "Ağırlıktan sonra bitkin olduğun gün. Hiç yapmamaktan iyidir.",
      work: [
        { ex: CARDIO.short, sets: "15 dk", tag: "Direnç 1-3", timer: TIMERS.short },
      ],
    },
  ],
};

/* Ağırlık iki güne bölünür: 1. gün itiş (göğüs, omuz), 2. gün çekiş (sırt) ve kollar.
   Bacak makineleri iki güne dağıtılır; her gün ağırlığın ardından kardiyo gelir. */
const CYCLE = [
  {
    slug: "agirlik-1", day: "1. gün", focus: "Göğüs · omuz · bacak", plate: "25",
    notes: WEIGHT_NOTES,
    work: [
      { ex: GYM.chestPress,    sets: "2 × 15" },
      { ex: GYM.chestFly,      sets: "2 × 15" },
      { ex: GYM.shoulderPress, sets: "2 × 15" },
      { ex: GYM.lateralRaise,  sets: "2 × 15" },
      { ex: GYM.legPress,      sets: "2 × 15" },
    ],
    cardio: CARDIO_BLOCK,
  },
  {
    slug: "agirlik-2", day: "2. gün", focus: "Sırt · kol · bacak", plate: "20",
    notes: WEIGHT_NOTES,
    work: [
      { ex: GYM.latPulldown, sets: "2 × 15" },
      { ex: GYM.seatedRow,   sets: "2 × 15" },
      { ex: GYM.cableCurl,   sets: "2 × 15" },
      { ex: GYM.pushdown,    sets: "2 × 15" },
      { ex: GYM.legExt,      sets: "2 × 15" },
      { ex: GYM.legCurl,     sets: "2 × 15" },
    ],
    cardio: CARDIO_BLOCK,
  },
  { slug: "dinlenme", day: "3. gün", rest: true },
];

/* 3 günlük döngü: ağırlık → kardiyo → dinlenme.
   img: ExerciseGymGifsDB içindeki hareketin yolu (kas/slug) — .gif olarak yüklenir.
   how: nasıl yapılır (sırayla), tips: dikkat edilecekler.
   unit: kayıt kutusunun birimi (varsayılan kg). log: false ise kayıt kutusu yok. */

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

const CARDIO = {
  warmup: {
    name: "Warm-up walk", tr: "Isınma: düz yürüyüş", img: TREADMILL, log: false,
    how: [
      "Koşu bandına çık, eğimi 0-1'de bırak.",
      "Hızı 4-5 km/s'e getir, rahat adımlarla yürü.",
      "5 dakika boyunca nefesini ve adımını oturt.",
    ],
    tips: [
      "Bant çalışırken üstüne atlama; kenarlara basıp hız düşükken bin.",
      "Güvenlik klipsini (varsa) kıyafetine tak.",
    ],
  },
  incline: {
    name: "Incline treadmill walk", tr: "Eğimli koşu bandı yürüyüşü", img: TREADMILL, unit: "km/s",
    how: [
      "Eğimi kademe kademe %5'e çıkar, hızı 4.5-5.5 km/s arasında tut.",
      "Kollarını doğal şekilde salla, dik yürü.",
      "1-2. hafta: 20 dk · 3-4. hafta: 25 dk · 5-6. hafta: 30 dk · sonrası: 35 dk.",
      "35 dakikayı rahat yapınca süreyi değil eğimi artır: %6 → %7 → %8.",
    ],
    tips: [
      "Tutamaklara tutunma; tutunursan eğimin faydası kaybolur.",
      "Tempo: konuşabileceğin ama şarkı söyleyemeyeceğin bir hız. Nefes nefese kalıyorsan yavaşla.",
      "Göğüs ağrısı, baş dönmesi ya da mide bulantısı olursa hemen yavaşla ve in.",
      "Kayıt kutusuna kullandığın hızı, nota eğimi ve süreyi yaz.",
    ],
  },
  cooldown: {
    name: "Cool-down walk", tr: "Soğuma: yavaş yürüyüş", img: TREADMILL, log: false,
    how: [
      "Eğimi 0'a indir, hızı 3.5-4 km/s'e düşür.",
      "5 dakika yavaş yürü, nabzın sakinleşsin.",
      "Bandı durdur, tamamen durunca in.",
    ],
    tips: [
      "Birden durma; ani durmak baş dönmesi yapabilir.",
      "Bitince su iç.",
    ],
  },
  bike: {
    name: "Stationary bike", tr: "Kondisyon bisikleti", img: "cardio/stationary-bike-walk", unit: "seviye",
    how: [
      "Seleyi, pedal en alttayken dizin hafif bükük kalacak yüksekliğe ayarla.",
      "5 dk hafif dirençle ısın.",
      "Ana bölümde direnci, rahat ama zorlayıcı bir seviyeye getir (bant ile aynı süre).",
      "Son 5 dk direnci düşürüp yavaş pedal çevir.",
    ],
    tips: [
      "Sele çok alçaksa diz, çok yüksekse kalça zorlanır.",
      "Gidonda kambur durma, sırtın düz kalsın.",
    ],
  },
  elliptical: {
    name: "Elliptical", tr: "Eliptik bisiklet", img: "cardio/walk-elliptical-cross-trainer", unit: "seviye",
    how: [
      "Pedallara tam bas, tutamakları kavra.",
      "5 dk düşük dirençle ısın.",
      "Ana bölümde orta dirençte, bant ile aynı süre çalış.",
      "Son 5 dk direnci düşürüp yavaşla.",
    ],
    tips: [
      "Topuklarını pedaldan kaldırma.",
      "Dik dur, ağırlığını tutamaklara verme.",
    ],
  },
};

const CYCLE = [
  {
    slug: "agirlik", day: "1. gün", focus: "Ağırlık · Tüm vücut", plate: "25",
    notes: [
      "Başlamadan 5 dk koşu bandında yürüyerek ısın. İlk harekette hafif ağırlıkla 1 ısınma seti yap.",
      "Ağırlığı, 15 tekrarı düzgün yapabileceğin ama son 2-3 tekrarın zorladığı şekilde seç.",
      "Setler arasında 60-90 saniye dinlen.",
      "İki sette de 15 tekrarı rahat yapıyorsan sonraki antrenmanda ağırlığı bir kademe artır.",
      "Kas yanması normaldir; eklemde batma ya da keskin ağrı olursa o hareketi bırak.",
    ],
    work: [
      { ex: GYM.chestPress,    sets: "2 × 15" },
      { ex: GYM.chestFly,      sets: "2 × 15" },
      { ex: GYM.shoulderPress, sets: "2 × 15" },
      { ex: GYM.lateralRaise,  sets: "2 × 15" },
      { ex: GYM.latPulldown,   sets: "2 × 15" },
      { ex: GYM.seatedRow,     sets: "2 × 15" },
      { ex: GYM.cableCurl,     sets: "2 × 15" },
      { ex: GYM.pushdown,      sets: "2 × 15" },
      { ex: GYM.legPress,      sets: "2 × 15" },
      { ex: GYM.legExt,        sets: "2 × 15" },
      { ex: GYM.legCurl,       sets: "2 × 15" },
    ],
  },
  {
    slug: "kardiyo", day: "2. gün", focus: "Kardiyo · Eğimli yürüyüş", plate: "20", meta: "30-45 dk",
    notes: [
      "Yeni başlayan için en güvenli kardiyo: eklemleri yormayan, nabzı orta seviyede tutan eğimli yürüyüş.",
      "Tempo: konuşabileceğin ama şarkı söyleyemeyeceğin bir hız. Nabız saatin varsa (220 − yaşın) × 0.6-0.7 aralığı.",
      "Süreyi her 2 haftada 5 dk artır; 35 dk'ya ulaşınca süreyi değil eğimi artır.",
      "Koşu bandı doluysa aşağıdaki bisiklet ya da eliptikten birini aynı süre yap.",
    ],
    work: [
      { ex: CARDIO.warmup,   sets: "5 dk",     tag: "Eğim 0-1 · 4-5 km/s" },
      { ex: CARDIO.incline,  sets: "20-35 dk", tag: "Eğim %5-8 · 4.5-5.5 km/s" },
      { ex: CARDIO.cooldown, sets: "5 dk",     tag: "Eğim 0 · 3.5-4 km/s" },
    ],
    extra: {
      note: "Koşu bandı doluysa — aynı süre, aynı tempo",
      work: [
        { ex: CARDIO.bike,       sets: "30-45 dk" },
        { ex: CARDIO.elliptical, sets: "30-45 dk" },
      ],
    },
  },
  { slug: "dinlenme", day: "3. gün", rest: true },
];

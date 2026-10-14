# Antrenman Döngüsü

Kişisel antrenman planı, 3 günlük döngü halinde: **1. gün** göğüs, omuz,
bacak presi + kardiyo, **2. gün** sırt, kol, bacak makineleri + kardiyo,
**3. gün** dinlenme. Gün
karelerinden birine dokun, o günün hareketleri set bilgisiyle ve hareketi
gösteren görselle listelenir. Her hareketin altındaki **Nasıl yapılır · dikkat
edilecekler** açılınca adım adım yapılışı ve dikkat edilecekleri gösterir.
Görsele dokununca büyür, açıklamalar orada da görünür.

## Bugün hangi gün?

Döngü haftanın günlerine bağlı değil. Ana sayfadaki **Bugün döngünün kaçıncı
günü?** satırından 1, 2 ya da 3'e dokun; site o günden itibaren saymaya devam
eder. Bir gün spora gidemezsen buradan düzeltirsin. Seçim tarayıcıda
(`plan.cycle.v1`) saklanır; seçilmemişse `plan.js` içindeki `CYCLE_START`
tarihi 1. gün sayılır.

## Kardiyo seansları

Her iki ağırlık gününün sonunda, ağırlıktan sonra yapılan altı seçenekli kardiyo seansı var: **A** yarı yarıya (15 dk bisiklet +
15 dk yürüyüş), **B** film günü, **C** eğim merdiveni, **D** bisiklet interval,
**E** makine turu, **F** kısa gün (15 dk). Gün sayfasındaki Kardiyo bölümünde A-F
düğmeleriyle seçilir; her seansta ne zaman uygun olduğu ve iç bacak sürtünmesinin
az mı orta mı olduğu yazar.

Site her kardiyoda sıradaki seansı önerir (F yalnızca elle seçilir); sıra iki gün arasında ortaktır, 1. günde A yaptıysan 2. günde B gelir. Son
yapılan seans tarayıcıda (`plan.session.v1`) saklanır.

### Zamanlayıcı

Film günü dışındaki kardiyo hareketlerinin altında bir zamanlayıcı var.
**Başlat**'a dokununca bölümleri sırayla sayar (ör. intervalde ısınma, 7 tur
zor/rahat, soğuma) ve her bölüm değişiminde bip sesi ve titreşimle haber verir.
Çalışırken ekranı açık tutar; sayfa yenilense de kaldığı yerden devam eder
(`plan.timer.v1`). Telefonu kilitlersen ya da başka uygulamaya geçersen süre
doğru saymaya devam eder ama ses gelmez. Bölümler `plan.js` içindeki `TIMERS`
ve hareket satırındaki `timer` alanından gelir.

Derleme adımı yok — dosyalar olduğu gibi çalışır.

## Yerelde açmak

```
npx serve .
```

Ya da `index.html` dosyasını doğrudan tarayıcıda aç.

## Yayına almak (GitHub Pages)

1. Bu klasörü bir GitHub deposuna gönder.
2. Depo → **Settings** → **Pages** → Source: **Deploy from a branch**, Branch:
   `main` / `root` → **Save**.
3. Bir iki dakika sonra site `https://<kullanıcı-adın>.github.io/<depo-adı>`
   adresinde yayında olur.

Ücretsiz GitHub hesaplarında Pages yalnızca public depolarda çalışır.

## Ağırlık kaydı ve notlar

Her hareketin altında bir kg kutusu (kardiyoda hız ya da seviye) ve kısa bir not alanı var. Yazıp alandan
çıkınca kendiliğinden kaydedilir, altta son güncelleme tarihi görünür.

Kayıt **harekete** bağlıdır, güne değil: aynı hareket başka bir günde de
geçiyorsa orada da aynı ağırlığı görürsün. Kutuları boşaltmak kaydı siler.

**Veri nerede duruyor:** yalnızca o tarayıcının `localStorage` alanında
(`plan.log.v1` anahtarı). Site tamamen statik olduğu için ağırlıkların GitHub
deposuna ya da herhangi bir sunucuya gitmez. Bunun anlamı:

- Telefonda girdiğin ağırlık bilgisayarda görünmez, tersi de geçerli.
- Tarayıcı verilerini temizlersen kayıtlar silinir.
- Gizli sekmede depolama kapalıysa alan "kaydedilemedi" der, site çalışmaya
  devam eder.

## Planı değiştirmek

Her şey `plan.js` içinde:

- `GYM` — hareketler. `img` alanı, animasyonun
  [ExerciseGymGifsDB](https://github.com/JahelCuadrado/ExerciseGymGifsDB)
  içindeki yoludur (`kas/hareket-adi`). Tüm liste:
  `https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main/api/en/exercises.json`
- `how` / `tips` — her hareketin "Nasıl yapılır" ve "Dikkat" listeleri.
- `CARDIO` — kardiyo hareketleri. Aynı görseli paylaşan hareketlere `key`
  verilir ki kayıtları karışmasın.
- `CARDIO_BLOCK` — ağırlık günlerinin sonundaki kardiyo seansları (A-F). `spare`
  olanlar sırayla önerilmez.
- `CYCLE` — döngünün günleri, sıra, set/tekrar bilgisi ve gün notları.

Animasyonlar jsDelivr üzerinden çekilir. Bir GIF yüklenemezse hareketin baş
harfleri görünür, sayfa bozulmaz. Telefonda hareket kısıtlaması açıksa GIF
yerine duragan kare gösterilir.

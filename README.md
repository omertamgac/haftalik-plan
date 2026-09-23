# Haftalık Plan

Kişisel antrenman planı. Gün karelerinden birine dokun, o günün hareketleri set
bilgisiyle ve hareketi gösteren görselle listelenir. Görsele dokununca büyür.

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

Her hareketin altında bir kg kutusu ve kısa bir not alanı var. Yazıp alandan
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
- `WEEK` — günler ve o günün hareket sırası, set/tekrar bilgisi.
- `FINISHER` — antrenman sonu ek çalışma.

Animasyonlar jsDelivr üzerinden çekilir. Bir GIF yüklenemezse hareketin baş
harfleri görünür, sayfa bozulmaz. Telefonda hareket kısıtlaması açıksa GIF
yerine duragan kare gösterilir.

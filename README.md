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

## Planı değiştirmek

Her şey `plan.js` içinde:

- `GYM` — hareketler. `img` alanı, görselin
  [free-exercise-db](https://github.com/yuhonas/free-exercise-db) içindeki klasör
  adıdır. Yeni hareket eklerken o depodaki klasör adını yaz.
- `WEEK` — günler ve o günün hareket sırası, set/tekrar bilgisi.
- `FINISHER` — antrenman sonu ek çalışma.

Görseller jsDelivr üzerinden çekilir; her hareketin başlangıç ve bitiş karesi
sırayla gösterilerek hareket canlandırılır. Bir kare yüklenemezse hareketin baş
harfleri görünür, sayfa bozulmaz.

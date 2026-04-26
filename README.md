# basic-small-site

## デザイントーン

このデモサイトでは、同じHTML構成をもとに、3つのデザイントーンを用意しています。

### BASIC

誠実・見やすい・標準的なデザイン。
小規模事業者向けの基本形。

### STYLISH

洗練・シャープ・印象的なデザイン。
世界観やブランド感を出したい場合に向いている。

### SOFT

やわらかい・親しみやすい・相談しやすいデザイン。
人柄や安心感を伝えたい場合に向いている。

## テーマ切り替え

各HTMLのbodyに以下のクラスを付与する。

- theme-basic
- theme-stylish
- theme-soft

対応するテーマCSSを最後に読み込む。

例：

<link rel="stylesheet" href="../css/foundation.css" />
<link rel="stylesheet" href="../css/common.css" />
<link rel="stylesheet" href="../css/work.css" />
<link rel="stylesheet" href="../css/theme-soft.css" />

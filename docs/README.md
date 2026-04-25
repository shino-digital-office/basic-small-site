# SK-base_v3

本リポジトリは、以下の機能を提供します。

1. **スターターキットとしての HTML / SCSS 骨格**
   - ポートフォリオ制作や実案件でそのまま土台として使用可能
   - 基本構造を固定しつつ、デザイン差し替え可能

2. **サイト全体の構造設計**
   - 背景・画像・テキストの役割分離
   - ブロック単位で自由にデザイン変更可能

---

## ファイル構成

### scssのファイル構成

```text

scss/
├─ common/
│  ├─ _bg.scss//(コメントアウト中)
│  ├─ _card.scss//(コメントアウト中)
│  ├─ _parts.scss(nav,button,pagetopなど)
│  ├─ _fv.scss
│  ├─ _drawer.scss
│  ├─ _header.scss
│  ├─ _sidebar.scss
│  └─ _footer.scss
│
├─ foundation/
│  ├─ _base.scss
│  ├─ _breakpoints.scss
│  ├─ _mixin.scss
│  ├─ _reset.scss
│  └─ _variables.scss
│
├─ common.scss
└─ page.scss・・・(pageは、htmlページ毎に作成)
```

#### 各レイヤーの役割

- common
  共通利用前提の部品群。
  scssの記述場所が迷子にならないために分割した。
  直接編集し、さらにpage.scss 側で上書きして使います。

- foundation
  変数・リセット・ブレークポイントなど、案件の土台。
  案件開始時に定義し、その後は原則触らない想定です。

- page.scss
  案件用スタイル。
  ページ毎に１ファイル作ります。

#### CSS の読み込み順

Swiper 用 CSS / JS は予め組み込んでおり、最新版に差し替えて使用可能
最新版をダウンロードして上書きすると良い。(jsでswiperを読み込む記述とバージョンそろえてセットにしておくこと)
swiper→foundation→common→pageの順に読み込む。page.scssはページ毎に差し替える。

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"/>  <!-- swiper用 -->
<link rel="stylesheet" href="css/foundation.css" />  <!-- 母艦 -->
<link rel="stylesheet" href="css/common.css" />  <!-- 共通スタイル -->
<link rel="stylesheet" href="css/page.css" />  <!-- ページ固有 -->

```

### JavaScript 構成

```
js/
├─ modules/
│  ├─ accordion.js
│  ├─ copy.js
│  ├─ drawer.js
│  ├─ modal.js
│  ├─ pagetop.js
│  └─ swiper-init.js
│
├─ vendor/
│  └─ swiper-bundle.min.js
│
└─ entry.js

```

#### JS の読み込み

jsを読み込むための記述に加え、swiperを読み込むための記述も予め組み込んでおいた。
最新版をダウンロードして上書きすると良い。

```
<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"></script>
<script src="./js/entry.js" type="module"></script>

```

（</body> 直前に配置）

## HTML 基本骨格

sidebarがない案件はhtmlの'<aside class="sidebar">'をコメントアウトする。
html骨格は二種類用意した。ドロワーのタイプ(A or B)によってlayout-drawer--in-header.html(A)またはlayout-drawer--out-of-header.html(B)を選定する。

```text

body
├─ header.site-header
├─ main.main-layout
│  ├─ .main-hero
│  └─ .main-body
│      ├─ aside.sidebar
│      └─ .main-content
│          ├─ .section
│          ├─ .section
│          └─ ...
└─ footer.site-footer

```

## header の基本構造

```text

.site-header
 ├─ .header__bg       : 背景レイヤー
 └─ .header-bar       : 内部コンテンツを水平配置（ブランド・ナビ・ボタン）
      ├─ .brand       : ロゴやブランド名
      ├─ .desktop-nav : PC表示用ナビゲーション
      └─ .drawer-icon : モバイルドロワー用（_drawer.scssで管理）

```

## drawer の基本構造

このスターターキットでは、モバイル表示向けに 2種類のドロワー を用意しています。

| タイプ            | 特徴                                                 | 使用例                           |
| ----------------- | ---------------------------------------------------- | -------------------------------- |
| **in-header**     | ヘッダーに属するドロワー。アイコンはヘッダー内に表示 | ヘッダーと連動する標準メニュー   |
| **out-of-header** | ヘッダーに属さない独立ドロワー                       | ページ上に固定されるメニューなど |

.drawer-icon → ドロワーの開閉アイコン（ハンバーガー）
.drawer-content → ドロワー本体（右側からスライドイン）
.drawer-nav → ドロワー内のナビリンク群
.drawer-overlay → ドロワー開閉時の背景オーバーレイ

## sidebar の基本構造

サイドバーは PCサイズ以上で表示される補助的な情報エリア です。
モバイルでは基本非表示ですが、親要素 .main-body の flex-direction: column にすることで表示させることも可能です。

### 構造概要

```text

<aside class="sidebar">
 ├─ .sidebar__bg      : 背景レイヤー（色や画像を設定可能）
 ├─ .sidebar-section  : セクション単位のまとまり
 │    ├─ .sidebar-title : セクションタイトル
 │    └─ .sidebar-text  : テキスト・説明文
 └─ ...他コンテンツ...


```

### 表示条件

デフォルト：display: none（モバイルは非表示）
PCサイズ（md 以上）で表示
.sidebar は sticky 固定 でスクロール追従
top はヘッダー高さ（$header-height-pc）に合わせて調整
幅は $sidebar-width で制御
余白・パディングは変数 $space-xl / $space-md で統一

### モバイル対応と親要素の設定

モバイル表示でサイドバーを表示したい場合は、親の .main-body を以下のように設定可能：

```scss
.main-body {
  display: flex;
  flex-direction: column; // サイドバーを縦に並べて表示
}
```

.main-body は PC時はデフォルトで flex-direction: row-reverse にして右側にサイドバーを配置
サイドバーの sticky が効くように、親の .main-body や祖先に overflow: hidden; は禁止

### 注意事項

1. 親要素の高さ
   .main-body の min-height: 100vh を超える内容があると、position: sticky が効かなくなる
2. 祖先要素の overflow
   .sidebar の祖先に overflow: hidden を付けると sticky が無効になるので禁止
3. モバイル表示
   デフォルトは非表示だが、.main-body の flex-direction: column で縦並びにして表示可能

## footer の基本構造

フッターは サイト下部の共通情報エリア です。
このスターターキットでは 通常フッター と 固定フッター（モバイル用） の 2種類を用意しています。

```text
<footer class="site-footer">

  ├─ .footer__bg
  │     └─ 背景専用レイヤー（色や画像を設定）
  │
  ├─ .site-footer__main           ← 通常フッター
  │     └─ .inner.inner--footer   ← 内側のパディング管理
  │
  │         ├─ .footer-nav.nav.flex-layout--row
  │         │       ├─ .nav-links.flex-layout--row
  │         │       │       ├─ a.nav-link.nav-link--link  ← ナビリンク1
  │         │       │       │       ├─ .nav-link__main
  │         │       │       │       │       ├─ .nav-link__icon
  │         │       │       │       │       │       └─ svg（アイコン）
  │         │       │       │       │       └─ .nav-link__text（リンクテキスト）
  │         │       │       │       └─ .nav-link__deco
  │         │       │       │               └─ svg（装飾アイコン）
  │         │       │       ├─ a.nav-link.nav-link--link  ← ナビリンク2
  │         │       │       └─ a.nav-link.nav-link--link  ← ナビリンク3
  │         │       │
  │         │       └─ a.button  ← ナビのボタン
  │         │
  │         └─ .footer-meta
  │                 └─ .footer-copyright
  │                         └─ 小さな著作権表示
  │
  └─ .site-footer__fixed.footer-fixed   ← 固定フッター（モバイル用）
        ├─ .footer-fixed__bg           ← 背景レイヤー
        └─ .inner.inner--flex          ← 内側を flex 配置
                ├─ span（電話番号）
                └─ span.tel-note（営業時間等の補足）

```

## section の基本構造

```html
<section class="section section--about">
  <div class="bg"></div>
  <!-- 背景用 -->
  <div class="inner">
    <!-- コンテンツ本体 -->
    <h2>当院について</h2>
    <p>説明文…</p>
  </div>
</section>
```

```scss
.section {
  position: relative; // 背景レイヤー用の基準
  // overflow: hidden;
  // padding-top: 100px;//上下方向の間隔は基本的にはpadding-bottomで取る。(各セクションでの上書きは自由)
  padding-bottom: 100px;
}
```

- 背景とコンテンツを DOM レベルで分離
- 背景は装飾、`.inner`は内容物に専念
- あえてoverflow:hidden;は解除（自由度を上げておきたい。必要に応じて個別につければよい）
- 上下方向の間隔は基本的にはpadding-bottomで取る。(個別の上書きは自由)

## 共通レイアウトルール

- `.inner` により横幅制限・中央寄せ・左右余白を一括適用
- 横並びはレイアウト用クラスで制御
- 各ブロックに bg を持たせ、背景を責務分離

---

## z-index 指針

- むやみに数値を競わせない（意味でレイヤーを分ける）
- 数値を知らなくていいものは `auto`

| 役割                         | z-index     |
| ---------------------------- | ----------- |
| 紙そのもの                   | auto        |
| 背景                         | -1, -2, -3  |
| UI / overlay / 装飾          | +1, +2, +10 |
| 固定ヘッダーなど“束そのもの” | 50,60,100   |

- overlay は疑似要素 `::after` を使用
- overlay 上にテキストを置く場合は `.inner` (z-index:2) を使用

---

## レイアウト用クラス（.inner / .inner--flex / .flex-layout）

- .inner系は各ブロックのコンテンツを中央寄せ
- 背景用 `.bg` と組み合わせて一貫したレイアウトを実現
- flex文言付きのクラスにより、htmlでflex配置かどうか確認可能になる
- flex文言付きのクラスは直下に来たテキスト要素だけ margin-bottom を殺してあるため、わざわざこれを上書きしてマージンを消す必要がない。

```scss
//要素積み上げタイプ。インナー付き。
.inner {
  padding: 0 variables.$space-lg;

  /* 最後に来たテキスト要素だけ margin-bottom を殺す */
  > :last-child {
    margin-bottom: 0;
  }

  @include breakpoints.mq(md) {
    max-width: calc(variables.$layout-max-width + variables.$space-lg * 2);
    margin: 0 auto;
  }
}

//要素フレックス配置。spとpcで配列が違う場合などに利用。インナー付き。
.inner--flex {
  padding: 0 variables.$space-lg;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
  @include breakpoints.mq(md) {
    max-width: calc(variables.$layout-max-width + variables.$space-lg * 2);
    margin: 0 auto;
  }
}

//インナーいらない場合はこちらを利用
.flex-layout {
  display: flex;
  gap: 16px;
  /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
}

//flex-layoutを明示的に横並びにしたクラス
.flex-layout--row {
  display: flex;
  flex-direction: row;
  gap: 16px;
  /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
}

//flex-layoutを明示的に縦並びにしたクラス
.flex-layout--column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* 直下に来たテキスト要素だけ margin-bottom を殺す */
  > h1,
  > h2,
  > h3,
  > h4,
  > h5,
  > h6,
  > p,
  > ul,
  > ol,
  > dl {
    margin-bottom: 0;
  }
}
```

## 専用のbg

- base\_\_be html全体のbg
- header\_\_bg headerのbg
- main-hero\_\_bg fvまわりのbg(fvを画面いっぱいにしない場合効かせることができる)
- fv\_\_bg fvはbgで装備
- main-body\_\_bg mainまわりのセクションをまたぐbg
- bg 各セクションのbg
- footer\_\_bg footerのbg
- footer-fixed\_\_bg 固定フッターのbg

各bgは任意にbgカタログで置き換えてよい。
drawerのbgだけは例外的にdrawer本体の背景に設定する。(z-index:-1;が使えないため)

bgの基本scssは以下のとおり。

```scss
.bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}
```

imgを入れる場合は、意味のあり・なしでhtmlかscssか一貫しておく
insetは変えても良い(例えばtop:22px;)。ただしマイナス値は親要素からはみ出ることを承知の上で使用すること。特にright,leftのマイナス値は横スクロールの危険がある。

左右見切れデザインのbgは以下のようにするとよい。

```scss
.bg-paper {
  position: absolute;
  inset: 0; // section と同サイズの紙。中身がはみ出ることは絶対にない。

  background-image: url("../img/about-bg.png");
  background-repeat: no-repeat;
  background-position: calc(50% + 120px) 40px; //配置は中心からのずれで表現
  background-size: 655px 935px; //サイズ固定
}
```

---

## 設計思想

- 構造（HTML）と装飾（CSS）の責務を明確に分ける
- 背景・UI・本文を同じレイヤーに混在させない
- 迷ったら「どのレイヤーの責務か」で判断する

## SVG / Icon 運用ルール

### 基本方針

- アイコンは **SVG sprite（`symbol` + `use`）方式**を採用する
- アイコンは **意味を持つ UI 要素**として扱う
- 色・サイズなどの見た目は **CSS 側で制御**する

---

### SVG ファイルの管理

- アイコンは `icons.svg` にまとめて管理する
- 各アイコンは `<symbol>` 要素として定義する
- SVG 内の色指定は行わず、`fill="currentColor"` を使用する

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-home" viewBox="0 0 24 24">
    <path d="..." fill="currentColor" />
  </symbol>
</svg>
```

### HTML での使用方法

アイコンは以下の形式で呼び出す。

```html
<svg>
  <use href="./assets/images/icons.svg#icon-home"></use>
</svg>
```

- <svg> 要素を HTML に配置する
- use 要素で必要なアイコンを参照する

### CSS での制御

- アイコンの色は color プロパティで指定する
- サイズは width / height で制御する

```scss
.icon {
  width: 24px;
  height: 24px;
  color: currentColor;
}
.button {
  color: $color-primary;

  .icon {
    width: 16px;
    height: 16px;
  }
}
```

## 今後の拡張方針

- dialog 要素を用いたモーダル実装への移行

## ライセンス・利用について

- 個人・商用利用可
- 改変・再配布可
- クレジット表記は任意

# セクション 4: コンポーネント

## 48 コンポーネントについて

#### コンポーネント お約束

```html:index.html
<my-component title=""></my-component>
<!--
  HTMLのタグのように作成
  HTMLタグと重ならないように作成
  HTMLタグと重ならないよう、
  名前は2語以上、ケバブケース(*vueファイル使用時はパスカルケースも可)

  HTMLの属性のように値を設定できる(props)
-->
```

#### コンポーネント 簡易表

| スコープ             | グローバル                    | ローカル |
| -------------------- | ----------------------------- | -------- |
| 書き方<br>読み込み方 | Vue.component('c-name',<br> { |

template: ``
})<br>

new Vue({})|import comA from './ComA.vue'<br>
<br>
export default {<br>
components: {<br>
components: {<br>
ComA
}
}
}|
|拡張子|.html, js|.vue|
|ファイル内|<script></script><br>(script 内に template)|<template></template><br><script></script><br><style></style>|
|環境|CDN|Vue-CLI<br>(webpack/babel)|
|特徴|使ってなくても呼び出される<br>(ほぼ使わない)|責務の分離)|責務の分離(役割分担)|

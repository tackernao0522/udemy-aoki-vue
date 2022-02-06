# セクション 10: Vue.js3 対応

## 126 Vue.js3 の特徴

メイン・・大規模対応<br>

1. 高速化<br>
2. ファイルサイズ減<br>
3. Provide/Inject・・長距離の props<br>
4. 大規模対応・・CompositionAPI<br>
5. TypeScript サポート改善<br>
6. IE11 未対応<br>

#### Vue3 ホームページ

Vue3 ホームページ<br>
https://v3.ja.vuejs.org <br>

Vue3 API<br>
https://v3.ja.vuejs.org/api/ <br>

使い方参考: https://v3.ja.vuejs.org/guide/introduction.html#%E3%81%AF%E3%81%97%E3%82%99%E3%82%81%E3%81%AB-2 <br>

## 127 Vue.js3 のインストール(CDN)

- 参考: https://v3.ja.vuejs.org/guide/installation.html#%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%83%8E%E3%83%BC%E3%83%88 <br>

* 参考: https://v3.ja.vuejs.org/guide/introduction.html#%E3%81%AF%E3%81%97%E3%82%99%E3%82%81%E3%81%AB-2 (宣言的レンダリング)<br>

- `section10`ディレクトリを作成<br>

* `section10/cdn.html`ファイルを作成<br>

```html:cdn.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue3 Install CDN</title>
  </head>

  <body>
    <div id="counter">
      Counter: {{ counter }}
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
      let app = Vue.createApp({
        data() {
          return {
            counter: 0,
          }
        },
      }).mount('#counter')
    </script>
  </body>
</html>
```

## 128 Vue.js devTools (ver6.x)

### Vue3 対応バージョン

GoogleChrome の Vue.js devtools<br>
Vue2・・vuer5.x <br>
Vue3・・ver6.x (beta)<br>

VueCLI・・ver4.x<br>

VueRouter・・ver4.x<br>

Vuex・・ver4.x<br>

# セクション 7: VueRouter SPA

## 84 Vue Router を使う（CDN）

#### Single Page Application

メリット<br>
ページ移動がスムーズ<br>
より高度な Web 表現<br>
ネイティブアプリの代用(PWA)<br>

デメリット<br>
初回ページ読み込みに時間がかかる<br>
実装コストがかかる<br>
SEO が十分でない（改善中）<br>
->対策 SSR SSG 他<br>

#### Vue Router テンプレート側

インストール方法 CDN or NPM<br>
https://router.vuejs.org/ja/guide/#html <br>

リンク<br>

```
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>
```

描画<br>

```
<router-view></router-view>
```

- `section07`ディレクトリを作成<br>

* `section07/cdn.html`ファイルを作成<br>

```html:cdn.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

    <div id="app">
      <h1>Hello App!</h1>
      <p>
        <!-- ナビゲーションに router-link コンポーネントを使う -->
        <!-- リンク先を `to` プロパティに指定します -->
        <!-- デフォルトで `<router-link>` は `<a>` タグとして描画されます -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
      </p>
      <!-- ルートアウトレット -->
      <!-- ルートとマッチしたコンポーネントがここへ描画されます -->
      <router-view></router-view>
    </div>

    <script>
      // 0. モジュールシステムを使っている場合 (例: vue-cli 経由で)、Vue と VueRouter をインポートし、`Vue.use(VueRouter)` を呼び出します。

      // 1. ルートコンポーネントを定義します
      // 他のファイルからインポートすることもできます
      const Foo = { template: '<div>foo</div>' }
      const Bar = { template: '<div>bar</div>' }

      // 2. ルートをいくつか定義します
      // 各ルートは 1 つのコンポーネントとマッピングされる必要があります。
      // このコンポーネントは実際の `Vue.extend()`、
      // またはコンポーネントオプションのオブジェクトでも構いません。
      // ネストされたルートに関しては後で説明します
      const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
      ]

      // 3. ルーターインスタンスを作成して、ルートオプションを渡します
      // 追加のオプションをここで指定できますが、
      // この例ではシンプルにしましょう
      const router = new VueRouter({
        routes, // `routes: routes` の短縮表記
      })

      // 4. root となるインスタンスを作成してマウントします
      // アプリケーション全体がルーターを認知できるように、
      // ルーターをインジェクトすることを忘れないでください。
      const app = new Vue({
        router,
      }).$mount('#app')

      // これで開始です!
    </script>
  </body>
</html>
```

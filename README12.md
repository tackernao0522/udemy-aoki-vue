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

## 85 Vue Router インストール（npm）

- `$ npm install -g @vue/cli`を実行<br>

* `$ vue create vuerouter`を実行<br>

* `Manually select features`を選択して`enter`<br>

- `Space`キーを押すと点いたり消えたりする<br>

* `Router`にチェックを入れて`Enter`<br>

```:terminal
Vue CLI v4.5.15
? Please pick a preset: Manually select features
? Check the features needed for your project:
 ◉ Choose Vue version
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
❯◉ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

- `2.x`選択して`Enter`<br>

* `Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)`は`Y`を入力して`Enter`<br>

- `ESLint with error prevention only`を選択して`Enter`<br>

- `Lint on save`を選択して`Enter`<br>

* `In dedicated config files`を選択して`Enter`<br>

- `Save this as a preset for future projects? (y/N)`は`N`を入力して`Enter`<br>

* `$ cd vuerouter`で移動<br>

- `$ npm run serve` を実行<br>

## 85 ファイル ・ フォルダの構成

#### Vue Router テンプレート側

リンク<br>

```
<router-link to="/foo">Go to Foo</router-link>
<router-link to="/bar">Go to Bar</router-link>
```

描画<br>

```
<router-view></router-view>
```

#### Vue Router JS 側

```js:index.js
// コンポーネント
const Foo = { template: `<div>foo</div>` }
const Bar = { template: `<div>bar</div>` }

// ルート設定
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]

// ルーターのインスタンス化
const router = new VueRouter({
  routes,
})

// Vueインスタンス時にrouterも指定
const app = new Vue({
  router,
}).$mount('#app')
```

#### ファイル ・ フォルダ構成

src/ <br>
router/index.js ルーターの設定ファイル<br>
views/About.vue<br>
views/Home.vue<br>
App.vue router-view など記載<br>
main.js エントリポイントで router 読み込み<br>

## 87 router-link の props

- 参考: https://router.vuejs.org/ja/api/#router-link-props <br>

* `section07/vurerouter/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about" tag="button">About</router-link> -->
      <router-link to="/about" exact-active-class="test">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: red;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.test {
  color: lightblue;
}
</style>
```

## 88 $router と $route

\$router VueRouter インスタンス（全体）<br>
ページ遷移で使う \$router.push() など<br>

\$route ルートオブジェクト（現在のページ）<br>
現在のページ情報<br>
`例` URL に含まれるパラメータ情報<br>
\$route.params<br>
\$route.params.id<br>

- 参考: https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%95%E3%82%99%E3%82%B7%E3%82%99%E3%82%A7%E3%82%AF%E3%83%88 <br>

* 参考: https://router.vuejs.org/ja/api/#router-aftereach <br>

- 参考: https://developer.mozilla.org/ja/docs/Web/API/History <br>

* `vuerouter/src/views/About.vue`を編集<br>

```vue:About.vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="checkRouteInfo">ルート情報</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    checkRouteInfo() {
      console.log(this.$route)
      console.log(this.$route.path)
      console.log(this.$router)
    },
  },
}
</script>
```

```browser:console
{name: 'About', meta: {…}, path: '/about', hash: '', query: {…}, …}
fullPath: "/about"
hash: ""
matched: [{…}]
meta: {}
name: "About"
params: {}
path: "/about"
query: {}
[[Prototype]]: Object
About.vue?c330:14 /about
About.vue?c330:13
{name: 'About', meta: {…}, path: '/about', hash: '', query: {…}, …}
About.vue?c330:14 /about
About.vue?c330:15
VueRouter {app: Vue, apps: Array(1), options: {…}, beforeHooks: Array(0), resolveHooks: Array(0), …}
afterHooks: [ƒ]
app: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
apps: [Vue]
beforeHooks: []
fallback: false
history: HTML5History {router: VueRouter, base: '', current: {…}, pending: null, ready: true, …}
matcher: {match: ƒ, addRoute: ƒ, getRoutes: ƒ, addRoutes: ƒ}
mode: "history"
options:
base: "/"
mode: "history"
routes: Array(2)
0: {path: '/', name: 'Home', component: {…}}
1: {path: '/about', name: 'About', component: ƒ}
length: 2
[[Prototype]]: Array(0)
[[Prototype]]: Object
resolveHooks: []
currentRoute: (...)
[[Prototype]]: Object
```

- 参考: https://router.vuejs.org/ja/guide/essentials/navigation.html <br>

* `vuerouter/src/views/About.vue`を編集<br>

```vue:About.vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="checkRouteInfo">ルート情報</button>
    <br />
    <button @click="goToHome">Homeに戻る</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    checkRouteInfo() {
      console.log(this.$route)
      console.log(this.$route.path)
      console.log(this.$router)
    },
    goToHome() {
      this.$router.push('/') // Homeに戻るようになる
    },
  },
}
</script>
```

## 89 動的パラメータ+props その 1

`例`<br>

- `BookList.vue`<br>

```vue:BookList.vue
this.$router.push({ name: 'Book', params: { id: xxx, title: xxx, content: xxx, }
})
```

↓

- `BookDetails.vue`<br>

```vue:BookDetails.vue
props: { id: Number, title: String, content: String, }
```

- `router/index.js`<br>

```js:index.js
path: '/book/:id',
component: BookDetail,
props: route => ({
  id: route.params.id,
  title: route.params.title,
  content: route.params.content,
})
```

#### ハンズオン

- `vuerouter/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about" tag="button">About</router-link> -->
      <router-link to="/about" exact-active-class="test">About</router-link>
      |
      <router-link to="/book">BookList</router-link>
      // 追記
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: red;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.test {
  color: lightblue;
}
</style>
```

- `vuerouter/src/views/BookList.vue`ファイルを作成<br>

* `vuerouter/src/components/BookDetail.vue`ファイルを作成<br>

- `vuerouter/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '@/components/BookDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/book',
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: BookDetail,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `vuerouter/src/views/BookList.vue`を編集<br>

```vue:BookList.vue
<template>
  <div>
    <h1>本の一覧</h1>
    <ul>
      <li @click="showBookDetail(book.id)" v-for="book in books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data() {
    return {
      bookIndex: -1,
      books: [
        { id: 1, title: 'タイトル1', content: '本の内容1' },
        { id: 2, title: 'タイトル2', content: '本の内容2' },
        { id: 3, title: 'タイトル3', content: '本の内容3' },
      ],
    }
  },
  methods: {
    showBookDetail(id) {
      this.bookIndex = id - 1
      console.log(this.bookIndex)
    },
  },
}
</script>

<style></style>
```

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

## 129 Vue.js2 と同じコードの確認 OptionsAPI

- `section10/cdn.html`を編集<br>

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
      Counter: {{ counter }} {{ totalPriceMethods() }} {{ totalPriceMethods() }}
      {{ totalPrice }} {{ totalPrice }}
    </div>

    <script src="https://unpkg.com/vue@next"></script>
    <script>
      let app = Vue.createApp({
        data() {
          return {
            counter: 0,
            price: 1,
            number: 1,
            reactiveTest: {
              name: 'テスト',
            },
            books: [
              {
                id: 1,
                title: 'タイトル1',
                author: '著者名1',
                url: 'https://google.com',
              },
              {
                id: 2,
                title: 'タイトル2',
                author: '著者名2',
                url: 'https://google.com',
              },
              {
                id: 3,
                title: 'タイトル3',
                author: '著者名3',
                url: 'https://google.com',
              },
            ],
          }
        },
        methods: {
          totalPriceMethods() {
            console.log('methodsです')
            return this.number * this.price
          },
        },
        computed: {
          // totalPrice(){
          //   return this.number * this.price
          // }
          totalPrice: (app) => app.number * app.price,
        },
        watch: {
          books: {
            handler() {
              console.log('変更されました')
            },
            deep: true,
          },
        },
        created() {
          console.log('createdです')
        },
      }).mount('#counter')
    </script>
  </body>
</html>
```

## 130 Vue.js3 のインストール(NPM)

- `section10`ディレクトリに移動<br>

* `$ vue --version`を実行<br>

```
@vue/cli 4.5.15 // 3以降であればOK
```

- `$ vue create vue3-test`を実行<br>

* `Manually select features`を選択して`Enter`<br>

- 下記を設定して`Enter`<br>

```

Vue CLI v4.5.15
? Please pick a preset: Manually select features
? Check the features needed for your project:
 ◉ Choose Vue version
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
❯◉ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

- `3.x`を選択して`Enter`<br>

* `Y`を入力して`Enter`<br>

- `❯ ESLint with error prevention only`を選択して`Enter`<br>

- `❯◉ Lint on save`を選択して`Enter`<br>

* `❯ In dedicated config files`を選択して`Enter`<br>

- `N`を選択して`Enter`<br>

* `vue3-test`ディレクトリに移動<br>

## 131 エントリーポイントの確認

- 参考: https://v3.ja.vuejs.org/api/global-api.html <br>

* 参考: https://v3.ja.vuejs.org/api/application-api.html#component <br>

- 参考: https://v3.ja.vuejs.org/api/application-api.html#use <br>

## 132 Provide/Inject 長距離 Props

### Provide(提供)/Inject(注入)

- 参考: https://v3.ja.vuejs.org/guide/component-provide-inject.html#%E3%83%AA%E3%82%A2%E3%82%AF%E3%83%86%E3%82%A3%E3%83%95%E3%82%99%E3%81%A8%E9%80%A3%E6%90%BA%E3%81%99%E3%82%8B <br>

親->孫へデータを渡せる<br>
長距離 props<br>

```
親 App.vue
provide() {
  return {
    userName: '親で設定した値'
  }
}
子 Children.vue
孫 GrandChildren.vue
inject:['userName']
```

- `section10/vue3-test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/children">Children</router-link>
  </div>
  <router-view />
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

- `section10/vue3-test/src/router/index.js`を編集<br>

```js:index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Children from '@/views/Children'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // 追記
  {
    path: '/children',
    name: 'Children',
    component: Children,
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

- `section10/vue3-test/src/views/Children.vue`ファイルを作成<br>

```vue:GrandChildren.vue
<template>
  <div>Children (子)</div>
  <Grand-Children />
</template>

<script>
import GrandChildren from '@/components/GrandChildren'

export default {
  components: {
    GrandChildren,
  },
}
</script>

<style></style>
```

- `section10/vue3-test/src/components/GrandChildren.vue`を作成<br>

* `section10/vue3-test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/children">Children</router-link>
  </div>
  <router-view />
</template>

// 追記
<script>
export default {
  data() {
    return {}
  },
  provide() {
    return {
      userName: '親で設定した値',
    }
  },
}
</script>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

- `section10/vue3-test/src/components/GrandChild.vue`を編集<br>

```vue:GrandChild.vue
<template>
  <div>GrandChildren (孫)</div>
  // 追記
  <div>{{ userName }}</div>
</template>

<script>
export default {
  // 追記
  data() {},
  inject: ['userName'],
}
</script>

<style></style>
```

## 133 Teleport

親子関係を飛び越えて表示できる機能<br>

使い方・・モーダルウィンドウ<br>

- `section10/vue3-test/src/router/index.js`を編集<br>

```js:index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Children from '@/views/Children'
import TeleportTest from '@/views/TeleportTest'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/children',
    name: 'Children',
    component: Children,
  },
  {
    path: '/teleport-test',
    name: 'TeleportTest',
    component: TeleportTest,
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

- `section10/vue3-test/src/views/TeleportTest.vue`ファイルを作成<br>

```vue:TeleportTest.vue
<template>
  <div>
    Teleport
    <ModalButton />
  </div>
</template>

<script>
import ModalButton from '@/components/ModalButton'

export default {
  components: {
    ModalButton,
  },
}
</script>

<style></style>
```

- `section10/vue3-test/src/components/ModalButton.vue`ファイルを作成<br>

```vue:ModalButton.vue
<template>
  <div class="relative">
    <button @click="modalOpen = true">モーダル</button>
    <teleport to="body"> // public/index.htmlのbodyタグに紐づいている
      <div v-if="modalOpen" class="modal">
        <div>
          <p>モーダルウィンドウ</p>
          <button @click="modalOpen = false">閉じる</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    }
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>
```

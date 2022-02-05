# セクション 9: Vuex

## 116 Vuex とは

- 参考: https://vuex.vuejs.org/ja/ <br>

### Vuex OptionsAPI との対応表

| Options API   | Vuex      | Memo          |
| ------------- | --------- | ------------- |
| data          | state     |               |
| computed(get) | getters   |               |
| methods       | mutations | 同期 履歴残る |
| methods       | actions   | 非同期        |

### Vuex の注意

乱用は禁物（かえってわかりづらくなる）<br>

コンポーネント内・・OptionsAPI<br>
親子間のやりとり・・EventUpPropsDown<br>

ContainerComponent・・Vuex 使用<br>
PresentationalComponent・・UI<br>

## 117 Vuex のインストール

`$ npm i vuex --save`<br>
または VueCLI で<br>
`$ vue create xxx`<br>

https://vuex.vuejs.org.ja/ <br>

### ハンズオン

- `section09`ディレクトリを作成<br>

* `section09`ディレクトリに移動<br>

- `$ vue create vuex`を実行<br>

* `Manually select features`を選択して`Enter`<br>

- 下記のように選択して`Enter`<br>

```terminal:console
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

- `❯ 2.x`を選択して`Enter`<br>

* `Y`を入力して`Enter`<br>

- `ESLint with error prevention only`のまま`Enter`<br>

* `❯◉ Lint on save`のまま`Enter`<br>

* `❯ In dedicated config files`のまま`Enter`<br>

* `N`を入力して`Enter`<br>

- `section09/vuex`ディレクトリに移動<br>

* `$ npm run serve`を実行<br>

- `section09/vuex/src/soter/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {}, // getters: {}を追加することができる
  modules: {},
})
```

## 118 Vuex state と mutations

### Vuex 追記箇所

```js:src/main.js
import store from './store'
new Vue({ store })
```

`src/store/index.js`・・Vuex 記述ファイル<br>

### Vuex 使い方

テンプレート側<br>
`$store.state.xxx`<br>
スクリプト側<br>
`this.$store.state.xxx, this.$store.commit('')`<br>

map ヘルパー<br>
`mapState`,`mapActions` など<br>

### Vuex 使い方 ・ 引数

| Vuex      | 呼び出し                                    | 引数                                             |
| --------- | ------------------------------------------- | ------------------------------------------------ |
| state     | \$store.state.xxx                           |                                                  |
| getters   | $store.getters.xxx<br>$store.getters('xxx') | state, [getters]                                 |
| mutations | \$store.commit('xxx')                       | state, {値(payload)}                             |
| actions   | \$store.dispatch('xxx')                     | context, {値(payload)}<br>※commit state など含む |

### ハンズオン

- `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {},
})
```

- `section09/vuex/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
```

- `section09/vuex/src/views/Home.vue`を編集<br>

```vue:Home.vue
<template>
  <div class="home">
    // 1行削除
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
}
</script>
```

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>
```

- `section09/vuex/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    {{ $store.state.count }}
  </div>
</template>
```

ブラウザに初期値の 0 と表示される<br>

- `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
  },
  mutations: {
    // 追記
    increment(state) {
      state.count++
    },
  },
  actions: {},
  getters: {},
  modules: {},
})
```

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div>
    <button @click="addCount">+</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    addCount() {
      this.$store.commit('increment') // mutationsの中のincrementメソッドを呼び出す
    },
  },
}
</script>
```

## 119 mutations 補足 payload

- 参考: https://vuex.vuejs.org/ja/guide/mutations.html#%E8%BF%BD%E5%8A%A0%E3%81%AE%E5%BC%95%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%97%E3%81%A6%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%99%E3%82%8B <br>

* `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    // 追記
    addCount(state, payload) {
      // 第2引数はオブジェクト
      state.count += payload.value
    },
  },
  actions: {},
  getters: {},
  modules: {},
})
```

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div>
    <button @click="increment">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    increment() {
      this.$store.commit('increment') // mutationsの中のincrementメソッドを呼び出す
    },
    // 追記
    addCount() {
      this.$store.commit('addCount', {
        value: 10,
      }) // mutationsの中のaddCountメソッドを呼び出す
    },
  },
}
</script>
```

## 120 actions->mutations->state

同期・非同期で `actions/mutations` を使い分けると混乱の元<br>

同期処理でも、`actions->mutations->state`の流れで書くようにする<br>

- 参考: https://vuex.vuejs.org/ja/api/#actions <br>

* `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addCount(state, payload) {
      // 第2引数はオブジェクト
      state.count += payload.value
    },
  },
  // 追記
  actions: {
    // incrementAction(context) {
    //   context.commit('increment')
    // },
    incrementAction({ commit }) {
      // この書き方の方がシンプル
      commit('increment')
    },
    addCountAction({ commit }, payload) {
      commit('addCount', payload)
    },
  },
  getters: {},
  modules: {},
})
```

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div>
    <button @click="increment">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    // increment() {
    //   this.$store.commit("increment"); // mutationsの中のincrementメソッドを呼び出す
    // },
    // addCount() {
    //   this.$store.commit("addCount", {
    //     value: 10,
    //   }); // mutationsの中のaddCountメソッドを呼び出す
    // },
    increment() {
      this.$store.dispatch('incrementAction')
    },
    addCount() {
      this.$store.dispatch('addCountAction', {
        value: 10,
      })
    },
  },
}
</script>
```

## 121 getters

### getters（プロパティスタイル）

```
visibleUsers: state => state.users.filter(user => user.isVisible)
```

第 2 引数で他の`getters`も呼び出せる<br>

computed 同様　キャッシュが残る<br>
computed 内で呼び出す<br>

```
store.getters.visibleUsers
```

### getters（メソッドスタイル）

```
getUserById: state => id => {
  return state.users.find(user => user.id === id)
}

store.getters.getUserById(2)
```

メソッドスタイル（引数あり）の場合はキャッシュが残らない<br>

- 参考: https://vuex.vuejs.org/ja/guide/getters.html <br>

* `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
    users: [
      { id: 1, name: '大谷', isVisible: true },
      { id: 2, name: 'ダルビッシュ', isVisible: false },
      { id: 3, name: '錦織', isVisible: true },
    ],
  },
  getters: {
    // visibleUsers(state) {
    //   return state.users.filter((user) => {
    //     return user.isVisible // isVisibleがtrueの場合に表示
    //   })
    // }
    visibleUsers: (state) => state.users.filter((user) => user.isVisible), // アロー関数での書き方
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addCount(state, payload) {
      // 第2引数はオブジェクト
      state.count += payload.value
    },
  },
  actions: {
    // incrementAction(context) {
    //   context.commit('increment')
    // },
    incrementAction({ commit }) {
      // この書き方の方がシンプル
      commit('increment')
    },
    addCountAction({ commit }, payload) {
      commit('addCount', payload)
    },
  },
  modules: {},
})
```

- `section09/vuex/src/App.vue`を編集(プロパティスタイル)<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    {{ $store.state.count }}
    <br />
    <ul>
      <li v-for="user in visibleUsers" :key="user.id">
        {{ user.id }} : {{ user.name }} : {{ user.isVisible }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    visibleUsers() {
      return this.$store.getters.visibleUsers
    },
  },
}
</script>
```

- `section09/vuex/src/store/index.js`を編集(メソッドスタイル)<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初期値
    count: 0,
    users: [
      { id: 1, name: '大谷', isVisible: true },
      { id: 2, name: 'ダルビッシュ', isVisible: false },
      { id: 3, name: '錦織', isVisible: true },
    ],
  },
  getters: {
    // visibleUsers(state) {
    //   return state.users.filter((user) => {
    //     return user.isVisible // isVisibleがtrueの場合に表示
    //   })
    // }
    visibleUsers: (state) => state.users.filter((user) => user.isVisible), // アロー関数での書き方

    // メソッドスタイル
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id)
    },
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addCount(state, payload) {
      // 第2引数はオブジェクト
      state.count += payload.value
    },
  },
  actions: {
    // incrementAction(context) {
    //   context.commit('increment')
    // },
    incrementAction({ commit }) {
      // この書き方の方がシンプル
      commit('increment')
    },
    addCountAction({ commit }, payload) {
      commit('addCount', payload)
    },
  },
  modules: {},
})
```

```section09/vuex/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    {{ $store.state.count }}
    <br />
    <ul>
      <li v-for="user in visibleUsers" :key="user.id">
        {{ user.id }} : {{ user.name }} : {{ user.isVisible }}
      </li>
    </ul>
    <br />
    {{ getUserById.name }}
    {{ getUserById }}
  </div>
</template>

<script>
export default {
  computed: {
    visibleUsers() {
      return this.$store.getters.visibleUsers
    },
    getUserById() {
      return this.$store.getters.getUserById(2)
    },
  },
}
</script>
```

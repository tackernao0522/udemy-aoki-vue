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

## 122 スプレッド構文

### Map ヘルパー

アクションするだけのメソッドを<br>
アクションと同じ methods として展開する<br>
（繰り返し書かなくていいように）<br>

`import { mapActions } from 'vuex`<br>

スプレッド構文<br>
`...mapActions(['xxx', 'yyy'])`<br>

- `section09/spread`ディレクトリを作成<br>

* `section09/spread/index.html`ファイルを作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      const obj = {
        a: 1,
        b: 2,
        test() {
          console.log('テスト')
        },
      }

      console.log(obj)
    </script>
  </body>
</html>
```

- `ブラウザコンソール<br>

```browser:console
{a: 1, b: 2, test: ƒ}
```

- `section09/spread/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      const obj = {
        a: 1,
        b: 2,
        test() {
          console.log('テスト')
        },
      }

      console.log(obj)

      const spread = {
        ...obj,
        c: 3,
      }
      console.log(spread)
    </script>
  </body>
</html>
```

- `ブラウザコンソール<br>

```browser:console
{a: 1, b: 2, c: 3, test: ƒ}
```

## 123 map ヘルパー(mapActions)

### Map ヘルバー使うのは 2 つ

| Vuex      | Map ヘルパー   |
| --------- | -------------- |
| state     | △ mapState     |
| getters   | ○ mapGetters   |
| mutations | △ mapMutations |
| actions   | ○ mapActions   |

Getters で State の値を監視産出するなら、mapState は不要<br>

必ず Action を通るなら、mapMutations は不要<br>

### Map ヘルパーの書き方

```
import { mapActions } from 'vuex'

methods: {
  ...mapActions(['incrementAction']) // 配列で複数書ける

  incrementAction() { // このメソッドと同じになる
    this.$store.dispatch('incrementAction')
  }
}
```

引数ありなら `this.incrementAction()`で<br>

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div>
    <!-- <button @click="increment">+</button> -->
    <button @click="incrementAction">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex' // 追記
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    // increment() {
    //   this.$store.commit("increment"); // mutationsの中のincrementメソッドを呼び出す
    // },
    // addCountAction() {
    //   this.$store.dispatch('addCountAction')
    // },
    ...mapActions(['incrementAction', 'addCountAction']), // 追記
    // increment() {
    //   this.$store.dispatch("incrementAction");
    // },
    // addCount() {
    //   this.$store.dispatch("addCountAction", {
    //     value: 10,
    //   });
    // },
    // 編集
    addCount() {
      this.addCountAction({
        value: 10,
      })
    },
  },
}
</script>
```

## 124 モジュール分割と名前空間(namespace)

### モジュールの読み込み方法

- `例`<br>

`store/index.js`<br>

```js:index.js
import auth from './auth'

modules: {
  auth
}
```

`store/auth/index.js`<br>

```js:index.js
const state = {} // mutations, actions, gettersもconstで
export default {
  namespaced: true,
  state, // mutations, actions, gettersも
}
```

### モジュールの指定方法

`...mapActions('モジュール名', ['アクション名'])`<br>

他<br>
`rooteState`・・ルートの state<br>

モジュール間のやりとりは基本 NG<br>
できるだけ名前空間内で完結させる<br>

### ハンズオン

- `section09/vuex/src/store/auth`ディレクトリを作成<br>

* `section09/vuex/src/store/auth/index.js`ファイルを作成<br>

```js:index.js
const state = {}

const mutations = {}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
```

- `section09/vuex/src/store/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth' // 追記

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
  // 追記
  modules: {
    auth,
  },
})
```

- `section09/vuex/src/store/auth/index.js`を編集<br>

```js:index.js
const state = {
  loginUserName: '',
}

const mutations = {
  setLoginUser(state, user) {
    state.loginUserName = user.name
  },
}

const actions = {
  setLoginUser({ commit }, user) {
    commit('setLoginUser', user)
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
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
    // 追記
    <button @click="setLogin">ログイン名を表示</button>
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
// 追記
import { mapActions } from 'vuex'

export default {
  // 追記
  methods: {
    ...mapActions('auth', ['setLoginUser']),
    setLogin() {
      this.setLoginUser({ name: '大谷' })
    },
  },
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

## 125 Vuex の使い所（モジュール結合度・Container/Presentational）

### モジュール結合度

数字が低い方が望ましい 数字が高いほど蜜結合<br>

|     | モジュール結合度 | 説明                           | Vue の機能       |
| --- | ---------------- | ------------------------------ | ---------------- |
| 1   | データ結合       | 引数で単純なデータを渡す       | props            |
| 2   | スタンプ結合     | 引数でオブジェクトを渡す       | props            |
| 3   | 制御結合         | 引数でメソッド内の処理が変わる |                  |
| 4   | 外部結合         | 単一のグローバルデータを参照   |                  |
| 5   | 共通結合         | 複数のグローバルデータを参照   | state            |
| 6   | 内容結合         | 他のオブジェクトの内部を参照   | getters, actions |

- 参考: https://user-first.ikyu.co.jp/entry/design-of-vue-and-vuex <br>

### Vuex やりとりと表示を別で

ContainerComponent・・Vuex 使用<br>
PresentationalComponent・・UI<br>
ファイル名に Container とつけたら Vuex 使用<br>

https://speakerdeck.com/simezi9/baseniokeru-vuekonponentoshe-ji-falsexian-zai <br>

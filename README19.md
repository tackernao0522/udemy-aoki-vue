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

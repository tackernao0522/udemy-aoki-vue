## 71 サンプル 5: DogApi

- 参考: https://dog.ceo/dog-api/breeds-list <br>

* 参考: https://dog.ceo/dog-api/documentation/breed <br>

- `section05/dog-api/index.html`ファイルを作成<br>

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.5.55/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/vuetify@2.3.10/dist/vuetify.min.css"
      rel="stylesheet"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
    />
    <title>Dog API</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <v-app v-cloak>
        <!-- vuetifyを使用する際は必ず必要 -->
        <v-app-bar app>
          ヘッダー
        </v-app-bar>
        <v-main>
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(dogType, index) in dogTypes"
                :key="index"
                cols="6"
                md="4"
              >
                <v-btn @click.prevent="fetchDogImage(index)" color="cyan" dark>
                  {{ dogType }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-show="isShow">
              <v-col
                v-for="dogImage in dogImages"
                :key="dogImage"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card>
                  <v-img :src="dogImage"></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer>
          フッター
        </v-footer>
      </v-app>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.3.10/dist/vuetify.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
        data() {
          return {
            dogTypes: ['akita', 'beagle', 'pekinese', 'pug'],
            dogUrl: '',
            dogImages: '',
            isShow: false,
          }
        },
        methods: {
          async fetchDogImage(index) {
            const that = this
            this.dogUrl = `https://dog.ceo/api/breed/${this.dogTypes[index]}/images`
            const response = await fetch(this.dogUrl, { method: 'get' }).then(
              (response) => {
                if (response.ok) {
                  that.isShow = true
                  return response.json()
                }
                throw new Error('error').catch((e) => console.log(e.message))
              },
            )
            this.render(response)
          },
          render(response) {
            if (response.message.length > 20) {
              this.dogImages = _(response.message)
                .shuffle()
                .slice(0, 20)
                .value()
            } else {
              this.dogImages = _.shuffle(response.message)
            }
          },
        },
      })
    </script>
  </body>
</html>
```

## 72 Vuetify の補足（カスタムディレクティブなど）

- 参考: https://vuetifyjs.com/ja/features/breakpoints/#section-30d630ec30fc30af30dd30a430f330c830b530fc30d330b9 <br>

* 参考: https://jp.vuejs.org/v2/guide/custom-directive.html <br>

#### Intersection observer

- https://vuetifyjs.com/ja/directives/intersect/ <br>

#### Lazy

- https://vuetifyjs.com/ja/components/lazy/ <br>

* `section05/appendix/index.html`ファイルを作成<br>

```html:index.html
<!DOCTYPE html>
<html>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.5.55/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/vuetify@2.3.10/dist/vuetify.min.css"
      rel="stylesheet"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
    />
  </head>

  <body>
    <div id="app">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <div v-show="$vuetify.breakpoint.mdAndUp">あああ</div>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          :href="source"
                          icon
                          large
                          target="_blank"
                          v-on="on"
                        >
                          <v-icon>mdi-code-tags</v-icon>
                        </v-btn>
                      </template>
                      <span>Source</span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        label="Login"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                      ></v-text-field>

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.3.10/dist/vuetify.js"></script>
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
        data() {
          return {}
        },
      })
    </script>
  </body>
</html>
```

# セクション 6: SFC(SingleFileComponent)

## 74 VuCLI のインストール方法

- 参考: https://cli.vuejs.org/guide/installation.html <br>

- `section06`ディレクトリを作成して`section06`ディレクトリに移動<br>

* インストール `$ npm install -g @vue/cli` <br>

- バージョン情報 `$ vue --version`<br>

#### Vue Cli 新規作成

`$ vue create xxx` CUI コマンド<br>
`vue ui` GUI グラフィック<br>

`VueVersion`/`Babel`/`TypeScript`/`PWA`/`Router`/`Vuex`/`CSS`/`Linter`/`Test`<br>

- `$ vue create test`を実行<br>

* `Manually select features`を選択して`enter`<br>

- `Space`キーを押すと点いたり消えたりする<br>

* 今回はこの状態で`Enter`<br>

```:terminal
Vue CLI v4.5.15
? Please pick a preset: Manually select features
? Check the features needed for your project:
❯◉ Choose Vue version
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

- `2.x`選択して`Enter`<br>

* `ESLint with error prevention only`を選択して`Enter`<br>

- `Lint on save`を選択して`Enter`<br>

* `In dedicated config files`を選択して`Enter`<br>

- `Save this as a preset for future projects? (y/N)`は`N`を入力して`Enter`<br>

* `Use NPM`を選択して`Enter`<br>

- `test`ディレクトリに移動<br>

* `$ npm run serve`を実行<br>

- http://localhost:8080/ をブラウザで開く<br>

## 75 Vuter のインストール ・ 設定

- `Vs Code`の拡張機能`Vetur`が入っていなければ入れておく<br>

- `Vs Code`の拡張機能`ESLint`が入っていなければ入れておく<br>

- `Vs Code`の拡張機能`Prettier`が入っていなければ入れておく<br>

## 76 ファイル ・ フォルダの構成

#### ファイル構成

`node_modules` -> 各種ライブラリ<br>

`dist` -> コンパイル後のフォルダ<br>

`public` -> テンプレート<br>

`src` -> 開発フォルダ<br>

`package.json` -> npm の設定ファイル<br>

`vue.config.js` -> vue の設定ファイル(要作成)<br>

- `$ npm run build`を実行すると production コンパイルされる<br>

#### 他環境でも実施するなら

`node_modules / dist`は不要<br>
gitHub などにもこれらは含まない<br>

`Node.js / vue-cli`インストール済みで`package.json`があれば<br>
`npm install`で`node_module`生成<br>
`vue run build`で`dist`生成<br>

## 77 import/export

#### import

```
import TestCom from './TestCom.vue' 同じ階層
import TestCom from '../Folder/TestCom.vue' 一つ上のフォルダ

import TestCom from '@/Folder/TestCom.vue' 絶対パス(@はsrcの意味)

SFCはファイル名パスカルケース、単語2文字以上import名もファイル名と同じにしておく
```

## 78 render と\$mount

- 参考: https://jp.vuejs.org/v2/api/#vm-mount <br>

* 参考: https://jp.vuejs.org/v2/guide/render-function.html <br>

## 79 SFC(SingleFileComponent)

#### Vue ファイル（SFC)

```vue:app.vue
<template></template>
<script>
import xxx from 'xxx.vue'

export default {
  name: 'yyy',
  components: {
    xxx,
  },
}
</script>
<style></style>
```

- `src/modules`ディレクトリを作成<br>

* `src/modules/TestComponents.vue`コンポーネントを作成<br>

- `<vue まで打つと保管リストが出る` <vue> with default.vue を選択する<br>

* 参考: https://jp.vuejs.org/v2/api/#name <br>

- `src/modules/TestComponent.vue`を編集<br>

```vue:TestComponent.vue
<template>
  <div>
    テストです
    {{ testData }}
  </div>
</template>

<script>
export default {
  name: 'TestComponents',
  data() {
    return {
      testData: 'テストdataです',
    }
  },
}
</script>

<style></style>
```

- `section06/test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <TestComponent />
    // 追記
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestComponent from './modules/TestComponent.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TestComponent, // 追記
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
  margin-top: 60px;
}
</style>
```

## 80 Scoped CSS

`<style></style>` グローバル 非推奨<br>
これで書くなら BEM など他コンポーネントと重ならないように整理要<br>

`<style scoped></style>` ローカル<br>

`<style lang="scss"></style>` 追加設定必要<br>

- `section06/test/src/modules/TestComponent.vue`を編集<br>

```vue:TestComponent.vue
<template>
  <div class="red-b">
    テストです
    {{ testData }}
  </div>
</template>

<script>
export default {
  name: 'TestComponents',
  data() {
    return {
      testData: 'テストdataです',
    }
  },
}
</script>

<style scoped>
// 追記
.red-b {
  border: 1px red solid;
}
</style>
```

## 81 publicPath(vue.config.js)

- 参考: https://cli.vuejs.org/config/#global-cli-config <br>

* `$ npm run build`を実行<br>

- `section06/test/vue.config.js`ファイルを作成<br>

```js:vue.config.js
module.exports = {
  publicPath: '',
}
```

`$ npm run build`を実行<br>

- これで`dist`ディレクトリの中の`index.html`が表示されるようになる<br>

## 82 補足 1 SCSS(グローバル設定含む)

#### VueCli で SCSS

vue create 時に追加するか<br>
npm で後から追加<br>
npm i --save-dev sass-loader node-sass <br>

各コンポーネントで書く場合<br>

```
<style lang="scss">
</style>
```

- `$ npm install --save-dev sass-loader@10.0.2 node-sass@4.14.1`を実行<br>

* 注: node のバージョンを 14 に下げないと node-sass@4.14.1 が入らないかもしれない<br>
  (参考: https://qiita.com/k3ntar0/items/322e668468716641aa5c) <br>

- `section06/test/src/modules/TestComponent.vue`を編集<br>

```vue:TestComponent.vue
<template>
  <div class="red-b">
    <div class="border__blue">SCSSのテストです</div>
    テストです
    {{ testData }}
  </div>
</template>

<script>
export default {
  name: 'TestComponents',
  data() {
    return {
      testData: 'テストdataです',
    }
  },
}
</script>

<style scoped lang="scss">
.red-b {
  border: 1px red solid;
}

.border {
  &__blue {
    border: 1px blue solid;
  }
}
</style>
```

#### VueCli で Scss グローバル

`src/assets/sass/main.scss`を作成したとして<br>

- `vue.config.js`に下記を追記<br>

```js:vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/main.scss";`,
      },
    },
  },
}
```

#### ハンズオン

- 参考: https://cli.vuejs.org/guide/css.html#referencing-assets <br>

* `src/assets/sass`ディレクトリを作成<br>

- `src/assets/sass/main.scss`ファイルを作成<br>

```scss:main.scss
@import './variables';
```

- `src/assets/sass/_variables.scss`ファイルを作成<br>

```scss:_variables.scss
$color-primary: #aabbcc;
```

- `section06/test/vue.config.js`を編集<br>

```js:vue.config.js
module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/sass/main.scss";`,
      },
    },
  },
}
```

- 簡易サーバーを再起動する<br>

## 83 補足 2 マルチページモード

エントリーポイントをページ毎に作成<br>

`vue.config.js`に

```js:vue.config.js
Pages{ index: {
  entry:xxx, template:xxx, filename: xxx, title:xxx, chunks:xxx
}}
// などとページ毎に記載
```

`$ npm install --save-dev html-webpack-plugin preload-webpack-plugin`<br>

`$ vue inspect`でエラーが出ないか確認<br>

#### ハンズオン

- `section06`ディレクトリに移動<br>

* `$ npm install -g @vue/cli`を実行<br>

* `$ vue create multipage`を実行<br>

- `multipage`ディレクトリに移動<br>

* `$ npm run serve`を実行<br>

- 参考: https://cli.vuejs.org/config/#pages <br>

* `section06/multipage/vue.config.js`ファイルを作成<br>

```js:vue.config.js
module.exports = {
  publicPath: '',
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    users: {
      entry: 'src/users/main.js',
      template: 'public/users.html',
      filename: 'users.html',
      title: 'Users Page',
      chunks: ['chunk-vendors', 'chunk-common', 'users'],
    },
  },
}
```

- `section06/multipage/src/index`ディレクトリを作成<br>

- `section06/multipage/src/index/main.js`ファイルを作成<br>

```js:main.js
import Vue from 'vue'
import Index from './Index.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Index),
}).$mount('#app')
```

- `section06/multipage/src/users`ディレクトリを作成<br>

- `section06/multipage/src/users/main.js`ファイルを作成<br>

```js:main.js
import Vue from 'vue'
import Users from './Users.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(Users),
}).$mount('#app')
```

- `section06/multipage/src/users/Users.vue`ファイルを作成<br>

```vue:Users.vue
<template>
  <div id="app">
    Users
    <br />
    <a href="index.html">index</a>
    <br />
    <a href="users.html">users</a>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `section06/multipage/src/index/Index.vue`ファイルを作成<br>

```vue:Index.vue
<template>
  <div id="app">
    Index
    <br />
    <a href="index.html">index</a>
    <br />
    <a href="users.html">users</a>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `section06/multipage/public/users.html`ファイルを作成<br>

```html:users.html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>
        We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to continue.
      </strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

- `$ npm install --save-dev html-webpack-plugin preload-webpack-plugin`を実行<br>

* `$ vue inspect`を実行してエラーが出ていなければ OK<br>

* `$ vue inspect > inspect.txt`を実行すると text で出力できる<br>

- `$ npm run serv`を実行<br>

* `$ npm run build`でも試してみる<br>

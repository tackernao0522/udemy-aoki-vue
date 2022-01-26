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

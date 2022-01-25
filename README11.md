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

# セクション 5: Vuetify (CDN)

## 65 クイックスタート<br>

- 参考: https://vuetifyjs.com/ja/getting-started/installation/ <br>

#### v-app は必須

```html:indexhtml
<div id="app">
  <v-app>
    <v-main>
      <v-container fluid>Hello</v-container>
    </v-main>
  </v-app>
</div>
// fluidでレスポンシブ対応
```

#### Vuetify UI/Application

v-system-bar // ヘッダーの上<br>

v-app-bar // ヘッダー<br>

v-navigation-bar // サイドバー<br>

v-footer // フッター<br>

v-bottom-navidation // フッターの下<br>

app をつけると fixed<br>

- 参考: https://vuetifyjs.com/ja/components/application/ <br>

* `section05/vuetify-quick-start/index.html`を作成<br>

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
      <v-app>
        <!-- vuetifyを使用する際は必ず必要 -->
        <v-app-bar app>
          ヘッダー
        </v-app-bar>
        <v-main>
          <v-container fluid>Hello world</v-container>
        </v-main>

        <v-footer>
          フッター
        </v-footer>
      </v-app>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.3.10/dist/vuetify.js"></script>
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
      })
    </script>
  </body>
</html>
```

## 66 レイアウト周り Grid/Flex

#### Vuetify UI/Grid

12 分割 Bootstrap に近い<br>
v-container 内<br>
v-row の中に v-col<br>

`例`<br>

```
<v-col cols="12" md="4">
md以上は4つ分。それ以下は12(横幅いっぱい)
http://websae.net/teitter-bootstrap-grid-system-21060224/
```

- 参考: https://vuetifyjs.com/ja/components/grids/#section-4f7f304465b9 <br>

- 参考: https://websae.net/twitter-bootstrap-grid-system-21060224/ <br>

* 参考: https://vuetifyjs.com/ja/styles/flex/#flexbox306e670952b95316 <br>

- 参考: https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet <br>

* `section05/ui-grid/index.html`ファイルを作成<br>

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
    <style>
      .red-b {
        border: red 1px solid;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <v-app>
        <!-- vuetifyを使用する際は必ず必要 -->
        <v-app-bar app>
          ヘッダー
        </v-app-bar>
        <v-main>
          <v-container fluid>
            <v-row>
              <v-col class="red-b" cols="12" sm="6" md="4">あ</v-col>
              <v-col cols="12" md="4">い</v-col>
              <v-col cols="12" md="4">う</v-col>
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
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
      })
    </script>
  </body>
</html>
```

## 67 スタイル Spacing など

#### Vuetify スタイル/Spacing

参考: https://vuetifyjs.com/ja/styles/spacing/ <br>

参考: https://vuetifyjs.com/ja/styles/display/#display <br>

参考: https://vuetifyjs.com/ja/styles/colors/ <br>

参考: https://vuetifyjs.com/ja/styles/text-and-typography/ <br>

m ・・ 4px 5 なら 5x4= 20px<br>
`t`op / `b`ottom / `l`eft / `r`ight<br>
`x` 横(lr) / `y` 縦(tb) / `a`ll 上下左右<br>

size 1 ・・4px 5 なら 5x4= 20px<br>

`例`<br>

```
<div class="my-5">
</div>
// margin上下 20px
```

- `section05/style-spacing/index.html`ファイルを作成<br>

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
    <style>
      .red-b {
        border: red 1px solid;
      }

      .blue-b {
        border: blue 1px solid;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <v-app>
        <!-- vuetifyを使用する際は必ず必要 -->
        <v-app-bar app>
          ヘッダー
        </v-app-bar>
        <v-main>
          <v-container fluid>
            <v-row class="blue-b">
              <v-col class="my-5 red-b" cols="12" sm="6" md="4">あ</v-col>
              <v-col cols="12" md="4">い</v-col>
              <v-col cols="12" md="4">う</v-col>
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
    <script>
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
      })
    </script>
  </body>
</html>
```


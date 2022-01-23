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

# セクション 4: コンポーネント

## 48 コンポーネントについて

#### コンポーネント お約束

```html:index.html
<my-component title=""></my-component>
<!--
  HTMLのタグのように作成
  HTMLタグと重ならないように作成
  HTMLタグと重ならないよう、
  名前は2語以上、ケバブケース(*vueファイル使用時はパスカルケースも可)

  HTMLの属性のように値を設定できる(props)
-->
```

#### コンポーネント 簡易表

- 資料参照<br>

## 49 グローバルコンポーネント

#### コンポーネント グローバル

```
インスタンス化の前に書く
template内はバッククォート(`)
単一ルートが必須(divタグなど)

Vue.components('my-component', {
  template: `<div>あああ</div>,
})

let app = new Vue({})
```

- `section04/global/global.html`ファイルを作成<br>

```html:global.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Global Components</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <my-component></my-component>
      <my-component></my-component>
      <my-component></my-component>
    </div>

    <script>
      Vue.component('my-component', {
        template: `<div>
      あああ<br>
      いいい
      <div v-show="isShow">表示</div>
      </div>`,
        data() {
          return {
            isShow: false,
          }
        },
      })

      let app = new Vue({
        el: '#app',
        data() {
          return {}
        },
      })
    </script>
  </body>
</html>
```

## 50 ローカルコンポーネント

#### コンポーネント ローカル (基本的にはローカルで記述する)

```
変数で作成
インスタンス内にcomponentsで追加する

let myComponent = {}

let app = new Vue({
  components: {
    'my-component': myComponent
  }
})
```

- `section04/local/local.html`を作成<br>

```html:local.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ローカルコンポーネント</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <my-component></my-component>
      <my-component></my-component>
      <my-component></my-component>
    </div>

    <script>
      let myComponent = {
        template: `<div>
        あああ
        <div v-show="isShow">表示</div>
        </div>`,
        data() {
          return {
            isShow: false,
          }
        },
      }

      let app = new Vue({
        el: '#app',
        components: {
          // 'my-component': myComponent or
          myComponent, // my-componentに置き換わる
        },
        data() {
          return {}
        },
      })
    </script>
  </body>
</html>
```

## 51 props サンプル UI フレームワーク

#### props プロパティ

```
HTMLタグの属性のように自由に設定できる
<a href="https://google.com" target="">
<a href="https://yahoo.jp">

(例) Vuetify のv-btnの場合
<v-btn text small color="primary>
<v-btn depressed large color="error">
```

- 参考: https://vuetifyjs.com/ja/ <br>

- 参考: https://vuetifyjs.com/ja/getting-started/installation/ <br>

* 参考: https://vuetifyjs.com/ja/components/buttons/#api <br>


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

## 52 props 直接書いてみる

- `section04/props/props.html`ファイルを作成<br>

```html:props.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>props</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      .parent {
        width: 800px;
        margin: 0 auto;
        border: 1px red solid;
      }

      .child {
        width: 30%;
        margin: 0 auto;
        border: 1px blue solid;
      }
    </style>
  </head>

  <body>
    <div id="app" class="parent">
      <my-component title="テスト" class="child"></my-component>
      <my-component class="child"></my-component>
      <my-component disabled class="child"></my-component>
    </div>

    <script>
      let myComponent = {
        template: `<div>
        あああ
        {{ getTitle }}
        <div v-show="isShow">表示</div>
        </div>`,
        props: {
          title: {
            type: String,
          },
          disabled: {
            type: Boolean,
            default: false,
          },
        },
        data() {
          return {
            isShow: false,
            getTitle: this.title,
          }
        },
      }

      let app = new Vue({
        el: '#app',
        components: {
          // 'my-component': myComponent
          myComponent,
        },
        data() {
          return {}
        },
      })
    </script>
  </body>
</html>
```

## 53 props と v-bind

- `section04/props-v-bind/props-v-bind.html`を作成<br>

```html:props-v-bind.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>propsとv-bind</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      .parent {
        width: 800px;
        margin: 0 auto;
        border: 1px red solid;
      }

      .child {
        width: 30%;
        margin: 0 auto;
        border: 1px blue solid;
      }
    </style>
  </head>

  <body>
    <div id="app" class="parent">
      <my-component title="テスト" class="child"></my-component>
      <my-component :title="parentTitle" class="child"></my-component>
      <my-component disabled class="child"></my-component>
    </div>

    <script>
      let myComponent = {
        template: `<div>
        あああ
        {{ getTitle }}
        <div v-show="isShow">表示</div>
        </div>`,
        props: {
          title: {
            type: String,
          },
          disabled: {
            type: Boolean,
            default: false,
          },
        },
        data() {
          return {
            isShow: false,
            getTitle: this.title,
          }
        },
      }

      let app = new Vue({
        el: '#app',
        components: {
          // 'my-component': myComponent
          myComponent,
        },
        data() {
          return {
            parentTitle: '親側のタイトル',
          }
        },
      })
    </script>
  </body>
</html>
```

## 54 props で配列を渡す

#### props (プロパティ)と v-for

- 親側で配列を作成<br>

```
data() { return {members: [{}, {}, {}]}}

<array-test
  v-for="member in members"
  :key="member.id" // keyは必須
  :item="member"> // propsのv-bind
</array-test>
```

子側 `props: { item: {object} } // 配列内がオブジェクトなら <br>

template 内は `{{ item.name }}` // props 名.

- `section04/array-props/array_props.html`を作成<br>

```html:array_props.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>propsで配列を渡す</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      .parent {
        width: 800px;
        margin: 0 auto;
        border: 1px red solid;
      }

      .child {
        width: 30%;
        margin: 0 auto;
        border: 1px blue solid;
      }
    </style>
  </head>

  <body>
    <div id="app" class="parent">
      <array-test
        v-for="member in members"
        :key="member.name"
        :item="member"
        class="child"
      ></array-test>
    </div>

    <script>
      let arrayTest = {
        props: {
          item: {
            type: Object,
          },
        },
        template: `<div>
        <p>{{ item.name }}</p>  <!-- propsのオブジェクト名 -->
        </div>`,
      }

      let app = new Vue({
        el: '#app',
        components: {
          arrayTest, // array-testに置き換わる
          // 'array-test': arrayTest
        },
        data() {
          return {
            members: [{ name: '久保' }, { name: '南野' }, { name: '堂安' }],
          }
        },
      })
    </script>
  </body>
</html>
```

## 55 props の補足

#### props(プロパティ)の補足

- 参考: https://jp.vuejs.org/v2/guide/components-props.html <br>

props 名もケバブケース<br>

タイプが`Object`か`Array`で defaul 設定するなら関数で(注意: 参照渡しになる)<br>

```
props: {item: {
  type: Object,
  default: () => ({ count: 0 })
}}
```

## 56 \$emit カスタムイベント (子から親へ data を通知する)

#### \$emit(発射 ・ 放出) カスタムイベント

```
// 親

@custom-event="親のメソッド名"

mthods: {
  親のメソッド名(e) {
    console.log(e)
  }
}
```

```
// 子

@click="子のメソッド名"

methods: {
  子のメソッド名() {
    this.$emit('custom-event', 値)
  }
}
```

- `section04/emit/emit.html`ファイルを作成<br>

```html:emit.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$emit カスタムイベント</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      .parent {
        width: 800px;
        margin: 0 auto;
        border: 1px red solid;
      }

      .child {
        width: 30%;
        margin: 0 auto;
        border: 1px blue solid;
      }
    </style>
  </head>

  <body>
    <div id="app" class="parent">
      <emit-test @custom-event="parentMethod" class="child"></emit-test>
    </div>
  </body>

  <script>
    let emitTest = {
      template: `<div>
      <button @click="childMethod">子側のボタン</button>
      </div>`,
      methods: {
        childMethod() {
          this.$emit('custom-event', '子の値')
        },
      },
    }

    let app = new Vue({
      el: '#app',
      components: {
        emitTest,
      },
      data() {
        return {}
      },
      methods: {
        parentMethod(e) {
          console.log(e)
        },
      },
    })
  </script>
</html>
```

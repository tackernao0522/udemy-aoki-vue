## 57 コンポーネント間のフォーム

- 参考: https://jp.vuejs.org/v2/guide/forms.html (コンポーネントの v-model)<br>

* 参考: https://jp.vuejs.org/v2/guide/components.html#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7-v-model-%E3%82%92%E4%BD%BF%E3%81%86 <br>

|     | v-model<br>(子で v-model なら computed(get/set))                                                                                                                      | v-bind(:)と v-on(a)                                                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 親  | <custom-input<br> v-model="parentValue"<br>></custom-input><br><br>data({ return { parentValue: '' }})                                                                | <custom-input :value="parentValue" @input="parentValue = \$event"></custom-input><br><br>data({ return { parentValue: '' }})                                           |
| 子  | <input :value="value" @input="childEvent"><br><br>props: { value: { type: String }}<br><br>methods: {<br>childEvent(e){<br>this.\$emit('input', e.target.value)<br>}} | <input :value="value" @input="childEvent" /><br><br>props: { value: {type: String }}<br><br>methods: {<br>childEvent(e){<br>this.\$emit('input', e.target.value)<br>}} |

- `section04/form-components/form-components.html`ファイルを作成<br>

```html:form-components.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>コンポーネント間のフォーム</title>
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
      <!-- <custom-input :value="parentValue" @input="parentValue= $event" class="child"></custom-input> or -->

      <custom-input v-model="parentValue" class="child"></custom-input>
      {{ parentValue }}
    </div>

    <script>
      let customInput = {
        props: {
          value: {
            type: String,
          },
        },
        template: `<div>
        <input :value="value" @input="childEvent" />
        </div>`,
        methods: {
          childEvent(e) {
            this.$emit('input', e.target.value)
          },
        },
      }

      let app = new Vue({
        el: '#app',
        components: {
          customInput,
        },
        data() {
          return {
            parentValue: '',
          }
        },
      })
    </script>
  </body>
</html>
```

## 58 子側で v-model を使うパターン

- `section04/child-v-model/childVmodel.html`ファイルを作成<br>

```html:childVmodel.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>子側でv-modelを使うパターン</title>
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
      <custom-input
        @child-event="parentValue = $event"
        class="child"
      ></custom-input>
      {{ parentValue }}
    </div>

    <script>
      let customInput = {
        template: `<div>
        <input type="text" v-model="childParam" />
        </div>`,
        data() {
          return {
            childValue: '',
          }
        },
        computed: {
          childParam: {
            get() {
              return this.childValue
            },
            set(value) {
              this.childValue = value // this.childValueはdataにセットした値
              this.$emit('child-event', value)
            },
          },
        },
      }

      let app = new Vue({
        el: '#app',
        components: {
          customInput,
        },
        data() {
          return {
            parentValue: '',
          }
        },
      })
    </script>
  </body>
</html>
```

## 59 イベントバス

- 参考： https://jp.vuejs.org/v2/api/#vm-on <br>

#### EventBus

```
let eventBus = new Vue()

イベント監視設定
mounted() {
  eventBus.$on('event-name', callback)
}
イベント発行
methods: {
  eventBus.$emit('event-name', value)
}
```

- `section04/event-bus/eventBus.html`ファイルを作成<br>

```html:eventBus.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>59 イベントバス</title>
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

      .grand_child {
        width: 20%;
        margin: 0 auto;
        border: 1px green solid;
      }
    </style>
  </head>

  <body>
    <div id="app" class="parent">
      <child-component class="child"></child-component>
    </div>

    <script>
      let eventBus = new Vue()

      let grandChildComponent = {
        template: `<div>
          孫のコンポーネントです
          <button @click="testEvent">ボタン</button>
        </div>`,
        methods: {
          testEvent() {
            eventBus.$emit('eventBus-test', '孫のボタンです')
          },
        },
      }
      let childComponent = {
        template: `<div>
          子のコンポーネントです
          <grand-child-component class="grand_child">
          </grand-child-component>
        </div>`,
        components: {
          grandChildComponent,
        },
      }

      let app = new Vue({
        el: '#app',
        data() {
          return {}
        },
        components: {
          childComponent,
        },
        mounted() {
          eventBus.$on('eventBus-test', (test) => {
            console.log(test)
          })
        },
      })
    </script>
  </body>
</html>
```

## 60 Atomic Design

- Atom (原子) ・・ボタン・文字など<br>

* Molecules (分子)<br>

- Organisms (有機体)<br>

* Templates (ワイヤーフレーム)<br>

- Pages (ページ)<br>

## 61 slot

#### スロット(差し込む)

```
<a href="xxx">google</a>
<a href="xxx">yahoo</a>

親
<child-com>親側で書いた文字が入ります</child-com>

子
template: `<div>
久保 <slot>南野</slot> 堂安
</div>`
```

- `section04/slot/slot.html`ファイルを作成<br>

```html:slot.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>slot</title>
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
      <child-component class="child">親の文字です</child-component>

      <child-component class="child">
        <child-component class="child"></child-component>
      </child-component>
    </div>

    <script>
      let childComponent = {
        template: `<div>
        久保 <slot>南野</slot> 堂安
        </div>`,
      }
      let app = new Vue({
        el: '#app',
        data() {
          return {}
        },
        components: {
          childComponent,
        },
      })
    </script>
  </body>
</html>
```

## 62 名前付き slot

#### Slot の簡易表

|      | slot                                              | 名前付き slot<br>v-slot(#)                                                                                                                                                     | スコープ付きスロット<br>v-slot(#)                                                                                                                                               |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 特徴 | 子の slot1 つ                                     | 子の slot 複数<br>(複数 slot 時は template タグ)                                                                                                                               | 子の data をおやで表示できる<br>(スロットプロパティ)                                                                                                                            |
| 親   | <my-com><br>タグ内の文章が置き換わる<br></my-com> | <my-com><br><template<br>v-slot:header><br>ヘッダ<br></template><br>main に入ります。<br><template #footer>フッター<br></template><br>ここの文章も main に入ります。<br></my-com> | <my-com><br><template id="test"><br>{{ test.member.name }}<br></template><br><template v-slot="{ member }"><br>{{ member.name }}<br>{{ member.height }}</template><br></my-com> |
| 子   | テスト<slot>差し込み口</slot><br>テスト           | <slot name="header">header<br></slot><br><slot>main</slot><br><slot name="footer">footer<br></slot>                                                                            | <slot :member="member"><br></slot><br>data() {<br>return { member: { name: '堂安', height: 170}<br>}}                                                                           |

- `section04/named-slot/namedSlot.html`ファイルを作成<br>

```html:namedSlot.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>名前付きslot</title>
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
      <my-com class="child">
        <template v-slot:header>
          ヘッダー
        </template>
        mainに入ります
        <!-- nameのないslotに入る -->
        <template #footer>
          <!-- v-solotは#で省略できる -->
          フッター
        </template>
        ここもmainに入ります
        <!-- nameのないslotに入る -->
      </my-com>
    </div>

    <script>
      let myCom = {
        template: `<div>
      <slot name="header">
      header
      </slot>
      <slot name="default">main contents</slot> <!-- name="default"は書かなくても良い -->
      <slot name="footer">
      footer
      </slot>
      </div>`,
      }

      let app = new Vue({
        el: '#app',
        data() {
          return {}
        },
        components: {
          myCom,
        },
      })
    </script>
  </body>
</html>
```

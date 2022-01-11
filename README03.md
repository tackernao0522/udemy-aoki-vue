## 21 computed(キャッシュされる)

- 参考: https://jp.vuejs.org/v2/api/#computed <br>

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
      <br />
      {{totalPriceMethods()}} {{totalPriceMethods()}} {{totalPrice}}
      {{totalPrice}}
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            price: 1,
            number: 1,
          }
        },
        methods: {
          totalPriceMethods() {
            console.log('methodsです')
            return this.number * this.price
          },
        },
        computed: {
          totalPrice() {
            console.log('computedです')
            return this.number * this.price
          },
        },
        watch: {},
      })
    </script>
  </body>
</html>
```

```browser:console
methodsです
methodsです
computedです // computedは一回のみ出力される(dataの値が変わらなければそのままである)
```

```browser:console
app.price = 100
100
app.number = 5
5
```

## 22 this とアロー関数

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
      <br />
      {{totalPriceMethods()}} {{totalPriceMethods()}} {{totalPrice}}
      {{totalPrice}}
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            price: 1,
            number: 1,
          }
        },
        methods: {
          totalPriceMethods() {
            console.log('methodsです')
            return this.number * this.price
          },
        },
        computed: {
          // totalPrice() {
          //   return this.number * this.price
          // }
          totalPrice: (app) => app.number * app.price, // アロー関数で書くとone lineで書ける(Vueインスタンスで指定する)
        },
        watch: {},
      })

      console.log(this) // windowオブジェクト

      const obj = {
        test: function () {
          console.log(this) // オブジェクトの中 そのオブジェクト
        },
      }

      const objArrow = {
        test: () => {
          console.log(this) // windowオブジェクト
        },
      }
    </script>
  </body>
</html>
```

```
obj.test()
{test: ƒ}
undefined
objArrow.test()
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
undefined
```

## 23 watch (キャッシュされる)

- 参考: https://jp.vuejs.org/v2/api/#watch <br>

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
      <br />
      {{totalPriceMethods()}} {{totalPriceMethods()}} {{totalPrice}}
      {{totalPrice}}
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            price: 1,
            number: 1,
            books: [
              {
                id: 1,
                title: 'タイトル1',
                author: '著者名1',
                url: 'https://google.com',
              },
              {
                id: 2,
                title: 'タイトル2',
                author: '著者名2',
                url: 'https://google.com',
              },
              {
                id: 3,
                title: 'タイトル3',
                author: '著者名3',
                url: 'https://google.com',
              },
            ],
          }
        },
        methods: {
          totalPriceMethods() {
            console.log('methodsです')
            return this.number * this.price
          },
        },
        computed: {
          // totalPrice() {
          //   return this.number * this.price
          // }
          totalPrice: (app) => app.number * app.price,
        },
        watch: {
          books: {
            handler() {
              console.log('変更されました')
            },
            deep: true,
          },
        },
      })

      console.log(this) // windowオブジェクト

      const obj = {
        test: function () {
          console.log(this) // オブジェクトの中 そのオブジェクト
        },
      }

      const objArrow = {
        test: () => {
          console.log(this) // windowオブジェクト
        },
      }
    </script>
  </body>
</html>
```

- `ブラウザコンソール`<br>

```browser:console
app.books //
(3) [{…}, {…}, {…}, __ob__: Observer]0: {__ob__: Observer}1: {__ob__: Observer}2: {__ob__: Observer}length: 3__ob__: Observer {value: Array(3), dep: Dep, vmCount: 0}[[Prototype]]: Array
app.books[0] //
{__ob__: Observer}author: (...)id: (...)title: (...)url: (...)__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}get author: ƒ reactiveGetter()set author: ƒ reactiveSetter(newVal)get id: ƒ reactiveGetter()set id: ƒ reactiveSetter(newVal)get title: ƒ reactiveGetter()set title: ƒ reactiveSetter(newVal)get url: ƒ reactiveGetter()set url: ƒ reactiveSetter(newVal)[[Prototype]]: Object
app.books[0].title = "タイトルを変更" //
index.html:67 変更されました
'タイトルを変更'
```

## 24 リアクティブシステム

- 参考: https://jp.vuejs.org/v2/guide/reactivity.html <br>

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
      <br />
      {{totalPriceMethods()}} {{totalPriceMethods()}} {{totalPrice}}
      {{totalPrice}}
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            price: 1,
            number: 1,
            reactiveTest: {
              name: 'テスト',
            },
            books: [
              {
                id: 1,
                title: 'タイトル1',
                author: '著者名1',
                url: 'https://google.com',
              },
              {
                id: 2,
                title: 'タイトル2',
                author: '著者名2',
                url: 'https://google.com',
              },
              {
                id: 3,
                title: 'タイトル3',
                author: '著者名3',
                url: 'https://google.com',
              },
            ],
          }
        },
        methods: {
          totalPriceMethods() {
            console.log('methodsです')
            return this.number * this.price
          },
        },
        computed: {
          // totalPrice() {
          //   return this.number * this.price
          // }
          totalPrice: (app) => app.number * app.price,
        },
        watch: {
          books: {
            handler() {
              console.log('変更されました')
            },
            deep: true,
          },
        },
      })

      console.log(this) // windowオブジェクト

      const obj = {
        test: function () {
          console.log(this) // オブジェクトの中 そのオブジェクト
        },
      }

      const objArrow = {
        test: () => {
          console.log(this) // windowオブジェクト
        },
      }
    </script>
  </body>
</html>
```

- `ブラウザコンソール`<br>

```browser:console
pp.$data //
{__ob__: Observer}books: (...)number: (...)price: (...)reactiveTest: Objectname: (...)__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}get name: ƒ reactiveGetter()set name: ƒ reactiveSetter(newVal)[[Prototype]]: Object__ob__: Observer {value: {…}, dep: Dep, vmCount: 1}get books: ƒ reactiveGetter()set books: ƒ reactiveSetter(newVal)get number: ƒ reactiveGetter()set number: ƒ reactiveSetter(newVal)get price: ƒ reactiveGetter()set price: ƒ reactiveSetter(newVal)get reactiveTest: ƒ reactiveGetter()set reactiveTest: ƒ reactiveSetter(newVal)[[Prototype]]: Object
app.reactiveTest.message = 'メッセージ' //
'メッセージ'
app.$data.reactiveTest //
{message: 'メッセージ', __ob__: Observer}message: "メッセージ"name: "テスト"__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}get name: ƒ reactiveGetter()set name: ƒ reactiveSetter(newVal)[[Prototype]]: Object
Vue.set(app.reactiveTest, 'message2', 'get/setつきです') //
'get/setつきです'
app.$data.reactiveTest //
{message: 'メッセージ', __ob__: Observer}message: "メッセージ"message2: "get/setつきです"name: "テスト"__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}get message2: ƒ reactiveGetter()set message2: ƒ reactiveSetter(newVal)get name: ƒ reactiveGetter()set name: ƒ reactiveSetter(newVal)[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
```

## 25 ライフサイクルフック created と mounted

- 参考: https://jp.vuejs.org/v2/guide/instance.html#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%80%E3%82%A4%E3%82%A2%E3%82%B0%E3%83%A9%E3%83%A0 <br>

- `参考: https://jp.vuejs.org/v2/api/#%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF <br>

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {}
        },
        created() {
          console.log('created')
          console.log(this.$el) // elementが生成されていたら表示される
        },
        mounted() {
          console.log('mounted')
          console.log(this.$el)
        },
      })
    </script>
  </body>
</html>
```

- `ブラウザコンソール`<br>

```browser:console
created // createdの方は表示されていない(現時点では生成されていない)
undefined
mounted
<div id=​"app">​ // 仮想DOM ​</div>​ // マウントの後はDOM要素が取れている
```

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      // 仮想DOM
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            test: 'あああ',
          }
        },
        created() {
          console.log('created')
          console.log(this.$el) // elementが生成されていたら表示される
          console.log(this.test)
        },
        mounted() {
          console.log('mounted')
          console.log(this.$el)
        },
      })
    </script>
  </body>
</html>
```

- `ブラウザコンソール`<br>

```browser:console
created
index.html:27 undefined
index.html:28 あああ // dataの中では取れる
index.html:31 mounted
index.html:32 <div id=​"app">​ // 仮想DOM ​</div>​
```

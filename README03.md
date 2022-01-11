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

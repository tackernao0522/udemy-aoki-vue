## 21 computed

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
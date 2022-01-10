## 13 v-if v-else v-else-if

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
      <!-- 仮想DOM -->
      <div v-show="isDisplay">表示</div>
      <div v-show="!isDisplay">falseになっています</div>

      <div v-if="isDisplay">ifで表示</div>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            isDisplay: true,
          }
        },
      })
    </script>
  </body>
</html>
```

- `ブラウザ検証ツールコンソールにて`<br>

```ブラウザ検証ツール
app.$data.isDisplay = false
false
```

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <title>Document</title>
</head>

<body>
  <div id="app">
    <!-- 仮想DOM -->
    <div v-show="isDisplay">表示</div>
    <div v-show="!isDisplay">falseになっています</div>

    <div v-if="isDisplay">ifで表示</div>

    <!-- <div v-if="signal !== 'red'">赤</div> 否定形も記述できる-->
    <div v-if="signal === 'red'">赤</div>
    <div v-else-if="signal === 'yellow'">黄</div>
    <div v-else-if="signal === 'blue'">青</div>
    <div v-else>赤青黄ではありません</div>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          isDisplay: true,
          signal: 'red'
        }
      }
    })
  </script>
</body>

</html>
```

- `ブラウザ検証ツールコンソールにて`<br>

```ブラウザ検証ツール
app.$data.signal = 'blue'
'blue'
app.$data.signal = 'white'
'white'
```

# セクション 1: Vue.js の基本

## 4. Vue2 インストール

- 参考: https://jp.vuejs.org/v2/guide/ <br>

- `section01/index.html`を作成<br>

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script> // 追記
</head>

<body>

</body>

</html>
```

- `section01/index.html`を編集<br>

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
</head>

<body>
  <div id="app">
    {{ message }}
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
  </script>
</body>

</html>
```

+ `section/index.html`を編集(修正)<br>

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
</head>

<body>
  <div id="app">
    {{ message }}
  </div>

  <script>
    // この書き方にする
    let app = new Vue({
      el: '#app',
      data() {
        return {
          message: 'Hello Vue!'
        }
      }
    })
  </script>
</body>

</html>
```

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

- `section/index.html`を編集(修正)<br>

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

## 5 API el と data

- 参考: https://jp.vuejs.org/v2/api/ <br>

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
  <div id="app"> <!-- 仮想DOMの範囲 -->
    {{ message }}
  </div>

  <script>
    // Vueクラス->インスタンス化(実態) new
    // let app = new Vue({

    // })
    let app = new Vue({
      el: '#app', // 仮想DOM
      data() {
        return {
          message: 'Hello' // キー(key): 値(value)
        }
      }
    })
  </script>
</body>

</html>
```

## 6 仮想 DOM

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
  <div id="app"> <!-- 仮想DOMの範囲 -->
    {{ message }}
  </div>

  <script>
    // Vueクラス->インスタンス化(実態) new
    // let app = new Vue({

    // })
    let app = new Vue({
      el: '#app', // 仮想DOM
      data() {
        return {
          message: 'Hello' // キー(key): 値(value)
        }
      }
    })

    const html = document.querySelector('html')
    console.dir(html) // DOMの中身が見られる
    console.dir(app) // 仮想DOMの中身
  </script>
</body>

</html>
```

## 8 タグに属性をつける(直接 DOM 操作の場合)

- 参考: https://developer.mozilla.org/ja/docs/Web/HTML/Element <br>

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
  <!-- リアルDOM JSが繋がっているのかどうかわからない -->
  <a id="google_link">googleへのリンク</a>

  <div id="app">
    <!-- 仮想DOMの範囲 -->
    {{ message }}
  </div>

  <script>
    // Vueクラス->インスタンス化(実態) new
    // let app = new Vue({

    // })
    let app = new Vue({
      el: '#app', // 仮想DOM
      data() {
        return {
          message: 'Hello' // キー(key): 値(value)
        }
      }
    })

    // 直接DOM操作
    // idを指定(idが変わればコード変更が必要になってしまう)
    const googleLink = document.getElementById('google_link')
    googleLink.href = 'https://google.com'
  </script>
</body>

</html>
```

## 9 v-bind と :

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
  <!-- リアルDOM JSが繋がっているのかどうかわからない -->
  <a id="google_link">googleへのリンク</a>

  <div id="app">
    <!-- 仮想DOMの範囲 -->
    {{ message }}
    <br>
    <!-- <a href="{{ google }}">googleへのリンク</a> エラーになる -->

    <!-- <a v-bind:href="google">googleへのリンク</a> 正規の書き方 -->

    <a :href="google">googleへのリンク</a> <!-- 省略形 -->
  </div>

  <script>
    // Vueクラス->インスタンス化(実態) new
    // let app = new Vue({

    // })
    let app = new Vue({
      el: '#app', // 仮想DOM
      data() { // 初期設定
        return {
          message: 'Hello', // キー(key): 値(value)
          google: 'https://google.com'
        }
      }
    })

    // 直接DOM操作
    // idを指定(idが変わればコード変更が必要になってしまう)
    const googleLink = document.getElementById('google_link')
    googleLink.href = 'https://google.com'
  </script>
</body>

</html>
```

## 10 v-bind その 2 オブジェクト

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
    <!-- 仮想DOMの範囲 -->
    {{ message }}
    <br>
    <!-- <a href="{{ google }}">googleへのリンク</a> エラーになる -->

    <!-- <a v-bind:href="google">googleへのリンク</a> 正規の書き方 -->

    <a :href="google">googleへのリンク</a> <!-- 省略形 -->
    <br>
    オブジェクト.キー
    <a :href="book.url">{{ book.title }}</a>
    <br>
    <input v-bind="{name:formInput.name, placeholder:formInput.placeholder}">
    <br>
    <input v-bind="formInput">
  </div>

  <script>
    // Vueクラス->インスタンス化(実態) new
    // let app = new Vue({

    // })
    let app = new Vue({
      el: '#app', // 仮想DOM
      data() { // 初期設定
        return {
          message: 'Hello', // キー(key): 値(value)
          google: 'https://google.com',
          book: {
            title: '本のタイトル',
            url: 'https://google.com'
          },
          formInput: {
            name: 'your_name',
            placeholder: 'お名前を入力してください',
          }
        }
      }
    })
  </script>
</body>

</html>
```

## 11 v-bind その 3 style/class

- `section01/index.html`を編集<br>

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <title>Document</title>
  <style>
    .active {
      border: 1px solid red;
    }

    .text-danger {
      color: red;
    }
  </style>
</head>

<body>
  リアルDOM
  <div style="color: blue; font-size: 20px">style テスト</div>
  <br>
  <div class="active text-danger">classテスト</div>
  <br>
  <div id="app">
    <!-- 仮想DOM -->
    <div :style="{fontSize: fontSize}">Styleテスト</div>
    <div :class="{active: isActive}">classテスト</div>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          // font-size: '20px', ケバブケースはNG
          fontSize: '20px', // キャメルケースで記述する
          isActive: false,
        }
      }
    })
  </script>
</body>

</html>
```

- ブラウザ検証ツールの console にて<br>

```
app.$data.isActive = true // enter
app.$data.isActive = false // enter
// とすると挙動が確認できる
```

## 12 ディレクティブ v-show

- 参考： https://jp.vuejs.org/v2/api/#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96 <br>

* `section01/index.html`を編集<br>

```
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
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          isDisplay: true
        }
      }
    })
  </script>
</body>

</html>
```

- `検証ツールコンソール`<br>

```
app.$data.isDisplay = false // enter
```

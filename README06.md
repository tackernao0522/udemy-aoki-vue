# セクション 3: フォームと非同期通信(Ajax)

## 34 フォーム HTML のおさらい(JS 講座と同じ)

- `section03`ディレクトリと`section03/forms`ディレクトリを作成<br>

- `section03/forms/index.html`ファイルを作成<br>

* `section03/forms/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forms</title>
  </head>

  <body>
    <form>
      <input id="" class="" type="text" name="your_name" value="あああ" />
      氏名
      <input
        type="email"
        required
        placeholder="メールアドレスを入力してください"
      />
      メールアドレス
      <br />
      <label for="gender_male">男性</label>
      <!-- labelタグを入れてforとidを合わすと'男性'の文字の部分をクリックしても選択できる -->
      <input id="gender_male" type="radio" name="gender" />
      <input type="radio" name="gender" />
      女性
      <input type="submit" value="送信" />
      <br />
      <select></select>
      <textarea></textarea>
      <button></button>
    </form>
  </body>
</html>
```

## 35 双方向データバインディング(v-bind と v-on)

| v-model | V-bind(:) と v-on(@)                                       |
| ------- | ---------------------------------------------------------- |
| 特徴    | シンプルに作れる<br>修飾子がつけられる（number, lazy, trim | 複雑な内容も設定できる |
| 書き方  | v-model="test"                                             | :valuse = test <br> @input="test = \$event.target.value" |
| 応用    | computed と組み合わせる事も(get/set)                       | \$event.target.value 以外を扱ったり |

| v-model         | v-bind(:) | v-on(@) |
| --------------- | --------- | ------- |
| input, textarea | value     | Input   |
| checkbox, radio | checked   | change  |
| select          | value     | change  |

#### 双方向データバインディング

<h5>Tow-way Data Binding</h5>

`例`<br>

```
<input :value="test" @input="test = $event.target.value">
  ↕︎
data内 test: ""
```

- `section03/v-bind-v-on`ディレクトリを作成<br>

- `section03/v-bind-v-on/index.html`ファイルを作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Two way Data binding</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <input :value="test" />
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            test: 'あああ',
          }
        },
      })
    </script>
  </body>
</html>
```

```browser:console
app.$data.test
'あああ'
app.test
'あああ'
```

- `section03/v-bind-v-on/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Two way Data binding</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <input :value="test" @input="test = $event.target.value" />
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            test: 'あああ',
          }
        },
      })
    </script>
  </body>
</html>
```

```browser:console
app.test
'あああいいい'
```

- `section03/v-bind-v-on/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Two way Data binding</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <input :value="test" @input="test = $event.target.value" />
      {{test}} // リアルタイムでわかる
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            test: 'あああ',
          }
        },
      })
    </script>
  </body>
</html>
```

- `section03/v-bind-v-on/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Two way Data binding</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <input :value="test" @input="test = $event.target.value" />
      {{test}}
      <br />
      <input @input="checkEvent" />
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            test: 'あああ',
          }
        },
        methods: {
          checkEvent(e) {
            console.log(e)
          },
        },
      })
    </script>
  </body>
</html>
```

```browser:console
validity: ValidityState {valueMissing: false, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: false, …}
value: "abc"
```

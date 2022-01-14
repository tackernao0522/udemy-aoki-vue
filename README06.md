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

| v-model | V-bind(:) と v-on(@)                                        |
| ------- | ----------------------------------------------------------- |
| 特徴    | シンプルに作れる<br>修飾子がつけられる（number, lazy, trim) | 複雑な内容も設定できる |
| 書き方  | v-model="test"                                              | :valuse = test <br> @input="test = \$event.target.value" |
| 応用    | computed と組み合わせる事も(get/set)                        | \$event.target.value 以外を扱ったり |

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

## 36 v-model

- `section03/v-model`ディレクトリを作成<br>

* `section03/v-model/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>v-model</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <form>
        氏名
        <input type="text" v-model="contact.yourName" />
        <br />
        電話番号
        <input type="tel" v-model="contact.tel" />
        <br />
        メールアドレス
        <input type="email" v-model="contact.email" />
        <br />
        性別
        <input type="radio" value="male" v-model="contact.gender" />
        男性
        <input type="radio" value="female" v-model="contact.gender" />
        女性
        <input type="radio" value="other" v-model="contact.gender" />
        その他
        <br />
        年齢
        <select v-model="contact.age">
          <!-- disabledをつけないとiphoneではうまく表示されない -->
          <option disabled value="">年齢を選択してください</option>
          <option>10代</option>
          <option>20代</option>
          <option>30代</option>
          <option>40代〜</option>
        </select>
        <br />
        メッセージ
        <textarea v-model="contact.message"></textarea>
        <br />
        このサイトを知った理由
        <input type="checkbox" value="webサイト" v-model="contact.attracts" />
        webサイト
        <input type="checkbox" value="チラシ" v-model="contact.attracts" />
        チラシ
        <input type="checkbox" value="その他" v-model="contact.attracts" />
        その他
        <br />
        注意事項に同意する
        <input type="checkbox" v-model="contact.caution" />
        <br />
        <input type="submit" value="送信" />
      </form>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            contact: {
              yourName: '',
              tel: '',
              email: '',
              gender: '',
              age: '',
              message: '',
              attracts: [],
              caution: false,
            },
          }
        },
      })
    </script>
  </body>
</html>
```

- ブラウザで入力して`Vue Devtools`で確認してみる<br>

## 37 v-model 修飾子

- 参考: https://jp.vuejs.org/v2/guide/forms.html <br>

* `section03/v-model-modifier`ディレクトリを作成<br>

* `section03/v-model-modifier/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>v-model 修飾子</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <form>
        氏名
        <input type="text" v-model="contact.yourName" />
        <br />
        電話番号
        <input type="tel" v-model.number="contact.tel" />
        // 修飾子numberは数字が文字列ではなく数値で反映される
        <br />
        メールアドレス
        <!-- <input type="email" v-model.lazy="contact.email" /> -->
        // 修飾子lazyの場合は入力してカーソルから離れると反映される(Vue
        Devtoolsで確認)
        <input type="email" v-model.lazy.trim="contact.email" />
        // trimを加えると空白がカットされて反映される
        <br />
        性別
        <input type="radio" value="male" v-model="contact.gender" />
        男性
        <input type="radio" value="female" v-model="contact.gender" />
        女性
        <input type="radio" value="other" v-model="contact.gender" />
        その他
        <br />
        年齢
        <select v-model="contact.age">
          <!-- disabledをつけないとiphoneではうまく表示されない -->
          <option disabled value="">年齢を選択してください</option>
          <option>10代</option>
          <option>20代</option>
          <option>30代</option>
          <option>40代〜</option>
        </select>
        <br />
        メッセージ
        <textarea v-model="contact.message"></textarea>
        <br />
        このサイトを知った理由
        <input type="checkbox" value="webサイト" v-model="contact.attracts" />
        webサイト
        <input type="checkbox" value="チラシ" v-model="contact.attracts" />
        チラシ
        <input type="checkbox" value="その他" v-model="contact.attracts" />
        その他
        <br />
        注意事項に同意する
        <input type="checkbox" v-model="contact.caution" />
        <br />
        <input type="submit" value="送信" />
      </form>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            contact: {
              yourName: '',
              tel: '',
              email: '',
              gender: '',
              age: '',
              message: '',
              attracts: [],
              caution: false,
            },
          }
        },
      })
    </script>
  </body>
</html>
```

## 38 @submit と methods

#### フォームのイベント/オプション

| タイミング        | 送信ボタンクリック時        | リアルタイム<br>フォーカス外れた時 | リアルタイム（即時）          |
| ----------------- | --------------------------- | ---------------------------------- | ----------------------------- |
| イベント          | @click, @submit<br>.prevent | @change, @blur<br>v-model.lazy     | @input<br>v-model(input タグ) |
| オプション<br>API | methods                     | computed(get/set)◯<br>watch△       | computed(get/set)◯<br>watch△  |

- `section03/submit-methods`ディレクトリを作成<br>

* `section03/submit-methods/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@submitとmethods</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <style>
    .error {
      color: red;
    }
  </style>
</head>

<body>
  <div id="app">
    <p v-if="errors.length">
    <ul>
      <li class="error" v-for="error in errors">{{error}}</li>
    </ul>
    </p>
    <!-- 再読み込みが掛かるとerror表示が消えてしまうのでpreventをつける -->
    <form @submit.prevent="validate">
      氏名
      <input type="text" v-model="contact.yourName" />
      <br />
      電話番号
      <input type="tel" v-model.number="contact.tel" />
      <br />
      メールアドレス
      <input type="email" v-model.lazy.trim="contact.email" />
      <br />
      性別
      <input type="radio" value="male" v-model="contact.gender" />
      男性
      <input type="radio" value="female" v-model="contact.gender" />
      女性
      <input type="radio" value="other" v-model="contact.gender" />
      その他
      <br />
      年齢
      <select v-model="contact.age">
        <option disabled value="">年齢を選択してください</option>
        <option>10代</option>
        <option>20代</option>
        <option>30代</option>
        <option>40代〜</option>
      </select>
      <br />
      メッセージ
      <textarea v-model="contact.message"></textarea>
      <br />
      このサイトを知った理由
      <input type="checkbox" value="webサイト" v-model="contact.attracts" />
      webサイト
      <input type="checkbox" value="チラシ" v-model="contact.attracts" />
      チラシ
      <input type="checkbox" value="その他" v-model="contact.attracts" />
      その他
      <br />
      注意事項に同意する
      <input type="checkbox" v-model="contact.caution" />
      <br />
      <input type="submit" value="送信" />
    </form>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          contact: {
            yourName: '',
            tel: '',
            email: '',
            gender: '',
            age: '',
            message: '',
            attracts: [],
            caution: false,
          },
          errors: [],
        }
      },
      methods: { // submitしたタイミング
        validate() {
          this.errors = [] // errorsをここでも初期化しておく

          // 三項演算子での書き方
          // !this.contact.yourName ? this.errors.push('氏名は必須です')
          //   : this.contact.yourName.length > 20 ? this.errors.push('氏名は20文字以内で入力してください')
          //     : !this.contact.gender ? this.errors.push('性別を選択してください')
          //       : !this.contact.caution ? this.errors.push('注意事項にチェックを入れてください')
          //         : console.log('送信可能です')

          // if文での書き方
          if (!this.contact.yourName) {
            this.errors.push('氏名は必須です')
          } else if (this.contact.yourName.length > 20) {
            this.errors.push('氏名は20文字以内で入力してください')
          }
          if (!this.contact.gender) {
            this.errors.push('性別を選択してください')
          }
          if (!this.contact.caution) {
            this.errors.push('注意事項にチェックを入れてください')
          }
          if (!this.errors.length) {
            console.log('送信可能です')
          }
        }
      }
    })
  </script>
</body>

</html>
```

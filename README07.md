## 39 computed(get/set)

- 参考: https://jp.vuejs.org/v2/guide/computed.html <br>

* `section03/computed-get-set`ディレクトリを作成<br>

* `section03/computed-get-set/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>computed(get/set)</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <style>
    [v-cloak] {
      display: none;
    }

    .error {
      color: red;
    }
  </style>
</head>

<body>
  <div id="app" v-cloak>
    <p v-if="errors.length">
    <ul>
      <li class="error" v-for="error in errors">{{error}}</li>
    </ul>
    </p>
    <form @submit.prevent="validate">
      氏名
      <!-- computedで設定したyourNameにする(computedで監視している値) -->
      <input type="text" v-model="yourName" />
      <br />
      <p :class="{error: hasError.yourName}">
        {{contact.yourName.length}} / 20
      </p>
      <p v-show="hasError.yourName" class="error">氏名は20文字以内で入力してください></p>

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
          hasError: {
            yourName: false
          }
        }
      },
      methods: {
        validate() {
          this.errors = []
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
      },
      computed: {
        yourName: {
          get() {
            return this.contact.yourName
          },
          set(value) {
            // console.log(value)
            if (value.length <= 20) {
              this.hasError.yourName = false
            } else {
              this.hasError.yourName = true
            }
            return this.contact.yourName = value
          }
        }
      }
    })
  </script>
</body>

</html>
```

## 41 サンプル 4: Todo リスト（フィルターつき）

- `section03/todo`ディレクトリを作成<br>

- `section03/todo/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo List</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      [v-cloak] {
        display: none;
      }

      ul {
        list-style: none;
      }

      .done {
        text-decoration: line-through;
        /* 横線が引かれる */
      }
    </style>
  </head>

  <body>
    <div id="app">
      <input type="text" v-model="newItem" />
      <button @click.prevent="addItem">追加</button>
      <input v-model="query" />
      検索

      <ul v-cloak>
        <!-- 削除ボタンのindexが必要なのでindexもいれる -->
        <li v-for="(todo, index) in filteredList">
          <input type="checkbox" v-model="todo.isDone" />
          <!-- チェックを入れるとboolean値が反転する -->
          <span :class="{done: todo.isDone}">{{todo.item}}</span>
          <!-- isDoneがtrueだったらdoneのクラス(横線)を付ける -->
          <button @click="deleteItem(index)">削除</button>
        </li>
      </ul>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            newItem: '',
            todos: [],
            query: '',
          }
        },
        methods: {
          addItem() {
            if (!this.newItem) return // newItemが空だとreturnで実行しない
            const todo = {
              item: this.newItem,
              isDone: false,
            }
            this.todos.push(todo)
            this.newItem = '' // 空にする
          },
          deleteItem(index) {
            // 配列のindexを引数として取る
            this.todos.splice(index, 1) // indexの1つ目を消す
          },
        },
        computed: {
          filteredList() {
            return this.todos.filter((todo) => {
              return todo.item.indexOf(this.query) !== -1 // 値が入っていないと-1を返すという仕様になっている
            }) // computedの中には必ずreturnが必要
          },
        },
      })
    </script>
  </body>
</html>
```

## 45 表示時 ・ クリック時の Ajax

#### 非同期通信(Ajax)簡易表

| タイミング                         | 画面表示                           | クリック時      | リアルタイム |
| ---------------------------------- | ---------------------------------- | --------------- | ------------ |
| イベント<br>(ライフサイクルフック) | created<br>mounted<br>{\$nextTick} | @click, @submit | @input       |
| オプション<br>API                  | methods                            | methods         | watch        |

- サーバーと通信が発生するためある程度(1 秒〜3 秒)間隔を開けて実行する<br>`loadash.js`の`_.debounce` / `_.throttle`<br>

* `section03/ajax`ディレクトリを作成<br>

- https://dog.ceo/dog-api/ の API を使ってみる<br>

* `section03/ajax/ajax.html`ファイルを作成<br>

```html:ajax.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表示時・クリック時のAjax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app"></div>
  </body>

  <script>
    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {}
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          console.log(response)
        },
      },
    })
  </script>
</html>
```

```browser:console
app.getDogImage()
Promise {<pending>}
ajax.html:74 {message: 'https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg', status: 'success'}
```

- `section03/ajax/ajax.html`を編集<br>

```html:ajax.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表示時・クリック時のAjax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app"></div>
  </body>

  <script>
    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {}
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          console.log(response.message)
        },
      },
    })
  </script>
</html>
```

```browser:console
app.getDogImage()
Promise {<pending>}
ajax.html:74 https://images.dog.ceo/breeds/terrier-norfolk/n02094114_1467.jpg
```

- `section03/ajax/ajax.html`を編集<br>

* ボタンを押した時に画像が表示されるバージョン<br>

```html:ajax.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表示時・クリック時のAjax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <button @click="getDogImage">画像を取得</button>
      <img :src="dogImage" />
    </div>
  </body>

  <script>
    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {
          dogImage: '',
        }
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          // console.log(response.message)
          this.dogImage = response.message
        },
      },
    })
  </script>
</html>
```

- ブラウザを読み込んだ時に表示されるようにする<br>

- `section03/ajax/ajax.html`を編集<br>

```html:ajax.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>表示時・クリック時のAjax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <button @click="getDogImage">画像を取得</button>
      <img :src="dogImage" />
    </div>
  </body>

  <script>
    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {
          dogImage: '',
        }
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          // console.log(response.message)
          this.dogImage = response.message
        },
      },
      created() {
        // 追記
        this.getDogImage()
      },
    })
  </script>
</html>
```

## 46 lodash の debounce/throttle

#### Lodash

- JavaScript の便利ライブラリ<br>

```js:sample.js
_.debounce(fn, 1000) // 間隔を空けて実行
_.throttle(fn, 1000) // 実行後 指定msは実行しない
```

参考: https://lodash.com/ <br>

- `section03/lodash`ディレクトリを作成<br>

* `section03/lodash/lodash.html`ファイルを作成<br>

* `ライブラリがない場合`<br>

```html:lodash.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lodashのdebounce/throttle</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <script>
      window.addEventListener('resize', () => {
        console.log('リサイズしたよ')
      })
    </script>
  </body>
</html>
```

```browser:console
7lodash.html:16 リサイズしたよ
```

- `debounceを使用する`<br>

```html:lodash.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lodashのdebounce/throttle</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <script>
      // window.addEventListener('resize', () => {
      //   console.log('リサイズしたよ')
      // })
      window.addEventListener(
        'resize',
        _.debounce(() => {
          console.log('debounceでリサイズ')
        }, 3000),
      )
    </script>
  </body>
</html>
```

```browser:console
3lodash.html:19 debounceでリサイズ // 3秒待って表示される
```

- `throttleを使用する`<br>

```html:lodash.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lodashのdebounce/throttle</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <script>
      // window.addEventListener('resize', () => {
      //   console.log('リサイズしたよ')
      // })
      window.addEventListener(
        'resize',
        _.debounce(() => {
          console.log('debounceでリサイズ')
        }, 3000),
      )

      window.addEventListener(
        'resize',
        _.throttle(() => {
          console.log('throttleでリサイズ')
        }, 3000),
      )
    </script>
  </body>
</html>
```

- リサイズした時に実行されその後 3 秒待って再度実行される<br>

```browser:console
throttleでリサイズ
lodash.html:23 throttleでリサイズ
lodash.html:19 debounceでリサイズ
lodash.html:23 throttleでリサイズ
lodash.html:23 throttleでリサイズ
lodash.html:19 debounceでリサイズ
lodash.html:23 throttleでリサイズ
lodash.html:23 throttleでリサイズ
lodash.html:19 debounceでリサイズ
```

## 47 watch + Ajax

- 参考: https://jp.vuejs.org/v2/guide/computed.html のウォッチャ <br>

* `section03/watch-ajax`ディレクトリを作成<br>

* `section03/watch-ajax/watch.html`を作成<br>

```html:watch.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>watch + Ajax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <button @click="getDogImage">画像を取得</button>
      <img :src="dogImage" />
    </div>
  </body>

  <script>
    let obj = {
      a: 'テスト',
    }
    obj.b = 'あああ'
    obj.c = test

    function test() {
      console.log('テスト')
    }

    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {
          dogImage: '',
        }
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          // console.log(response.message)
          this.dogImage = response.message
        },
      },
      created() {
        this.getDogImage()
      },
    })
  </script>
</html>
```

```browser:console
obj
{a: 'テスト', b: 'あああ', c: ƒ}
```

```browser:console
obj.c
ƒ test() { console.log('テスト') } // まだこの関数は実行されていない
```

```browser:console
obj.c() // （）をつけつことによってこの関数は実行される
watch.html:63 テスト
undefined
```

- `section03/watch-ajax/watch.html`を編集<br>

```html:watch.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>watch + Ajax</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  </head>

  <body>
    <div id="app">
      <button @click="getDogImage">画像を取得</button>
      <img :src="dogImage" />
      <input type="text" v-model="watchTest" />
    </div>
  </body>

  <script>
    let obj = {
      a: 'テスト',
    }
    obj.b = 'あああ'
    obj.c = test

    function test() {
      console.log('テスト')
    }

    const url = 'https://dog.ceo/api/breeds/image/random'
    const options = {
      method: 'get',
    }

    let app = new Vue({
      el: '#app',
      data() {
        return {
          dogImage: '',
          watchTest: '',
        }
      },
      methods: {
        async getDogImage() {
          const response = await fetch(url, options).then((response) => {
            return response.json()
          })
          // console.log(response.message)
          this.dogImage = response.message
        },
      },
      watch: {
        watchTest() {
          this.watchDogImage()
        },
      },
      created() {
        this.getDogImage()
        this.watchDogImage = _.debounce(this.getDogImage, 1000)
      },
    })
  </script>
</html>
```

```browser:console
app
Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
$attrs: (...)
$children: []
$createElement: ƒ (a, b, c, d)
$el: div#app
$listeners: (...)
$options: {components: {…}, directives: {…}, filters: {…}, el: '#app', _base: ƒ, …}
$parent: undefined
$refs: {}
$root: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
$scopedSlots: {}
$slots: {}
$vnode: undefined
dogImage: (...)
getDogImage: ƒ ()
watchDogImage: ƒ s()
watchTest: (...)
```

- ブラウザの input フィールドに文字を入れると間隔を待って画像が切り替わる<br>

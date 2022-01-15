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
            let that = this // thatはselfとも書く thisはVueインスタンスの中身
            return this.todos.filter((todo) => {
              return todo.item.indexOf(that.query) !== -1 // 値が入っていないと-1を返すという仕様になっている
            }) // computedの中には必ずreturnが必要
          },
        },
      })
    </script>
  </body>
</html>
```

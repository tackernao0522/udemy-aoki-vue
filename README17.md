## 108 search->edit への移動と表示

- `section08/bookapp/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <router-view @add-book-list="addBook" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './global/Footer.vue'
import Header from './global/Header.vue'
const STORAGE_KEY = 'books'

export default {
  components: {
    Header,
    Footer,
  },
  name: 'App',

  data() {
    return {
      books: [],
      newBook: null,
    }
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })
      // this.newBook = "";
      this.saveBooks()
      // -1は後ろから1番目 (-1)[0]とすると一番最後から0番目 idを追加するとそのidを取得
      // 最後に追加したidの取得コードである
      // console.log(this.books.slice(-1)[0].id);
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      // localStorage.setItem(STORAGE_KEY, parsed);
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`)
    },
  },
}
</script>
```

- `section08/bookapp/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import BookIndex from '../pages/BookIndex.vue'
import BookSearch from '../pages/BookSearch.vue'
import BookEdit from '../pages/BookEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex,
  },
  {
    path: '/search',
    name: 'BookSearch',
    component: BookSearch,
  },
  {
    path: '/edit/:id', // 編集
    name: 'BookEdit',
    component: BookEdit,
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `section08/bookapp/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        // 編集
        <router-view :books="books" @add-book-list="addBook" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './global/Footer.vue'
import Header from './global/Header.vue'
const STORAGE_KEY = 'books'

export default {
  components: {
    Header,
    Footer,
  },
  name: 'App',

  data() {
    return {
      books: [],
      newBook: null,
    }
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })
      // this.newBook = "";
      this.saveBooks()
      // -1は後ろから1番目 (-1)[0]とすると一番最後から0番目 idを追加するとそのidを取得
      // 最後に追加したidの取得コードである
      // console.log(this.books.slice(-1)[0].id);
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed) // コメントアウト解除
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`)
    },
  },
}
</script>
```

- 検索して`+`ボタンを押すと`Edit`ページへ遷移して下記の JSON が表示される<br>

```
BookEdit [ { "id": 0, "title": "HTML5 Canvas", "image": "http://books.google.com/books/content?id=igSotgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", "description": "HTML5 Canvasについての解説書", "readDate": "", "memo": "" }, { "id": 1, "title": "PHPﾌﾚｰﾑﾜｰｸLaravel入門第2版", "image": "http://books.google.com/books/content?id=Y3vlDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", "description": "人気No.1フレームワークのロングセラー定番解説書が、新バージョン対応で改訂!L", "readDate": "", "memo": "" }, { "id": 2, "title": "ゲームプログラミングC++", "image": "http://books.google.com/books/content?id=-2Z9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", "description": "誰も教えてくれなかった、 ゲーム開発の基本を徹底的に学ぼう！ ・ゲームとはどんな", "readDate": "", "memo": "" } ]
```

## 109 beforeRouteEnter + \$nextTick

| NO  | タイミング         | グローバル（アロー関数) | ルート単位（アロー関数） | コンポーネント内       | 用途                    |
| --- | ------------------ | ----------------------- | ------------------------ | ---------------------- | ----------------------- |
| 1   | トリガ（クリック） |                         |                          |                        |                         |
| 2   |                    | globalEach              |                          | beforeRouteLeave       | 本当に離れますか？      |
| 3   |                    | beforeEach              |                          |                        | 認証                    |
| 4   |                    |                         |                          | beforeRouteUpdate      | watch \$route の代用    |
| 5   |                    |                         | beforeEnter              |                        |                         |
| 6   | 非同期ルートを解決 |                         |                          |                        |                         |
| 7   |                    |                         |                          | beforeRouteEnter       |                         |
| 8   |                    | beforeResolve           |                          |                        |                         |
| 9   | ナビゲーション確定 |                         |                          |                        |                         |
| 10  |                    | afterEach               |                          |                        |                         |
| 11  | DOM 更新           |                         |                          |                        |                         |
| 12  |                    |                         |                          | beforeRouteEnter(next) | next の callback を呼ぶ |

- 参考: https://router.vuejs.org/ja/guide/advanced/navigation-guards.html#%E3%83%AB%E3%83%BC%E3%83%88%E5%8D%98%E4%BD%8D%E3%82%AB%E3%82%99%E3%83%BC%E3%83%88%E3%82%99 のコンポーネント内ガード<br>

* 参考: https://jp.vuejs.org/v2/guide/reactivity.html#%E9%9D%9E%E5%90%8C%E6%9C%9F%E6%9B%B4%E6%96%B0%E3%82%AD%E3%83%A5%E3%83%BC <br>

- `section08/bookapp/src/pages/BookEdit.vue`を編集<br>

```vue:BookEdit.vue
<template>
  <div>
    BookEdit
    {{ book.title }}
    {{ books }}
  </div>
</template>

<script>
export default {
  name: 'BookEdit',
  props: {
    books: Array,
  },
  data() {
    return {
      book: '',
    }
  },
  // 編集
  beforeRouteEnter(to, from, next) {
    // thisは使えない vmを使う
    next((vm) => {
      // `vm` を通じてコンポーネントインスタンスにアクセス
      vm.$nextTick(() => {
        vm.book = vm.books[vm.$route.params.id]
        console.log(vm.book)
      })
    })
  },
}
</script>

<style></style>
```

## 110 BookEdit カレンダーなど

- TextArea 参考: https://vuetifyjs.com/ja/components/textareas/#section-4f7f304465b9 <br>

- ダイアログとメニュー<br>
  参考: https://vuetifyjs.com/ja/components/date-pickers/#section-30a230af30c630a330d630d430c330ab30fc <br>

* Date Picker 日本語化
  参考: https://arm4.hatenablog.com/entry/2018/08/17/155344 <br>

- `section08/bookapp/src/pages/BookEdit.vue`を編集<br>

```vue:BookEdit.vue
<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>タイトル：{{ book.title }}</v-card-title>
              読んだ日：
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                  locale="jp-ja"
                  :day-format="(date) => new Date(date).getDate()"
                ></v-date-picker>
              </v-menu>
              感想：
              <v-textarea class="mx-2" v-model="book.momo">
                {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/">一覧に戻る</v-btn>
                <v-btn color="info" @click="editBookInfo">保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BookEdit',
  props: {
    books: Array,
  },
  data() {
    return {
      book: '',
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    // thisは使えない vmを使う
    next((vm) => {
      // `vm` を通じてコンポーネントインスタンスにアクセス
      vm.$nextTick(() => {
        vm.book = vm.books[vm.$route.params.id]
        console.log(vm.book)
      })
    })
  },
}
</script>

<style></style>
```

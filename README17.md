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

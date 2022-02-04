## 113 BookEdit date の修正

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
              <v-textarea class="mx-2" v-model="book.memo">
                {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/">一覧に戻る</v-btn>
                <v-btn color="info" @click="updateBookInfo">保存する</v-btn>
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
      date: '', // 空にする
      menu: false,
    }
  },
  methods: {
    updateBookInfo() {
      this.$emit('update-book-info', {
        id: this.$route.params.id,
        readDate: this.date,
        memo: this.book.memo,
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    // thisは使えない vmを使う
    next((vm) => {
      // `vm` を通じてコンポーネントインスタンスにアクセス
      vm.$nextTick(() => {
        vm.book = vm.books[vm.$route.params.id]
        // console.log(vm.book);
        // 追記
        if (vm.book.readDate) {
          vm.date = vm.book.readDate
        } else {
          vm.date = new Date().toISOString().substr(0, 10)
        }
      })
    })
  },
}
</script>

<style></style>
```

## 114 LocalStorage 一覧削除

- `section08/bookapp/src/global/Header.vue`を編集<br>

```vue:Header.vue
<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      // 追記
      <v-btn color="error" @click="deleteLocalStorage">削除する</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    deleteLocalStorage() {
      this.$emit('delete-local-storage')
    },
  },
}
</script>

<style></style>
```

- `section08/bookapp/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <v-app>
    <Header @delete-local-storage="deleteLocalStorage" />
    <v-main>
      <v-container>
        <router-view
          :books="books"
          @add-book-list="addBook"
          @update-book-info="updateBookInfo"
        />
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
  name: 'App',
  components: {
    Header,
    Footer,
  },
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
      localStorage.setItem(STORAGE_KEY, parsed)
    },
    updateBookInfo(e) {
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description,
      }
      this.books.splice(e.id, 1, updateInfo)
      this.saveBooks()
      this.$router.push('/')
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`)
    },
    // 追記
    deleteLocalStorage() {
      const isDeleted = 'LocalStorageのデータを削除してよろしいですか？'
      if (window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY, '')
        localStorage.removeItem(STORAGE_KEY)
        this.books = []
        window.location.reload()
      }
    },
  },
}
</script>
```

## 115 補足

### サンプルアプリの補足

改善案<br>

- 重複しないように -> Lodash の\_search など<br>

* 削除機能 -> id がずれるのでインクリメント id を別で作成しておく<br>

- 初回登録 保存->編集 を 編集->保存 に<br>

* そーと機能->ソート番号を用意<br>

- レイアウト調整<br>

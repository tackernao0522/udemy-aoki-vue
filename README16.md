## 106 検索画面 fetch, v-card

- 参考: https://vuetifyjs.com/ja/components/text-fields/ <br>

* `section08/bookapp/src/pages/BookSearch.vue`を編集<br>

```vue:BookSearch.vue
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="本のタイトルを検索"
            v-model="keyword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn color="primary" @click="search(keyword)">検索する</v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn color="secondary" to="/">一覧画面に戻る</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(book, index) in searchResults"
          :key="book.index"
        >
          <v-card class="mx-auto">
            <v-row>
              <v-col cols="4">
                <v-img :src="book.image"></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title>
                  {{ book.title }}
                </v-card-title>
                {{ book.description }}
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn fab dark color="indigo" @click="addBookList(index)">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'BookSearch',
  data() {
    return {
      keyword: '',
      searchResults: [],
    }
  },
  methods: {
    async search(keyword) {
      // クエリストリングを作成
      this.searchResults = []
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle: ${keyword}`,
        maxResults: 40,
      }
      const queryParams = new URLSearchParams(params)
      console.log(baseUrl + queryParams)

      // fetchでJSON取得
      const response = await fetch(baseUrl + queryParams).then((response) =>
        response.json(),
      )
      console.log(response.items)
      // 必要な情報を配列にpushして入れる
      for (let book of response.items) {
        let title = book.volumeInfo.title
        let img = book.volumeInfo.imageLinks
        let description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title : '',
          image: img ? img.thumbnail : '',
          description: description ? description.slice(0, 40) : '', // 0番目から40文字をカットする
        })
      }
    },
  },
}
</script>

<style></style>
```

- 参考: https://vuetifyjs.com/ja/components/cards/#section-30b030ea30c330c9 <br>

## 107 App.vue から localStorage へ保存

`<v-container>タグを削除しておく`<br>

- `section08/bookapp/src/pages/BookSearch.vue`を修正<br>

```vue:BookSearch.vue
<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="本のタイトルを検索"
          v-model="keyword"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="search(keyword)">検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="/">一覧画面に戻る</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="(book, index) in searchResults"
        :key="book.index"
      >
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>
                {{ book.title }}
              </v-card-title>
              {{ book.description }}
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn fab dark color="indigo" @click="addBookList(index)">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
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
  name: 'BookSearch',
  data() {
    return {
      keyword: '',
      searchResults: [],
    }
  },
  methods: {
    async search(keyword) {
      // クエリストリングを作成
      this.searchResults = []
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle: ${keyword}`,
        maxResults: 40,
      }
      const queryParams = new URLSearchParams(params)
      console.log(baseUrl + queryParams)

      // fetchでJSON取得
      const response = await fetch(baseUrl + queryParams).then((response) =>
        response.json(),
      )
      console.log(response.items)
      // 必要な情報を配列にpushして入れる
      for (let book of response.items) {
        let title = book.volumeInfo.title
        let img = book.volumeInfo.imageLinks
        let description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title : '',
          image: img ? img.thumbnail : '',
          description: description ? description.slice(0, 40) : '', // 0番目から40文字をカットする
        })
      }
    },
  },
}
</script>

<style></style>
```

- `seciton08/bookapp/src/App.vue`を修正<br>

```vue:App.vue
<template>
  <v-app>
    <Header />

    <v-main>
      // 追記
      <v-container>
        <router-view />
        // 追記
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './global/Footer.vue'
import Header from './global/Header.vue'

export default {
  components: {
    Header,
    Footer,
  },
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
```

- `section08/bookapp/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <router-view />
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
    addBook() {
      // 実際に何かしたことを入力する
      if (!this.newBook) {
        return
      }

      this.books.push(this.newBook)
      this.newBook = ''
      this.saveBooks()
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed)
    },
  },
}
</script>
```

- `section08/bookapp/src/pages/BookSearch.vue`を編集<br>

```vue:BookSearch.vue
<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="本のタイトルを検索"
          v-model="keyword"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="search(keyword)">検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="/">一覧画面に戻る</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        v-for="(book, index) in searchResults"
        :key="book.index"
      >
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>
                {{ book.title }}
              </v-card-title>
              {{ book.description }}
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn fab dark color="indigo" @click="addBookList(index)">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
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
  name: 'BookSearch',
  data() {
    return {
      keyword: '',
      searchResults: [],
    }
  },
  methods: {
    // 追記
    addBookList(index) {
      this.$emit('add-book-list', this.searchResults[index]) // 子コンポーネントから親コンポーネントに渡す$emit
    },
    async search(keyword) {
      // クエリストリングを作成
      this.searchResults = []
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle: ${keyword}`,
        maxResults: 40,
      }
      const queryParams = new URLSearchParams(params)
      console.log(baseUrl + queryParams)

      // fetchでJSON取得
      const response = await fetch(baseUrl + queryParams).then((response) =>
        response.json(),
      )
      console.log(response.items)
      // 必要な情報を配列にpushして入れる
      for (let book of response.items) {
        let title = book.volumeInfo.title
        let img = book.volumeInfo.imageLinks
        let description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title : '',
          image: img ? img.thumbnail : '',
          description: description ? description.slice(0, 40) : '', // 0番目から40文字をカットする
        })
      }
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
        // 子コンポーネントから受け取っている
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })
      // this.newBook = "";
      this.saveBooks()
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed)
    },
  },
}
</script>
```

- 検索して`+`ボタンを押すと`LocalStorage`に保存される<br>

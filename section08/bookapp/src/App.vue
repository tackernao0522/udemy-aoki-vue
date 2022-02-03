<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view :books="books" @add-book-list="addBook" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./global/Footer.vue";
import Header from "./global/Header.vue";
const STORAGE_KEY = "books";

export default {
  components: {
    Header,
    Footer,
  },
  name: "App",

  data() {
    return {
      books: [],
      newBook: null,
    };
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
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
        readDate: "",
        memo: "",
      });
      // this.newBook = "";
      this.saveBooks();
      // -1は後ろから1番目 (-1)[0]とすると一番最後から0番目 idを追加するとそのidを取得
      // 最後に追加したidの取得コードである
      // console.log(this.books.slice(-1)[0].id);
      this.goToEditPage(this.books.slice(-1)[0].id);
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`);
    },
  },
};
</script>

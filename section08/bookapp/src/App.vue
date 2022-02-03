<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <router-view
          @add-book-list="addBook"
         />
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
        readDate: '',
        memo: '',
      });
      // this.newBook = "";
      this.saveBooks();
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
  },
};
</script>

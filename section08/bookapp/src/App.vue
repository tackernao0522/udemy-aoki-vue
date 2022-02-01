<template>
  <v-app>
    <Header />

    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./global/Footer.vue";
import Header from "./global/Header.vue";

export default {
  components: {
    Header,
    Footer,
  },
  name: "App",

  data: () => ({
    //
  }),
};
</script>

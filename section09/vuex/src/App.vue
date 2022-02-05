<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    {{ $store.state.count }}
    <br />
    <ul>
      <li v-for="user in visibleUsers" :key="user.id">
        {{ user.id }} : {{ user.name }} : {{ user.isVisible }}
      </li>
    </ul>
    <br />
    {{ getUserById.name }}
    {{ getUserById }}
  </div>
</template>

<script>
export default {
  computed: {
    visibleUsers() {
      return this.$store.getters.visibleUsers;
    },
    getUserById() {
      return this.$store.getters.getUserById(2);
    },
  },
};
</script>

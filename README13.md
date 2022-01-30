## 91 動的パラメータ+props 補足

- `section07/vuerouter/src/components/BookDetail.vue`を編集<br>

```vue:BookDetail.vue
<template>
  <div>
    <p>本の詳細</p>
    <p>タイトル：{{ title }}</p>
    <p>本の内容：{{ content }}</p>
    {{ books[bookIndex].title }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String,
  },
  data() {
    return {
      bookIndex: this.$route.params.id - 1,
      books: [
        { id: 1, title: 'タイトル1', content: '本の内容1' },
        { id: 2, title: 'タイトル2', content: '本の内容2' },
        { id: 3, title: 'タイトル3', content: '本の内容3' },
      ],
    }
  },
}
</script>

<style></style>
```

- `section07/vuerouter/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '@/components/BookDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/book',
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: BookDetail,
    props: (route) => ({
      id: Number(route.params.id), // 編集
      title: route.params.title,
      content: route.params.content,
    }),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `section07/vuerouter/sec/components/BookDetail.vue`を編集<br>

```vue:BookDetail.vue
<template>
  <div>
    <p>本の詳細</p>
    <p>タイトル：{{ title }}</p>
    <p>本の内容：{{ content }}</p>
    {{ books[bookIndex].title }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String,
  },
  data() {
    return {
      bookIndex: this.$route.params.id - 1,
      books: [
        { id: 1, title: 'タイトル1', content: '本の内容1' },
        { id: 2, title: 'タイトル2', content: '本の内容2' },
        { id: 3, title: 'タイトル3', content: '本の内容3' },
      ],
    }
  },
  // componentが読み込まれるタイミングで読み込まれるメソッド
  created() {
    if (this.$route.params.id > this.books.length) {
      this.$router.push('/book')
    }
  },
}
</script>

<style></style>
```

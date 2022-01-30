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

## 92 動的パラメータの補足 watch

- `section07/vuerouter/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about" tag="button">About</router-link> -->
      <router-link to="/about" exact-active-class="test">About</router-link>
      |
      <router-link to="/book">BookList</router-link>
      |
      <router-link to="/item/1">Item</router-link>
      // 追記
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: red;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.test {
  color: lightblue;
}
</style>
```

- `section07/vuerouter/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '@/components/BookDetail.vue'
import Item from '../views/Item.vue'

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
      id: Number(route.params.id),
      title: route.params.title,
      content: route.params.content,
    }),
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: Item,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `section07/vuerouter/src/views/Item.vue`ファイルを作成<br>

```vue:Item.vue
<template>
  <div>
    Item
    <router-link to="1">Item1</router-link>
    <br />
    <router-link to="2">Item2</router-link>
    <br />
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  created() {
    console.log('created')
  },
}
</script>

<style></style>
```

- 同じコンポーネントで切り替え Link しても created は実行されないので watch を使う<br>

* 参考: https://jp.vuejs.org/v2/api/#watch <br>

* `section07/vuerouter/src/views/Item.vue`を編集<br>

```vue:Item.vue
<template>
  <div>
    Item
    <router-link to="1">Item1</router-link>
    <br />
    <router-link to="2">Item2</router-link>
    <br />
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  created() {
    console.log('created')
  },
  watch: {
    $route(to, from) {
      console.log(to)
      console.log(from)
    },
  },
}
</script>

<style></style>
```

## 93 リダイレクトと 404 ページ

- `section07/vuerouter/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '@/components/BookDetail.vue'
import Item from '../views/Item.vue'

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
      id: Number(route.params.id),
      title: route.params.title,
      content: route.params.content,
    }),
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: Item,
  },
  {
    path: '*', // どのルートにもマッチしない時
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

- `section07/vuerouter/src/router/index.js`を編集<br>

```js:index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookList from '../views/BookList.vue'
import BookDetail from '@/components/BookDetail.vue'
import Item from '../views/Item.vue'
import NotFound from '@/components/NotFound.vue'

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
      id: Number(route.params.id),
      title: route.params.title,
      content: route.params.content,
    }),
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: Item,
  },
  {
    path: '*',
    // redirect: '/',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `section07/vuerouter/src/components/NotFound.vue`ファイルを作成<br>

```vue:NotFound.vue
<template>
  <div>
    404 ページが存在しません。
    <br />
    <button @click="goToHome">Homeに戻る</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
```

## 94 ネストされたルート

### ネストされた route-view

```js:index.js
<router-view />の中に<router-view />
// router/index.jsで設定

component: User,
children: [
  { path: 'profile', component: UserProfile },
  { path: 'post', component: UserPost },
]
```

- 参考: https://router.vuejs.org/ja/guide/essentials/nested-routes.html <br>

#### ハンズオン

- `section07/vuerouter/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <!-- <router-link to="/about" tag="button">About</router-link> -->
      <router-link to="/about" exact-active-class="test">About</router-link>
      |
      <router-link to="/book">BookList</router-link>
      |
      <router-link to="/item/1">Item</router-link>
      |
      <router-link to="/user/profile">User</router-link>
    </div>
    <div class="blue-b">
      <router-view />
    </div>
  </div>
</template>

<style>
.blue-b {
  border: 1px blue solid;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-active {
  color: red;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav a.test {
  color: lightblue;
}
</style>
```

- `section07/vuerouter/src/views/User.vue`ファイルを作成<br>

```vue:User.vue
<template>
  <div>
    ユーザー情報
    <br />
    <router-view />
  </div>
</template>

<script>
export default {}
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
import Item from '../views/Item.vue'
import NotFound from '@/components/NotFound.vue'
import User from '@/views/User.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserPost from '@/components/UserPost.vue'

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
      id: Number(route.params.id),
      title: route.params.title,
      content: route.params.content,
    }),
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: Item,
  },
  {
    // ネストされてる場合はnameを入れるとエラーになる
    path: '/user',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile,
      },
      {
        path: `post`,
        component: UserPost,
      },
    ],
  },
  {
    path: '*',
    // redirect: '/',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```

- `section07/vuerouter/src/components/UserProfile.vue`ファイルを作成<br>

```vue:UserProfile
<template>
  <div>ユーザープロフィール</div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `section07/vuerouter/src/components/UserPost.vue`ファイルを作成<br>

```vue:UserPost.vue
<template>
  <div>ユーザー記事</div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `section07/vuerouter/src/views/User.vue`を編集<br>

```vue:User.vue
<template>
  <div>
    ユーザー情報
    <br />
    <div class="green-b">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.green-b {
  border: 1px solid green;
}
</style>
```

- `section07/vuerouter/src/views/User.vue`を編集<br>

```vue:User.vue
<template>
  <div>
    ユーザー情報
    <br />
    <router-link to="profile">プロフィール</router-link>
    |
    <router-link to="post">記事</router-link>
    |
    <div class="green-b">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.green-b {
  border: 1px solid green;
}
</style>
```

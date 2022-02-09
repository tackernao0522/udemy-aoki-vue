## 145 setup(props)

### Setup の第一引数 props

```
props: {
  books: Array
},
setup(props, context) {
  console.log(props.books)
}
```

Props・・リアクティブ。分割代入は NG。設定しないなら`toRef()`または`toRefs()`<br>

- `section10/vue3-test/src/views/PropsEmitTest.vue`ファイルを作成<br>

* `section10/vue3-test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/children">Children</router-link>
    |
    <router-link to="/teleport-test">Teleport</router-link>
    |
    <router-link to="/composition-test">Composition</router-link>
    |
    <router-link to="/props-emit-test">PropsEmit</router-link>
    // 追記
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {}
  },
  provide() {
    return {
      userName: '親で設定した値',
    }
  },
}
</script>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

- `section10/vue3-test/src/router/index.js`を編集<br>

```js:index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Children from '@/views/Children'
import TeleportTest from '@/views/TeleportTest'
import CompositionTest from '@/views/CompositionTest'
// 追記
import PropsEmitTest from '@/views/PropsEmitTest'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/children',
    name: 'Children',
    component: Children,
  },
  {
    path: '/teleport-test',
    name: 'TeleportTest',
    component: TeleportTest,
  },
  {
    path: '/composition-test',
    name: 'CompositionTest',
    component: CompositionTest,
  },
  // 追記
  {
    path: '/props-emit-test',
    name: 'PropsEmitTest',
    component: PropsEmitTest,
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

- `section10/vue3-test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <router-link to="/children">Children</router-link>
    |
    <router-link to="/teleport-test">Teleport</router-link>
    |
    <router-link to="/composition-test">Composition</router-link>
    |
    <router-link to="/props-emit-test">PropsEmit</router-link>
  </div>
  // 編集
  <router-view :setupBooks="setupBooks" :dataBooks="dataBooks" />
</template>

<script>
// 追記
import { reactive } from 'vue'

export default {
  // 編集
  setup() {
    const setupBooks = reactive([
      {
        title: 'setupタイトル1',
        author: 'setup著者1',
      },
      {
        title: 'setupタイトル2',
        author: 'setup著者2',
      },
    ])

    return {
      setupBooks,
    }
  },
  data() {
    return {
      dataBooks: [
        {
          title: 'dataタイトル1',
          author: 'data著者1',
        },
        {
          title: 'dataタイトル2',
          author: 'data著者2',
        },
      ],
    }
  },
  //
  provide() {
    return {
      userName: '親で設定した値',
    }
  },
}
</script>

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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

- `section10/vue3-test/src/views/PropsEmitTest.vue`を編集<br>

```vue:PropsEmitTest.vue
<template>
  <div>PropsEmitTest</div>
  <div>{{ setupBooks }}</div>
  <ul>
    <li v-for="book in setupBooks" :key="book">
      {{ book.title }}
    </li>
  </ul>
  <div>{{ dataBooks }}</div>
</template>

<script>
export default {
  props: {
    setupBooks: Array,
    dataBooks: Array,
  },
  setup(props) {
    console.log(props.setupBooks)
    console.log(props.setupBooks[0].title)
    console.log(props.dataBooks)
  },
}
</script>

<style></style>
```

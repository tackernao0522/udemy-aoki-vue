## 134 CompositionAPI・setup()の実行タイミング

### CompositionAPI

Composition(構成、合成)<br>

1. 大規模対応<br>
2. コードの再利用性（合成関数）<br>
3. TypeScript のサポート<br>

OptionsAPI<br>
data, methods, computed, mounted など、役割ごとに場所がわかれていた<br>

CompositionAPI<br>
処理ごとにまとめて書くことができる<br>

### OptionsAPI に含まれる要素

- data<br>
- computed / watach<br>
- methods<br>
- lifecycle methods<br>
- props / emit<br>

これまでの OptionsAPI は引き続き使用可能<br>
CompositionAPI では書き方が変わる<br>

### setup 関数の実行タイミング

```
export default {
  setup() {
    console.log('setup') // createdより早い
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
}
```

- `section10/vue3-test/src/App.vue`ファイルを編集<br>

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

- `section10/vue3-test/src/views/CompositionTest.vue`ファイルを作成<br>

```vue:CompositionTest.vue
<template>
  <div>CompositionTest</div>
</template>

<script>
export default {
  data() {},
  setup() {
    console.log('setup')
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
}
</script>

<style></style>
```

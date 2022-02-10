## 148 合成関数(script 内)

- `section10/vue3-test/src/views/FunctionTest.vue`を編集<br>

```vue:FunctionTest.vue
<template>
  <div>CompositionFunctionTest</div>
  <div>
    <p>商品名:{{ item.name }}</p>
    <p>単価:{{ item.price }}</p>
    <p>合計: {{ totalPrice }}</p>
    <div>数量</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'

// script内で合成関数を作成する場合
const useCounter = (item) => {
  const increment = () => {
    item.amount++
  }
  const decrement = () => {
    item.amount--
  }

  const totalPrice = computed(() => {
    return item.price * item.amount
  })

  return { increment, decrement, totalPrice }
}

export default {
  setup() {
    const item = reactive({
      name: '商品名',
      price: 100,
      amount: 0,
    })

    const { increment, decrement, totalPrice } = useCounter(item)

    return { item, increment, decrement, totalPrice }
  },
}
</script>

<style></style>
```

## 149 合成関数(モジュール化)

`src/composables`フォルダを作成し`useCounter.js`を作成<br>

```js:useCounter.js
import { computed } from 'vue'

export default function useCounter(item) {
  const increment = () => {
    item.amount++
  }
  const decrement = () => {
    item.amount--
  }

  const totalPrice = computed(() => {
    return item.price * item.amount
  })

  return { increment, decrement, totalPrice }
}
```

- `section10/vue3-test/src/views/FunctionTest.vue`を編集<br>

```vue:FunctionTest.vue
<template>
  <div>CompositionFunctionTest</div>
  <div>
    <p>商品名:{{ item.name }}</p>
    <p>単価:{{ item.price }}</p>
    <p>合計: {{ totalPrice }}</p>
    <div>数量</div>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
  </div>
</template>

<script>
// import { reactive, computed } from "vue";
import { reactive } from 'vue' // モジュール化して切り離し
import useCounter from '@/composables/useCounter'

// script内で合成関数を作成する場合
// const useCounter = (item) => {
//   const increment = () => {
//     item.amount++;
//   };
//   const decrement = () => {
//     item.amount--;
//   };

//   const totalPrice = computed(() => {
//     return item.price * item.amount;
//   });

//   return { increment, decrement, totalPrice };
// };

export default {
  setup() {
    const item = reactive({
      name: '商品名',
      price: 100,
      amount: 0,
    })

    const { increment, decrement, totalPrice } = useCounter(item)

    return { item, increment, decrement, totalPrice }
  },
}
</script>

<style></style>
```

## 150 setup 内で vue-router

setup 内で this は使えない。専用の合成関数を読み込む<br>
https://next.router.vuejs.org/guide/advanced/composition-api.html <br>
https://router.vuejs.org/guide/advanced/composition-api.html#accessing-the-router-and-current-route-inside-setup <br>

```
import { useRouter, useRoute } from 'vue-router'

setup() {
  const router = useRouter()
  const route = useRoute()

  const goHome = () => {
    router.push('/')
  }
  const checkRoute = () => {
    console.log(route.path)
  }

  return { goHome, checkRoute }
}
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
    |
    <router-link to="/function-test">Function</router-link>
    |
    <router-link to="/router-test">Router</router-link>
    // 追記
  </div>
  <router-view
    :setupBooks="setupBooks"
    :dataBooks="dataBooks"
    @custom-event="parentMethod"
  />
</template>

<script>
import { reactive } from 'vue'

export default {
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
  methods: {
    parentMethod(e) {
      console.log(e)
    },
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
import PropsEmitTest from '@/views/PropsEmitTest'
import FunctionTest from '@/views/FunctionTest'
import RouterTest from '@/views/RouterTest'

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
    path: '/props-emit-test',
    name: 'PropsEmitTest',
    component: PropsEmitTest,
  },
  {
    path: '/function-test',
    name: 'FunctionTest',
    component: FunctionTest,
  },
  {
    path: '/router-test',
    name: 'RouterTest',
    component: RouterTest,
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

- `section10/vue3-test/src/views/RouterTest.vue`ファイルを作成<br>

```vue:RouterTest.vue
<template>
  <div>RouterTest</div>
</template>

<script>
export default {}
</script>

<style></style>
```

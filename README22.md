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

## 135 setup()で this が使えない件

### Setup 関数内の this は不可

```
<script>
export default {
  setup() {
    console.log(this)
  }
}
</script>
```

コンソール上に `undefined`と表示される<br>
Setup 関数内は this を使わない<br>
->アロー関数が使いやすい<br>

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>CompositionTest</div>
</template>

<script>
export default {
  data() {},
  setup() {
    console.log('setup')
    console.log(this) // undefinedになる
  },
  created() {
    console.log('created')
    console.log(this) // 拾える
  },
  mounted() {
    console.log('mounted')
  },
}
</script>

<style></style>
```

## 136 setup()の戻り値

```
<template>
  {{ name }}
</template>

<script>
export default {
  setup() {
    let name = '大谷',

    return { name } // returnに書いた変数・関数をtemplate内で扱える
  }
}
</script>
```

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompostionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    let name = '大谷'
    const age = 30
    console.log('setup')
    console.log(this) // undefinedになる
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
    }
  },
  data() {
    return {
      number: 1,
      sports: 'サッカー',
    }
  },
  created() {
    console.log('created')
    console.log(this) // 拾える
  },
  mounted() {
    console.log('mounted')
  },
}
</script>

<style></style>
```

## 137 ref()

### リアクティブ比較表

|                     | ref(reference 参照)                                  | reactive                                                     |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 対象                | プリミティブな値<br>(文字、数値など)                 | オブジェクト(data に近い)                                    |
| 設定                | const nameRef = ref('錦織')<br>※オブジェクトでラップ | const book = reactive({ title: 'タイトル', auther: '大谷' }) |
| template 内で指定   | {{ nameRef }}                                        | {{ book.title }}                                             |
| Script 内で扱う場合 | nameRef.value                                        | book.title                                                   |
| return 時           | return { nameRef }                                   | return { ・・・toRefs(book) }                                |

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>{{ nameRef }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let name = '大谷'
    const age = 30
    const nameRef = ref('錦織')

    console.log('setup')
    console.log(this) // undefinedになる
    console.log(nameRef)
    console.log(nameRef.value)
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
    }
  },
  data() {
    return {
      number: 1,
      sports: 'サッカー',
    }
  },
  created() {
    console.log('created')
    console.log(this) // 拾える
  },
  mounted() {
    console.log('mounted')
  },
}
</script>

<style></style>
```

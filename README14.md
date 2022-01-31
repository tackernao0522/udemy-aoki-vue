## 95 名前付き router-view

- 参考: https://router.vuejs.org/ja/guide/essentials/named-views.html <br>

* `section07/vuerouter/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

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
    <router-view name="sub" />
    // 追記
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
import HomeSub from '@/components/HomeSub.vue' // 追記

Vue.use(VueRouter)

const routes = [
  {
    // 編集
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      sub: HomeSub,
    },
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

- `section07/vuerouter/src/components/HomeSub.vue`ファイルを作成<br>

```vue:HomeSub.vue
<template>
  <div>サブのコンポーネントになります。</div>
</template>

<script>
export default {}
</script>

<style></style>
```

## 96 トランジションを含めたルート

### トランジション + router-view

`例`<br>

```
<transition name="fade" mode="out-in">
  <router-view />
</transition>
```

### sass のインストール

`$ npm install --save-dev node-sass@4.14.1 sass-loader@10.0.2`<br>

2021 年 10 月、<br>
vue-cli(vue2, webpack4)<br>
sass 最新版は webpack5 対応<br>
そのままだとバージョン違いでインストールできずエラー発生<br>

@マーク以降にバージョン指定することでインストール可能<br>

#### ハンズオン

- `$ npm install --save-dev node-sass@4.14.1 sass-loader@10.0.2`を実行<br>

* `section07/vuerouter/src/App.vue`ファイルを編集<br>

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
      <transition name="fade">
        // 編集
        <router-view />
      </transition>
    </div>
    <router-view name="sub" />
  </div>
</template>

<style lang="scss">
// 編集
// 追記
.fade {
  &-enter {
    transform: translate(-100px, 0);
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: all 1s 0s ease;
    }
  }
  &-leave {
    transform: translate(0, 0);
    opacity: 1;
    &-to {
      transform: translate(100px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s 0s ease;
    }
  }
}

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

- 参考: https://jp.vuejs.org/v2/guide/transitions.html <br>

* `section07/vuerouter/src/App.vue`を編集<br>

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
      <transition name="fade" mode="out-in"> // 編集
        <router-view />
      </transition>
    </div>
    <router-view name="sub" />
  </div>
</template>

<style lang="scss">
.fade {
  &-enter {
    transform: translate(-100px, 0);
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: all 1s 0s ease;
    }
  }
  &-leave {
    transform: translate(0, 0);
    opacity: 1;
    &-to {
      transform: translate(100px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s 0s ease;
    }
  }
}

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

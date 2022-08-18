# セクション11: script setup

## 157. script setupの概要

### Vue.js 3.2からの機能

SFC内でCompositionAPIをシンプルに書くことができる<br>

ランタイムパフォーマンス向上<br>
IDEパフォーマンス向上<br>
これまでのscriptとも併用可能(一度のみ読み出したい場合など)<br>
propsとemit定義時に純粋なTypeScript構文が使える<br>

SFC <script setup>

https://v3.js.vuejs.org/api/sfc-script-setup.html <br>

#### Composition API

```html:sample.html
<template>
  <h1>{{ count }}</h1>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>

<script>
  import { defineComponent, ref } from "vue";

  export defaul defineComponent({
    setup() {
      const count = ref(0);

      const increment = () => {
        count.value++;
      };

      const decrement = () => {
        count.value--;
      };
      return {
        count,
        increment,
        decrement,
      };
    },
  });
</script>
```

#### script setup

```html:sample.html
<script setup>
  import { ref } from "vue";

  const count = ref(0);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };
</script>

<template>
  <h1>{{ count }}</h1>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>
```

+ `mkdir section11`を作成<br>

+ `$ cd section11`を実行<br>

+ `$ vue create script_setup_test`を実行<br>

+ `Manually select features`を選択して`Enter`<br>

+ そのまま `Enter`<br>

+ `3.x`を選択して `Enter`<br>

+ `ESLint with error prevention only`を選択して `Enter`<br>

+ `Lint on save`を選択して `Enter`<br>

+ `In dedicated config files`を選択して `Enter`<br>

+ `n`を入力して`Enter`<br>

+ `$ cd script_setup_test`を実行<br>

+ `$ npm run serve`を実行<br>

+ http://localhost:8080/ にアクセスする<br>

+ `package.json`を編集<br>

```json:package.json
{
  "name": "script_setup_test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^3.0.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.15",
    "@vue/cli-plugin-eslint": "~4.5.15",
    "@vue/cli-service": "~4.5.15",
    "@vue/compiler-sfc": "^3.2.0", // 編集
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0"
  }
}
```

+ `node_modules`を削除する<br>

+ `$ npm install`を実行<br>

+ `$ npm run serve`を実行<br>

+ http://localhost:8080/ にアクセスする<br>

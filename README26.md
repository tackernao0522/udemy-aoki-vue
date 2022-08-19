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

## 158. script setupを実際に試してみる

#### VSCode拡張機能変更

script setup構文にはVetur非対応

代わりにVolarが推奨されている

+ VSCodeに拡張機能 `Volar` をインストールする<br>

+ `$ touch section11/script/setup_test/src/components/ScriptSetupTest.vue`を実行<br>

+ `section11/script/setup_test/src/components/ScriptSetupTest.vue`を編集<br>

```vue:ScriptSetupTest.vue
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

+ `section11/script/setup_test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <ScriptSetupTest />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScriptSetupTest from './components/ScriptSetupTest.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    ScriptSetupTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## 159. props down

#### prosps down, event up

difinePropsを使う<br>

```vue:sample:vue
<script setup>
  const props = defineProps({
    title: String
  })
</script>
```

※ ESLintにひっかかるので追加対応<br>

+ `.eslintrc.js`<br>

```js:.eslintrc.js
{
  "globals": {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "sithDefaults": "readonly",
  }
}
```

+ `section11/script/setup_test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ScriptSetupTest title="ここにタイトルが入ります" /> // 編集
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ScriptSetupTest from './components/ScriptSetupTest.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    ScriptSetupTest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

+ `section11/script/setup_test/src/components/ScriptSetupTest.vue`を編集<br>

```vue:ScriptSetupTest.vue
<script setup>
import { ref } from "vue";

// 追加
const props = defineProps({
  title: String
})

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

+ `section11/script_setup_test/.eslintrc.js`を編集<br>

```js:.eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true
  },
  // 追加
  "globals": {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "sithDefaults": "readonly",
  },
  // ここまで
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

+ `section11/script/setup_test/src/components/ScriptSetupTest.vue`を編集<br>

```vue:ScriptSetupTest.vue
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<template>
  <span>{{ props.title }}</span>
  <h1>{{ count }}</h1>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>
```

## 160. event upを試してみる

#### event up(子コンポーネントから親に渡す)

difineEmitsを使う<br>

親コンポーネント<br>

```vue:Parent.vue
<ScriptSetupTest @custom-event="parentMoethod" />

<script>
  //
  methods: {
    parentMoethod(e) {
      console.log('Emit実行', e)
    }
  }
  //
</script>
```

子コンポーネント<br>

```vue:Child.vue
<script setup>
  const emitTest = defineEmits(['cusutom-event'])

  <button @click="emitTest('custom-event', '子からの値')">Emitテスト</button>
</script>
```

+ `section11/script/setup_test/src/components/ScriptSetupTest.vue`を編集<br>

```vue:ScriptSetupTest.vue
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const emitTest = defineEmits(["custom-event"]); // 追加

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<template>
  <span>{{ props.title }}</span>
  <button @click="emitTest('custom-event', '子からの値')">Emit実行</button> <!-- 追加 -->
  <h1>{{ count }}</h1>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>
```

+ `section11/script/setup_test/src/App.vue`を編集<br>

```vue:App.vue
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ScriptSetupTest
    title="ここにタイトルが入ります"
    @custom-event="parentMethod"
  />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ScriptSetupTest from "./components/ScriptSetupTest.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    ScriptSetupTest,
  },
  methods: {
    parentMethod(e) {
      console.log("Emit実行されました", e);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

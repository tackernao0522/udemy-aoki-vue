## 141 computed()

参考: https://v3.ja.vuejs.org/api/computed-watch-api.html <br>

```
import { reactive, computed } from 'vue'

const item = reactive({
  price: 100,
  number: 1,
})

const totalPrice = computed(() => {
  return item.price * item.number // 必ずreturnが必要
})

return {
  item, totalPrice
}
```

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>ref: {{ nameRef }}</p>
    <p>reactive: {{ book.title }}</p>
    <p>reactive: {{ book.author[0] }}</p>
    <p>reactiveToRefs: {{ titleRef }}</p>
    <p>reactiveToRefs: {{ authorRef[1] }}</p>
    <button @click="btnClick">クリック</button>
    // 追記
    <p>computed: {{ totalPrice }}</p>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed } from 'vue' // 編集

export default {
  setup() {
    let name = '大谷'
    const age = 30
    const nameRef = ref('錦織')

    const book = reactive({
      title: 'タイトル',
      author: ['大谷', '伊藤'],
    })

    const booktoRefs = reactive({
      titleRef: 'タイトル2',
      authorRef: ['大谷2', '伊藤2'],
    })

    // 追記
    const item = reactive({
      price: 100,
      number: 1,
    })

    const totalPrice = computed(() => {
      return item.price * item.number
    })
    //

    const btnClick = (e) => {
      console.log('クリック')
      console.log(book.title)
      console.log(e)
    }

    console.log('setup')
    console.log(this) // undefinedになる
    console.log(nameRef)
    console.log(nameRef.value)
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
      book,
      ...toRefs(booktoRefs),
      btnClick,
      // 追記
      item,
      totalPrice,
      //
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

## 142 watch()

### watch 比較表

|                      | watch                                                               | watchEffect                      |
| -------------------- | ------------------------------------------------------------------- | -------------------------------- |
| 監視対象             | 第 1 引数<br>(引数内に配列で複数指定可能)<br>watch(price, () => {}) | 関数内のリアクティブオブジェクト |
| 取得できる値         | 第 2 引数内に<br>(newValue, oldValue)<br>などと指定                 | なし                             |
| 初回実行のタイミング | 監視対象オブジェクトが変更されたタイミング<br>(Lazy Load)           | 定義時に実行                     |
| 使い勝手             | OptionsAPI と同様<br>少し複雑                                       | シンプル                         |

```vue:sample.vue
<p>watch: <input v-model="search">{{ search }}</p>

<script>
import { watch } from 'vue'

const search = ref('')
watch(search, (newValue, prevValue) => {
  console.log(`watch: ${search.value}`)
  console.log(`new: ${newValue}`)
  console.log(`prev: ${prevValue}`)
})

return { search }
</script>
```

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>ref: {{ nameRef }}</p>
    <p>reactive: {{ book.title }}</p>
    <p>reactive: {{ book.author[0] }}</p>
    <p>reactiveToRefs: {{ titleRef }}</p>
    <p>reactiveToRefs: {{ authorRef[1] }}</p>
    <button @click="btnClick">クリック</button>
    <p>computed: {{ totalPrice }}</p>
    <div>
      watch:
      <input v-model="search" />
      {{ search }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed, watch } from 'vue'

export default {
  setup() {
    let name = '大谷'
    const age = 30
    const nameRef = ref('錦織')

    const book = reactive({
      title: 'タイトル',
      author: ['大谷', '伊藤'],
    })

    const booktoRefs = reactive({
      titleRef: 'タイトル2',
      authorRef: ['大谷2', '伊藤2'],
    })

    const item = reactive({
      price: 100,
      number: 1,
    })

    const totalPrice = computed(() => {
      return item.price * item.number
    })

    const btnClick = (e) => {
      console.log('クリック')
      console.log(book.title)
      console.log(e)
    }

    const search = ref('')
    watch(search, (newValue, prevValue) => {
      console.log(`watch: ${search.value}`)
      console.log(`new: ${newValue}`)
      console.log(`prev: ${prevValue}`)
    })

    console.log('setup')
    console.log(this) // undefinedになる
    console.log(nameRef)
    console.log(nameRef.value)
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
      book,
      ...toRefs(booktoRefs),
      btnClick,
      item,
      totalPrice,
      search,
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

## 143 watchEffect()

```
<div>
  watchEffect: <input v-model="searchEffect">{{ searchEffect }}
</div>

<script>
  import { watchEffect } from 'vue'

  const searchEffect = ref('')
  watchEffect(() => {
      console.log(`watchEffect: ${searchEffect.value}`)
    })

    return { searchEffect }
</script>
```

- `section10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>ref: {{ nameRef }}</p>
    <p>reactive: {{ book.title }}</p>
    <p>reactive: {{ book.author[0] }}</p>
    <p>reactiveToRefs: {{ titleRef }}</p>
    <p>reactiveToRefs: {{ authorRef[1] }}</p>
    <button @click="btnClick">クリック</button>
    <p>computed: {{ totalPrice }}</p>
    <div>
      watch:
      <input v-model="search" />
      {{ search }}
    </div>
    <div>
      watchEffect:
      <input v-model="searchEffect" />
      {{ searchEffect }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed, watch, watchEffect } from 'vue' // 編集

export default {
  setup() {
    let name = '大谷'
    const age = 30
    const nameRef = ref('錦織')

    const book = reactive({
      title: 'タイトル',
      author: ['大谷', '伊藤'],
    })

    const booktoRefs = reactive({
      titleRef: 'タイトル2',
      authorRef: ['大谷2', '伊藤2'],
    })

    const item = reactive({
      price: 100,
      number: 1,
    })

    const totalPrice = computed(() => {
      return item.price * item.number
    })

    const btnClick = (e) => {
      console.log('クリック')
      console.log(book.title)
      console.log(e)
    }

    const search = ref('')
    watch(search, (newValue, prevValue) => {
      console.log(`watch: ${search.value}`)
      console.log(`new: ${newValue}`)
      console.log(`prev: ${prevValue}`)
    })

    // 追記
    const searchEffect = ref('')
    watchEffect(() => {
      console.log(`watchEffect: ${searchEffect.value}`)
    })

    console.log('setup')
    console.log(this) // undefinedになる
    console.log(nameRef)
    console.log(nameRef.value)
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
      book,
      ...toRefs(booktoRefs),
      btnClick,
      item,
      totalPrice,
      search,
      // 追記
      searchEffect,
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

## 144 ライフサイクルフック

### setup 内のライフサイクルフック

| オプション API  | setup 内のフック  |
| --------------- | ----------------- |
| beforeCreate    | 不要\*            |
| created         | 不要\*            |
| beforeMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmount   | onBeforeUnmount   |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |
| activated       | onActivated       |
| deactivated     | onDeactivated     |

setup は`beforeCreate`と`created`のライフサイクルで実行される<br>

`beforeCreate` `created`は書く必要がない<br>

OptionsAPI と同じ名前だが頭に`on`がつく<br>

```
import { onMounted } from 'vue'

onMounted(() => {
  console.log('onMounted')
})
```

- `seciton10/vue3-test/src/views/CompositionTest.vue`を編集<br>

```vue:CompositionTest.vue
<template>
  <div>
    CompositionTest
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>ref: {{ nameRef }}</p>
    <p>reactive: {{ book.title }}</p>
    <p>reactive: {{ book.author[0] }}</p>
    <p>reactiveToRefs: {{ titleRef }}</p>
    <p>reactiveToRefs: {{ authorRef[1] }}</p>
    <button @click="btnClick">クリック</button>
    <p>computed: {{ totalPrice }}</p>
    <div>
      watch:
      <input v-model="search" />
      {{ search }}
    </div>
    <div>
      watchEffect:
      <input v-model="searchEffect" />
      {{ searchEffect }}
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  watchEffect,
  // 追記
  onMounted,
} from 'vue'

export default {
  setup() {
    let name = '大谷'
    const age = 30
    const nameRef = ref('錦織')

    const book = reactive({
      title: 'タイトル',
      author: ['大谷', '伊藤'],
    })

    const booktoRefs = reactive({
      titleRef: 'タイトル2',
      authorRef: ['大谷2', '伊藤2'],
    })

    const item = reactive({
      price: 100,
      number: 1,
    })

    const totalPrice = computed(() => {
      return item.price * item.number
    })

    const btnClick = (e) => {
      console.log('クリック')
      console.log(book.title)
      console.log(e)
    }

    const search = ref('')
    watch(search, (newValue, prevValue) => {
      console.log(`watch: ${search.value}`)
      console.log(`new: ${newValue}`)
      console.log(`prev: ${prevValue}`)
    })

    const searchEffect = ref('')
    watchEffect(() => {
      console.log(`watchEffect: ${searchEffect.value}`)
    })

    // 追記
    onMounted(() => {
      console.log('onMounted')
    })

    console.log('setup')
    console.log(this) // undefinedになる
    console.log(nameRef)
    console.log(nameRef.value)
    return {
      name, // keyとvalueが同じであれば一つでOK
      age,
      nameRef,
      book,
      ...toRefs(booktoRefs),
      btnClick,
      item,
      totalPrice,
      search,
      searchEffect,
    }
  },
  // Options API
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

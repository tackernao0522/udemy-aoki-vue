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

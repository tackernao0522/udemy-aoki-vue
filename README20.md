## 122 スプレッド構文

### Map ヘルパー

アクションするだけのメソッドを<br>
アクションと同じ methods として展開する<br>
（繰り返し書かなくていいように）<br>

`import { mapActions } from 'vuex`<br>

スプレッド構文<br>
`...mapActions(['xxx', 'yyy'])`<br>

- `section09/spread`ディレクトリを作成<br>

* `section09/spread/index.html`ファイルを作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      const obj = {
        a: 1,
        b: 2,
        test() {
          console.log('テスト')
        },
      }

      console.log(obj)
    </script>
  </body>
</html>
```

- `ブラウザコンソール<br>

```browser:console
{a: 1, b: 2, test: ƒ}
```

- `section09/spread/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      const obj = {
        a: 1,
        b: 2,
        test() {
          console.log('テスト')
        },
      }

      console.log(obj)

      const spread = {
        ...obj,
        c: 3,
      }
      console.log(spread)
    </script>
  </body>
</html>
```

- `ブラウザコンソール<br>

```browser:console
{a: 1, b: 2, c: 3, test: ƒ}
```

## 123 map ヘルパー(mapActions)

### Map ヘルバー使うのは 2 つ

| Vuex      | Map ヘルパー   |
| --------- | -------------- |
| state     | △ mapState     |
| getters   | ○ mapGetters   |
| mutations | △ mapMutations |
| actions   | ○ mapActions   |

Getters で State の値を監視産出するなら、mapState は不要<br>

必ず Action を通るなら、mapMutations は不要<br>

### Map ヘルパーの書き方

```
import { mapActions } from 'vuex'

methods: {
  ...mapActions(['incrementAction']) // 配列で複数書ける

  incrementAction() { // このメソッドと同じになる
    this.$store.dispatch('incrementAction')
  }
}
```

引数ありなら `this.incrementAction()`で<br>

- `section09/vuex/src/components/HelloWorld.vue`を編集<br>

```vue:HelloWorld.vue
<template>
  <div>
    <!-- <button @click="increment">+</button> -->
    <button @click="incrementAction">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex' // 追記
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  methods: {
    // increment() {
    //   this.$store.commit("increment"); // mutationsの中のincrementメソッドを呼び出す
    // },
    // addCountAction() {
    //   this.$store.dispatch('addCountAction')
    // },
    ...mapActions(['incrementAction', 'addCountAction']), // 追記
    // increment() {
    //   this.$store.dispatch("incrementAction");
    // },
    // addCount() {
    //   this.$store.dispatch("addCountAction", {
    //     value: 10,
    //   });
    // },
    // 編集
    addCount() {
      this.addCountAction({
        value: 10,
      })
    },
  },
}
</script>
```

## 13 v-if v-else v-else-if

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      <!-- 仮想DOM -->
      <div v-show="isDisplay">表示</div>
      <div v-show="!isDisplay">falseになっています</div>

      <div v-if="isDisplay">ifで表示</div>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            isDisplay: true,
          }
        },
      })
    </script>
  </body>
</html>
```

- `ブラウザ検証ツールコンソールにて`<br>

```ブラウザ検証ツール
app.$data.isDisplay = false
false
```

- `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <title>Document</title>
</head>

<body>
  <div id="app">
    <!-- 仮想DOM -->
    <div v-show="isDisplay">表示</div>
    <div v-show="!isDisplay">falseになっています</div>

    <div v-if="isDisplay">ifで表示</div>

    <!-- <div v-if="signal !== 'red'">赤</div> 否定形も記述できる-->
    <div v-if="signal === 'red'">赤</div>
    <div v-else-if="signal === 'yellow'">黄</div>
    <div v-else-if="signal === 'blue'">青</div>
    <div v-else>赤青黄ではありません</div>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          isDisplay: true,
          signal: 'red'
        }
      }
    })
  </script>
</body>

</html>
```

- `ブラウザ検証ツールコンソールにて`<br>

```ブラウザ検証ツール
app.$data.signal = 'blue'
'blue'
app.$data.signal = 'white'
'white'
```

## 14 v-for その1

+ 参考: https://jp.vuejs.org/v2/api/#v-for <br>

+ `in`でも`of`でもどちらでも良いがvueの場合は`in`の方が多いかもしれない<br>

+ `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <title>Document</title>
</head>

<body>
  <div id="app">
    <!-- 仮想DOM -->
    // 配列 (value)
    <ul>
      <li v-for="member in members">
        {{member}}
      </li>
    </ul>
    // 配列 (value, index)
    <ul>
      <li v-for="(member, index) in members">
        {{index}} : {{member}}
      </li>
    </ul>
    // オブジェクト (value)
    <ul>
      <li v-for="value in book">
        {{value}}
      </li>
    </ul>
    // オブジェクト (value, key)
    <ul>
      <li v-for="(value, key) in book">
        {{key}} : {{value}}
      </li>
    </ul>
    // オブジェクト (value, key, index)
    <ul>
      <li v-for="(value, key, index) in book">
        {{index}} : {{key}} : {{value}}
      </li>
    </ul>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          members: ['本田', '香川', '長友'],
          book: {
            title: 'タイトル',
            author: '著者名',
            url: 'https://google.com',
          }
        }
      }
    })
  </script>
</body>

</html>
```

## 15 v-for その2

+ `section01/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  <title>Document</title>
</head>

<body>
  <div id="app">
    <!-- 仮想DOM -->

    // 配列 (value)
    <ul>
      <li v-for="member in members">
        {{member}}
      </li>
    </ul>

    // 配列 (value, index)
    <ul>
      <li v-for="(member, index) in members">
        {{index}} : {{member}}
      </li>
    </ul>

    // オブジェクト (value)
    <ul>
      <li v-for="value in book">
        {{value}}
      </li>
    </ul>

    // オブジェクト (value, key)
    <ul>
      <li v-for="(value, key) in book">
        {{key}} : {{value}}
      </li>
    </ul>

    // オブジェクト (value, key, index)
    <ul>
      <li v-for="(value, key, index) in book">
        {{index}} : {{key}} : {{value}}
      </li>
    </ul>

    // 複数のオブジェクト
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>タイトル</th>
          <th>著者</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id"> <!-- indexでkeyを指定するとバグになる時があるのでidで指定する -->
          <td>{{book.id}}</td>
          <td>{{book.title}}</td>
          <td>{{book.author}}</td>
          <td>{{book.url}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {
          members: ['本田', '香川', '長友'],
          book: {
            title: 'タイトル',
            author: '著者名',
            url: 'https://google.com',
          },
          books: [
            {
              id: 1,
              title: 'タイトル1',
              author: '著者名1',
              url: 'https://google.com'
            },
            {
              id: 2,
              title: 'タイトル2',
              author: '著者名2',
              url: 'https://google.com'
            },
            {
              id: 3,
              title: 'タイトル3',
              author: '著者名3',
              url: 'https://google.com'
            },
          ]
        }
      }
    })
  </script>
</body>

</html>
```
# セクション 08: サンプル 6 SPA + GoogleBookAPI

## 100 Google Books API の説明

### Google Books API

メリット<br>
登録なしでも使える（1000 件/日）<br>

デメリット<br>
検索が少し弱い（表示されない本も）<br>
価格が表示されない・発刊日が正確ではない<br>
（AmazonAPI は条件厳しい（30 日以内に売上必要））<br>

- 参考: https://books.google.co.jp/ <br>

ベースの URL<br>
https://www.googleapis.com/books/v1/volumes?q=検索語句 <br>

intitle: 本のタイトル<br>
maxResults:40 検索表示数(10-40)<br>

https://developers.google.com/books <br>
Guides->Using the API-> Query parameter reference <br>

Google Book Api の使い方<br>
参考: https://miyachi-web.com/google-books-apis/ <br>

Google Books APIs <br>
https://developers.google.com/books/docs/v1/using <br>

### クエリーストリング

```
const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'

const params = {
  q: `intitle:${keyword}`,
  maxResults:40
}
const queryParams = new URLSearchParams(params)
fetch(baseUrl + queryParams)
```

## 100 Google Books API の説明

- `section08`ディレクトリを作成<br>

* `section08/test`ディレクトリを作成<br>

* `section08/test/api.html`ファイルを作成<br>

```html:api.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Api</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
  </head>

  <body>
    <div id="app">
      <input type="text" v-model="keyword" />
      <button @click="search(keyword)">検索する</button>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            keyword: '',
            searchResults: [],
          }
        },
        methods: {
          async search(keyword) {
            // クエリストリングを作成
            this.searchResults = []
            const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
            const params = {
              q: `intitle: ${keyword}`,
              maxResults: 40,
            }
            const queryParams = new URLSearchParams(params)
            console.log(baseUrl + queryParams)

            // fetchでJSON取得
            const response = await fetch(
              baseUrl + queryParams,
            ).then((response) => response.json())
            console.log(response.items)
            // 必要な情報を配列にpushして入れる
            for (let book of response.items) {
              let title = book.volumeInfo.title
              let img = book.volumeInfo.imageLinks
              let description = book.volumeInfo.description
              this.searchResults.push({
                title: title ? title : '',
                image: img ? img.thumbnail : '',
                description: description ? description.slice(0, 40) : '', // 0番目から40文字をカットする
              })
            }
          },
        },
      })
    </script>
  </body>
</html>
```

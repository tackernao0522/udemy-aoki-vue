# セクション 2: トランジションなど

## 26 CSS Sass/Scss BEM

- `section02/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <title>Document</title>
    <link rel="stylesheet" href="text/css" href="app.css" />
    // 追記
  </head>

  <body>
    <div id="app"></div>
  </body>

  <script>
    let app = new Vue({
      el: '#app',
      data() {
        return {}
      },
    })
  </script>
</html>
```

- `section02/app.css`ファイルを作成<br>

```css:app.css
.border-red {
  border: 1px solid red;
}
```

- `section02/app.scss`ファイルを作成<br>

- `app.css`の中身を切り取り`app.scss`に貼り付け<br>

```scss:app.scss
.border-red {
  border: 1px solid red;
}
```

- VSCODE の最下部の`Watch Sass`をクリック<br>

* `section02/app.css.map`ファイルが生成され自動的に`app.css`ファイルに書き換えてくれる<br>

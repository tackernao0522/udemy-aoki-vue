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

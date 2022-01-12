## 31 Array.splice

- `section02/array-splice`ディレクトリを作成<br>

* `section02/array-splice/index.html`を作成<br>

* 参考: https://jp.vuejs.org/v2/guide/list.html <br>

* 参考: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice <br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      let obj = [
        { id: 1, title: 'あああ' },
        { id: 2, title: 'いいい' },
        { id: 3, title: 'ううう' },
      ]

      // 3つ目の値を変更
      obj.splice(2, 1, { id: 4, title: 'おおお' })

      console.log(obj)

      // 追加
      obj.splice(3, 0, { id: 5, title: 'かかか' })

      console.log(obj)
    </script>
  </body>
</html>
```

```browser:console
(3) [{…}, {…}, {…}]
0: {id: 1, title: 'あああ'}
1: {id: 2, title: 'いいい'}
2: {id: 4, title: 'おおお'}
length: 3

(3) [{…}, {…}, {…}]
0: {id: 1, title: 'あああ'}
1: {id: 2, title: 'いいい'}
2: {id: 4, title: 'おおお'}
3: {id: 5, title: 'かかか'}
length: 4
[[Prototype]]: Array(0)
index.html:27
(4) [{…}, {…}, {…}, {…}]
0: {id: 1, title: 'あああ'}
1: {id: 2, title: 'いいい'}
2: {id: 4, title: 'おおお'}
3: {id: 5, title: 'かかか'}
length: 4
[[Prototype]]: Array(0)
```

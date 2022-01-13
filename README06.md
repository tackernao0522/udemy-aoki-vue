# セクション 3: フォームと非同期通信(Ajax)

## 34 フォーム HTMLのおさらい(JS講座と同じ)

- `section03`ディレクトリと`section03/forms`ディレクトリを作成<br>

- `section03/forms/index.html`ファイルを作成<br>

* `section03/forms/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forms</title>
  </head>

  <body>
    <form>
      <input id="" class="" type="text" name="your_name" value="あああ" />
      氏名
      <input
        type="email"
        required
        placeholder="メールアドレスを入力してください"
      />
      メールアドレス
      <br />
      <label for="gender_male">男性</label>
      <!-- labelタグを入れてforとidを合わすと'男性'の文字の部分をクリックしても選択できる -->
      <input id="gender_male" type="radio" name="gender" />
      <input type="radio" name="gender" />
      女性
      <input type="submit" value="送信" />
      <br />
      <select></select>
      <textarea></textarea>
      <button></button>
    </form>
  </body>
</html>
```

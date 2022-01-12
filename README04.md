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

## 27 サンプル 1: タブメニュー

- `section02/tab`ディレクトリを作成<br>

- `section02/tab/app.scss`ファイルを作成<br>

```scss:app.scss
.tab {
  font-size: 14px;
  margin: 20px auto;
  width: 600px;
  &__label {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    & li a {
      display: inline-block;
      width: 130px;
      text-align: center;
      padding: 8px 0;
      color: #333;
      text-decoration: none;
      border-radius: 10px 10px 0 0;
      &.active {
        background: #e6f0ff;
      }
      &:not(.active):hover {
        opacity: 0.5;
        transition: 0.4s;
      }
    }
  }
  &__content {
    background: #e6f0ff;
    font-size: 16px;
    min-height: 150px;
    padding: 15px;
    display: block;
  }
}
```

- `Watch Sass`をクリック<br>

* `section02/tab/index.html`を作成<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="app.css" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <!-- <style>
    .h1000{
      height: 1000px;
      border: 1px solid red;
    }
  </style> -->
  </head>

  <body>
    <div id="app">
      <!-- <div class="h1000"></div> -->
      <section class="tab">
        <ul class="tab__label">
          <li v-for="(item, id) in items" :key="item.id">
            // @clickに.preventをつけるとページの最上部にジャンプしない
            <a
              href="#"
              @click.prevent="activate(item.id)"
              :class="{active: active === item.id }"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>

        // activeになるとv-showされる
        <div class="tab__content" v-show="active === 1">
          サイトの情報。サイトの情報。
        </div>
        <div class="tab__content" v-show="active === 2">
          商品情報。商品情報。
        </div>
        <div class="tab__content" v-show="active === 3">
          お問い合わせ。お問い合わせ。
        </div>
      </section>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            active: 1,
            items: [
              { id: 1, title: 'サイトの情報' },
              { id: 2, title: '商品情報' },
              { id: 3, title: 'お問い合わせ' },
            ],
          }
        },
        methods: {
          activate(id) {
            this.active = id
          },
        },
      })
    </script>
  </body>
</html>
```

## 28 transition トランジション（遷移 移り変わり）

- CSS の transition とは別物<br>

- ルールの沿って class が自動で設定<br>

- ルールに合わせて CSS を書くことで楽に作れる<br>

* 参考： https://jp.vuejs.org/v2/guide/transitions.html <br>

- `section02/transition`ディレクトリを作成<br>

- `section02/transition/index.html`を作成<br>

- `section02/transition/app.scss`を作成<br>

```scss:app.scss
.fade {
  &-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: opacity 1s;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: opacity 1s;
    }
  }
}
```

- `section02/transition/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="app.css" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <style>
      .target {
        transition: opacity 1s;
      }

      .target.is-hidden {
        opacity: 0;
      }
    </style>
  </head>

  <body>
    <button id="is-show">JS表示/非表示</button>
    <div id="target" class="target">JS表示されています。</div>
    <div id="app">
      <button @click="isShow = !isShow">Vue表示/非表示</button>
      <transition name="fade">
        <div v-show="isShow">Vue表示されています。</div>
      </transition>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            isShow: false,
          }
        },
      })

      // 素のJavaScript
      const isShow = document.getElementById('is-show')
      const target = document.getElementById('target')

      isShow.addEventListener('click', () => {
        target.classList.toggle('is-hidden')
      })
    </script>
  </body>
</html>
```

## 29 サンプル 2: モーダルウィンドウ

- `section02/modal`ディレクトリを作成<br>

- `section02/modal/app.scss`ファイルを作成<br>

```scss:app.scss
.modal {
  &__inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    padding: 50px;
    background-color: #fff;
    z-index: 2;
    img {
      width: 100%;
    }
  }
  &__close {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    & i {
      font-size: 20px;
      color: #333;
    }
  }
  &__background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
    cursor: pointer;
  }
}

.fade {
  &-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: opacity 0.6s;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: opacity 0.6s;
    }
  }
}
```

- `https://fontawesome.com/`でアカウント登録<br>

* `https://pixabay.com/ja/`で画像をダウンロードする<br>

- `section02/modal/image001.jpg`を配置<br>

* `section02/modal/index.html`を編集<br>

```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="app.css" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js"></script>
    <script
      src="https://kit.fontawesome.com/6eaff71ccc.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <div id="app">
      <button @click="isShow = !isShow">画像を見る</button>

      <transition name="fade">
        <div v-show="isShow">
          <div class="modal__inner">
            <div class="modal__close" @click="isShow = !isShow">
              <i class="fas fa-times"></i>
            </div>
            <img src="image001.jpg" />
          </div>
          <div class="modal__background" @click="isShow = !isShow"></div>
        </div>
      </transition>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            isShow: false,
          }
        },
      })
    </script>
  </body>
</html>
```

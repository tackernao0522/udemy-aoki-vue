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

## 32 サンプル 3: カルーセル

- `section02/carousel`ディレクトリを作成<br>

- `section02/index.html`を作成<br>

- `section02/carousel/images`ディレクトリを作成<br>

- `section02/carousel/images`ディレクトリに各 image ファイルを配置<br>

* `section02/carousel/app.scss`ファイルを作成<br>

```scss:app.scss
.carousel {
  width: 840px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  &__main {
    width: 640px;
    height: 400px;
    margin: 0 auto;
  }
  &__prev {
    position: absolute;
    top: 150px;
    left: 20px;
    cursor: pointer;
    color: lightgray;
    &:hover {
      transition-duration: 0.2s;
      transform: translateX(-10px);
    }
  }
  &__next {
    position: absolute;
    top: 150px;
    right: 20px;
    cursor: pointer;
    color: lightgray;
    &:hover {
      transition-duration: 0.2s;
      transform: translateX(10px);
    }
  }
  &__thumbnails {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    & li {
      cursor: pointer;
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
      &.current {
        opacity: 1;
      }
    }
    & img {
      width: 80px;
    }
  }
}

.active {
  &-enter {
    opacity: 0;
    &-to {
      opacity: 1;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
  &-leave {
    opacity: 1;
    &-to {
      opacity: 0;
    }
    &-active {
      transition: opacity 0.5s;
    }
  }
}
```

- `section02/carousel/index.html`を編集<br>]

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
    <link rel="stylesheet" type="text/css" href="app.css" />
  </head>

  <body>
    <div id="app">
      <section class="carousel">
        <div class="carousel__main">
          <transition name="active">
            <div
              class="carousel__main"
              :key="images[active].id"
              v-show="active === images[active].id"
            >
              <img :src="images[active].img" />
            </div>
          </transition>
        </div>
        <div @click="prev" class="carousel__prev">
          <i class="fas fa-angle-left fa-5x"></i>
        </div>
        <div @click="next" class="carousel__next">
          <i class="fas fa-angle-right fa-5x"></i>
        </div>
        <ul class="carousel__thumbnails">
          <li
            v-for="(image, id) in images"
            :key="image.id"
            :class="{current: active === image.id}"
            @click="current(image.id)"
          >
            <img :src="image.img" />
          </li>
        </ul>
      </section>
    </div>

    <script>
      let app = new Vue({
        el: '#app',
        data() {
          return {
            active: 0,
            images: [
              { id: 0, img: 'images/image000.jpg' },
              { id: 1, img: 'images/image001.jpg' },
              { id: 2, img: 'images/image002.jpg' },
              { id: 3, img: 'images/image003.jpg' },
              { id: 4, img: 'images/image004.jpg' },
              { id: 5, img: 'images/image005.jpg' },
              { id: 6, img: 'images/image006.jpg' },
            ],
          }
        },
        methods: {
          current(id) {
            this.active = id
          },
          prev() {
            if (this.active <= 0) {
              this.active = this.images.length - 1
            } else {
              this.active--
            }
          },
          next() {
            if (this.active >= this.images.length - 1) {
              this.active = 0
            } else {
              this.active++
            }
          },
        },
        mounted() {
          let that = this
          setInterval(() => {
            that.next()
          }, 4000)
        },
      })
    </script>
  </body>
</html>
```

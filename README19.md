# セクション 9: Vuex

## 116 Vuex とは

- 参考: https://vuex.vuejs.org/ja/ <br>

### Vuex OptionsAPI との対応表

| Options API   | Vuex      | Memo          |
| ------------- | --------- | ------------- |
| data          | state     |               |
| computed(get) | getters   |               |
| methods       | mutations | 同期 履歴残る |
| methods       | actions   | 非同期        |

### Vuex の注意

乱用は禁物（かえってわかりづらくなる）<br>

コンポーネント内・・OptionsAPI<br>
親子間のやりとり・・EventUpPropsDown<br>

ContainerComponent・・Vuex 使用<br>
PresentationalComponent・・UI<br>

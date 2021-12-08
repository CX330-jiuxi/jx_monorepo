---
title: 快速上手

nav:
  title: 状态管理
  path: /store
  order: 2
---

### 依赖添加

<Alert type="info">
  当前系统工程通过lerna可直接使用无需下载，但是需要添加依赖
</Alert>

- 当前系统工程

```shell
lerna add @pangu/store --scope=[包名]
```

```ts
// 需要配合ts预编译，支持hmr
import { createStore } from '@pangu/store/src';
```

- 其他系统工程

```shell
yarn add @pangu/store
```

### 使用示例

```tsx
/**
 * title: 示例代码
 * desc: 两个子组件`<Com1 />`、`<Com2 />`按需获取store，按需render
 */
import React, { Dispatch, useReducer } from 'react';
import { createStore } from '@pangu/store/src';

interface IState {
  count1?: number;
  count2?: number;
}

interface IStore extends Required<IState> {
  increase1: Function;
  increase2: Function;
}

const store = createStore<IStore, IState>((initialState) => {
  const [count1, increase1] = useReducer((state) => state + 1, initialState?.count1 ?? 0);
  const [count2, increase2] = useReducer((state) => state + 1, initialState?.count2 ?? 0);

  return {
    count1,
    increase1,
    count2,
    increase2,
  };
});

function Com1() {
  const { count1, increase1 } = store.usePicker(['count1', 'increase1']);
  console.log('Com1 render');
  return (
    <div>
      <span>Com1 count：{count1} </span>
      <button onClick={increase1}>+</button>
    </div>
  );
}

function Com2() {
  const { count2, increase2 } = store.usePicker(['count2', 'increase2']);
  console.log('Com2 render');
  return (
    <div>
      <span>Com2 count：{count2} </span>
      <button onClick={increase2}>+</button>
    </div>
  );
}

export default () => {
  console.log('App render');
  return (
    <store.Provider initialState={{ count1: 1 }}>
      <h1>App</h1>
      <Com1 />
      <Com2 />
    </store.Provider>
  );
};
```

[comment]: <> (<API></API>)

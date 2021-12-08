import { FC, createContext, useContext, useLayoutEffect, useReducer, useRef } from 'react';
import { equalComplex } from '@pangu/tools/src';

export type TUseHooks<Store, State = void> = (initialState?: State) => Store;

export type TSelector<Store, Selected> = (store: Readonly<Store>, pre?: Selected) => Selected;

/**
 * 创建状态管理store
 * 注意：当有Function返回时，由于hooks每次执行会生成新function，可能会导致按需rerender失效
 * 简易使用useReducer返回的dispatch，或者对返回function进行缓存
 * @param useHooks 通过hooks 返回原始store结构
 * @return {Provider, useSelector}
 */
export function createStore<Store, State = void>(useHooks: TUseHooks<Store, State>) {
  // @ts-ignore
  // 生成上下文，禁止context原由rerender行为
  const Context = createContext<Store>(undefined as unknown as Store, () => 0);

  // @ts-ignore
  // 创建数据订阅队列，用于保存使用useSelector组件的更新函数
  const ListenerContext = createContext<Set<(store: Store) => void>>(new Set(), () => 0);

  /**
   * 作用一：抽离context provider包裹，简化使用代码
   * 作用二：当使用store数据更新时，通过useHooks，触发Provider rerender，然后通过数据订阅列表触发使用useSelector 中update（由于Context原由render机制已被禁止）
   * @param initialState store初始化数据支持调用Provider组件时通过props传入
   * @param children
   */
  const Provider: FC<{ initialState?: State }> = ({ initialState, children }) => {
    // 获取store上下文
    const store = useHooks(initialState);
    // 获取订阅列表上下文
    const listeners = useContext(ListenerContext);

    useLayoutEffect(() => {
      // 创建消息通道
      const { port1, port2 } = new MessageChannel();
      // 接受消息
      port1.onmessage = () => {
        listeners.forEach((listener) => listener(store));
      };
      // 发送消息
      port2.postMessage('');
    }, [store, listeners]);

    return (
      <Context.Provider value={store}>
        <ListenerContext.Provider value={listeners}>{children}</ListenerContext.Provider>
      </Context.Provider>
    );
  };

  /**
   * 一：从store中筛选出需要数据
   * 二：注册数据订阅，在筛选出得数据改变时，才触发rerender
   * 三：selector接受第二个参数为上次render数据，直接返回也可阻止render
   * @param selector 数据筛选
   */
  function useSelector<Selected>(selector: TSelector<Store, Selected>): Selected {
    // 强制更新
    const [, forceUpdate] = useReducer(() => ({}), {});

    // 从context获取store
    const store = useContext(Context);

    // 获取数据订阅列表
    const listeners = useContext(ListenerContext);

    // 通过ref保存上次render数据，方便 Effect 依赖为[]时可以访问最新数据，用于新老数据对比，决定是否render
    const lastSelectRef = useRef<{
      store: Store;
      selected: Selected;
      selector: TSelector<Store, Selected>;
    }>();

    // 获取筛选数据
    const selected = selector(store, lastSelectRef.current?.selected);

    // 在所有子组件render后保存本次render数据
    useLayoutEffect(() => {
      lastSelectRef.current = {
        store,
        selector,
        selected: selector(store, lastSelectRef.current?.selected),
      };
    }, [selector]);

    useLayoutEffect(() => {
      /**
       * 数据订阅回调
       * @param newStore 更新后的store 由Provider 调用
       */
      function listener(newStore: Store) {
        //  取出上一次缓存
        const lastSelectData = lastSelectRef.current;

        // 兼容
        if (!lastSelectData) return;

        // 根据selector 获取新数据
        const newSelected = selector(newStore, lastSelectData.selected);

        // 新旧数据（就是context）对比，如果一致则直接返回
        if (lastSelectData.store === newStore) return;
        // 筛选数据对比
        else if (newSelected === lastSelectData.selected) return;
        // 数据生层次对比
        else if (equalComplex(lastSelectData.selected, newSelected)) return;
        // 更新
        else forceUpdate();
      }

      // 注册订阅
      listeners.add(listener);
      return () => {
        // 移除订阅
        listeners.delete(listener);
      };
    }, []);

    // 返回筛选后的数据
    return selected;
  }

  /**
   * 简化useSelector，只需传入索引key
   * @param keys 所需数据的keys
   */
  function usePicker<Key extends keyof Store>(keys: Key[]): Pick<Store, Key> {
    return useSelector((store) => {
      const target = {} as Pick<Store, Key>;
      if (!origin) return target;
      return Object.assign(target, ...keys.map((key) => ({ [key]: store[key] })));
    });
  }

  return { Provider, useSelector, usePicker };
}

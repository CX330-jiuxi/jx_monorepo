import { FC } from 'react';
export declare type TUseHooks<Store, State = void> = (initialState?: State) => Store;
export declare type TSelector<Store, Selected> = (store: Readonly<Store>, pre?: Selected) => Selected;
/**
 * 创建状态管理store
 * 注意：当有Function返回时，由于hooks每次执行会生成新function，可能会导致按需rerender失效
 * 简易使用useReducer返回的dispatch，或者对返回function进行缓存
 * @param useHooks 通过hooks 返回原始store结构
 * @return {Provider, useSelector}
 */
export declare function createStore<Store, State = void>(useHooks: TUseHooks<Store, State>): {
    Provider: FC<{
        initialState?: State | undefined;
    }>;
    useSelector: <Selected>(selector: TSelector<Store, Selected>) => Selected;
    usePicker: <Key extends keyof Store>(keys: Key[]) => Pick<Store, Key>;
};

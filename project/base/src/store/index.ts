import { createStore } from '@jx/store/src';
import useUserInfo, { IUserInfo, IUseUserInfoReturn } from './useUserInfo';

interface IRootInitSate {
  user?: IUserInfo;
}

interface IRootStore extends IUseUserInfoReturn {}

const rootStore = createStore<IRootStore, IRootInitSate>((initialState) => {
  const { user, userDispatch } = useUserInfo(initialState?.user);
  return { user, userDispatch };
});

export default rootStore;

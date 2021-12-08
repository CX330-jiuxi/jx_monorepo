import { Dispatch, useReducer } from 'react';

export interface IUserInfo {
  name?: string;
  age?: number;
  height?: number;
  address?: string;
}

interface IUserAction {
  type: 'update';
  payload: IUserInfo;
}

export interface IUseUserInfoReturn {
  user: IUserInfo;
  userDispatch: Dispatch<IUserAction>;
}

const initialState: IUserInfo = {};

function init(state: IUserInfo): IUserInfo {
  let userInfo = state;
  try {
    userInfo = JSON.parse(sessionStorage.userInfo);
  } catch (e) {}

  return userInfo;
}

function reducer(state: IUserInfo, action: IUserAction): IUserInfo {
  switch (action.type) {
    case 'update':
      sessionStorage.userInfo = JSON.stringify(action.payload);
      return Object.assign({}, state, action.payload);
    default:
      throw new Error();
  }
}

export default function useUserInfo(state?: IUserInfo): IUseUserInfoReturn {
  const [user, userDispatch] = useReducer(reducer, { ...initialState, ...state }, init);

  return { user, userDispatch };
}

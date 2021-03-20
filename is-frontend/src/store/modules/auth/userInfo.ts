import { IReduxState } from '../index';
import { UserResponse } from '../../../models/User';
import { fetchUserData } from '../../../api/userInfo';
import {api} from '../../../api/index';

enum ACTIONS {
  RECEIVE_DATA = 'USERINFO/RECEIVE_DATA',
  REJECT_DATA = 'USERINFO/REJECT_DATA'
}

type GAction<T, U> = {
  type: T;
  payload: U;
};

type Action =
  | GAction<ACTIONS.RECEIVE_DATA, UserResponse>
  | GAction<ACTIONS.REJECT_DATA, undefined>;

interface IUserState {
  data: object | null,
  authenticated: boolean,
}

const initialState: IUserState = {
  data: null,
  authenticated: false,
};


export const fetchUserInfo = (token: string) => async (dispatch: Function) => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  try {
  console.log(api.defaults);

    const data = await fetchUserData(token);
    
    if (!!data) {
      dispatch({
        type: ACTIONS.RECEIVE_DATA,
        payload: data.data
      })
    }
  } catch (err) {
    dispatch({
      type: ACTIONS.REJECT_DATA
    })
  }
}


export default (
  state: IUserState = initialState,
  action: Action
): IUserState => {
  switch (action.type) {
    case ACTIONS.RECEIVE_DATA:
      return {
        ...state,
        data: action.payload,
        authenticated: true
      };
    case ACTIONS.REJECT_DATA:
      return {
        ...state,
        authenticated: false
      };
    default:
      return { ...state };
  }
};

export const userSelector = (state: IReduxState) => state.user.userInfo.data;
export const authenticatedSelector = (state: IReduxState) => state.user.userInfo.authenticated;
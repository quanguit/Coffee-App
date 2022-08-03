import { Dispatch, Reducer, useReducer } from 'react';
import { ActionType, AppType, StateType } from './index.types';

export const initialState: StateType = {
  appLoading: false,
};

const ActionDispatch: Dispatch<ActionType> = () => initialState;

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'App/SetApp':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const useApp = () => {
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    reducer,
    initialState,
  );

  return {
    ...state,
    dispatch,
    setApp: payload => {
      dispatch({ type: 'App/SetApp', payload });
    },
    showAppLoading: () => {
      dispatch({ type: 'App/SetApp', payload: { appLoading: true } });
    },
    hideAppLoading: () => {
      dispatch({ type: 'App/SetApp', payload: { appLoading: false } });
    },
  } as AppType;
};

export const App: AppType = {
  ...initialState,
  dispatch: ActionDispatch,
  setApp: () => undefined,
  showAppLoading: () => undefined,
  hideAppLoading: () => undefined,
};

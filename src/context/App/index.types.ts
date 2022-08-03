import { Dispatch } from 'react';

export type StateType = {
  appLoading: boolean;
};

export type SetAppPayload = Partial<StateType>;
export type SetApp = (payload: SetAppPayload) => void;
export type SetAppAction = {
  type: 'App/SetApp';
  payload: SetAppPayload;
};

export type ActionType = SetAppAction;

export type AppType = StateType & {
  dispatch: Dispatch<ActionType>;
  setApp: SetApp;
  showAppLoading: () => void;
  hideAppLoading: () => void;
};

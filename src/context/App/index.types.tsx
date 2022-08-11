export type AppProps = {
  appLoading: boolean;
};

export type AppType = {
  appLoading: boolean;
  setAppLoading: (app: boolean) => void;
  showAppLoading: () => void;
  hideAppLoading: () => void;
};

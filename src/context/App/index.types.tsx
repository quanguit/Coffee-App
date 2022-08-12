export type AppProps = {
  appLoading: boolean;
};

export type AppType = {
  appLoading: boolean;
  showAppLoading: () => void;
  hideAppLoading: () => void;
};

export type ThemeType = {
  isDark: boolean;
  colors: {
    // Common
    primaryBackground?: string;
    primaryText?: string;
    secondaryBackground?: string;
    secondaryText?: string;
    backgroundColorSpinner?: string;
    labelText?: string;
    textOnColoredSurface?: string;

    primary?: string;
    success?: string;
    successSurface?: string;
    warning?: string;
    danger?: string;
    dangerSurface?: string;
    disabled?: string;
    border?: string;
    divider?: string;
    tableHeaderBackground?: string;

    // Components
    codeInputBorder?: string;
    vaccineInfoBodyBg?: string;
    vaccineInfoBadgeBg?: string;
    vaccineInfoBadgeText?: string;
    scanLogBgExpanded?: string;
    scanQRButtonLabel?: string;
    viewScanLogButtonLabel?: string;
  };
  changeTheme: () => void;
  setIsDark: (isDark: boolean) => void;
};

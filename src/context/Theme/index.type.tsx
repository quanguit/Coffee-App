export type ThemeType = {
  isDark: boolean;
  colors: {
    // Common
    primaryBackground?: string;
    primaryText?: string;
    secondaryBackground?: string;
    secondaryText?: string;
    labelText?: string;
    primary?: string;
    textOnColoredSurface?: string;
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

    // Gradients
    helloUserGradient?: string[];
    scanQRButtonGradient?: string[];
    viewScanLogButtonGradient?: string[];
    disabledButtonGradient?: string[];
    characterAvatarGradient?: string[];
  };
  changeTheme: () => void;
};

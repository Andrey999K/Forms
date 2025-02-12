import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const antdThemeConfig = (currentTheme: 'light' | 'dark') => ({
  algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: currentTheme === 'dark' ? '#e9ecef' : '#fa9145',
    colorTextBase: currentTheme === 'dark' ? '#adb5bd' : '#885028',
    colorBgBase: currentTheme === 'dark' ? '#212529' : '#fdf8f4',
    colorLinkActive: currentTheme === 'dark' ? '#e9ecef' : '#fa9145',
    colorLink: currentTheme === 'dark' ? '#e9ecef' : '#fa9145',
    colorLinkHover: currentTheme === 'dark' ? '#dee2e6' : '#fa9145',
    colorBorder: currentTheme === 'dark' ? '#495057' : '#e9dac5',
  },
});

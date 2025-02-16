import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const antdThemeConfig = (currentTheme: 'light' | 'dark') => ({
  algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: currentTheme === 'dark' ? '#fa9145' : '#fa9145',
    colorTextBase: currentTheme === 'dark' ? '#fdf8f4' : '#885028',
    colorBgBase: currentTheme === 'dark' ? '#1a1a1a' : '#fdf8f4',
    colorLinkActive: currentTheme === 'dark' ? '#fa9145' : '#fa9145',
    colorLink: currentTheme === 'dark' ? '#fa9145' : '#fa9145',
    colorLinkHover: currentTheme === 'dark' ? '#fa9145' : '#fa9145',
    colorBorder: currentTheme === 'dark' ? 'transparent' : '#e9dac5',
  },
});

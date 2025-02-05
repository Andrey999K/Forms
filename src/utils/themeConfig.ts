import { theme as antdTheme } from 'antd';

export const lightThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,

  token: {
    colorPrimary: '#fa9145',
    colorTextBase: '#885028',
    colorBgBase: '#fdf8f4',
    colorLinkActive: '#fa9145',
    colorLinkHover: '#fa9145',
  },
  cssVar: true,
};

export const darkThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,

  token: {
    colorPrimary: '#ff7a45',
    colorTextBase: '#e0e0e0',
    colorBgBase: '#1f1f1f',
    colorLinkActive: '#ffa07a',
    colorLinkHover: '#ffb59a',
  },
  cssVar: true,
};

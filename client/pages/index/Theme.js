import React from 'react';
/**
 * 该文件可作为容器顶端的文件，用于分发各个组件共享的内容, 子组件需要导入ThemeContext
 */

export const themes = {
  light: {
    color: '#0f0',
    background: '#222222',
  },
  dark: {
    color: '#fff',
    background: '#59A3FF',
  },
}
export const ThemeContext = React.createContext(themes.dark);

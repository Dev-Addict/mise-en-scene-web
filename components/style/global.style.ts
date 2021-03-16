import {createGlobalStyle} from 'styled-components';
import {StyledProps} from '../../types';

export const GlobalStyle = createGlobalStyle<StyledProps>`
  * {
    font-family: 'Lalezar', cursive;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${({theme: {foreground}}) => foreground};
    user-select: none;
    transition: all 336ms;
  }

  html, body {
    background-color: ${({theme: {background}}) => background};
    height: 100vh;
  }

  #nprogress .bar {
    background-color: ${({theme: {link}}) => link};
  }

  #nprogress .spinner-icon {
    display: none;
  }
`;

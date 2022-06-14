import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #0d0d0d;
    --bg: #f5f5f5;
    --hover: #3d3d3d;
    --secondary: #f7768e
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #1a1b26;
    --hover: #3d3d3d;
    --secondary: #f7768e
  }
  
  html, body{
    color: var(--fg);
    background-color: var(--bg);
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    /* line-height: 24px */
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'ubuntu', sans-serif;
  }

  a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--secondary);
  text-decoration-thickness: 3px;
  &:hover {
    opacity: 0.6;
  }
  }

  * {
    box-sizing: border-box;
  }

  code {
    font-family: 'Fira Code';
    line-height: normal;
    word-wrap: break-word;

  }
`;

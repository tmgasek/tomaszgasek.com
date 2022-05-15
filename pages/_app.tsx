import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { createGlobalStyle } from 'styled-components';
import Navbar from '../components/navbar';
import Layout from '../components/layout';

const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #0d0d0d;
    --bg: #f5f5f5;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #1B1B1B;
  }
  
  html, body{
    color: var(--fg);
    background-color: var(--bg);
    padding: 0;
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    line-height: 32px;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'IBM Plex Serif', serif;
    line-height: 44px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <Layout>
          <Navbar />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

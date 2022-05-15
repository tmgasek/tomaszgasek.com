import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import { GlobalStyle } from '../utils/globalStyles';
import Navbar from '../components/navbar';
import Layout from '../components/layout';

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

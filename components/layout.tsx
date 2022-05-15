import styled, { css } from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 768px;
  margin: auto;
  padding: 4rem 2rem;
`;

const Layout = ({ children, title }: any) => {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
};

export default Layout;

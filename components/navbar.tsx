import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitch from './themeSwitch';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  a {
    text-transform: uppercase;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Posts',
    href: '/posts',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
];

const LinkItem = ({ href, children, currPath }: any) => {
  const isActive = currPath === href;

  return (
    <Link href={href} passHref>
      <a>
        {children}
        {isActive && <div></div>}
      </a>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();

  return (
    <nav>
      <div>
        <FlexContainer>
          <Link href="/">
            <a>{'{tmg}'}</a>
          </Link>
          <ThemeSwitch />
          <LinkContainer>
            {links.map(({ name, href }) => (
              <LinkItem key={name} href={href} currPath={router.pathname}>
                {name}
              </LinkItem>
            ))}
          </LinkContainer>
        </FlexContainer>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdOutlineNightlight } from 'react-icons/md';
import styled from 'styled-components';

const ThemeButton = styled.button`
  background-color: ${(props) =>
    props.theme === 'dark' ? '#4252686c' : '#dfb2498d'};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.theme === 'dark' ? '#425268' : '#dfb249'};
  }
`;

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <div>
        {resolvedTheme === 'dark' ? (
          <ThemeButton
            theme={resolvedTheme}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <MdOutlineNightlight />
          </ThemeButton>
        ) : (
          <ThemeButton
            theme={resolvedTheme}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <MdOutlineLightMode />
          </ThemeButton>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitch;

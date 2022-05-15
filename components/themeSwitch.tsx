import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdOutlineNightlight } from 'react-icons/md';
import styled from 'styled-components';

const ThemeButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 1rem;
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
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <MdOutlineNightlight />
          </ThemeButton>
        ) : (
          <ThemeButton
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

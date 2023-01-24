import { useEffect, useState } from 'react';
import { ThemeContainer, ToggleButton } from './Theme.style';
import day from 'public/home/day.svg';
import night from 'public/home/night.svg';
import Image from 'next/image';

const Theme = () => {
  //TODO: document.body.dataset.theme으로 setState해야함
  const [themeMode, setThemeMode] = useState<string>('dark');

  useEffect(() => {
    document.body.dataset.theme = themeMode;
    window.localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  const themeModeHandle = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContainer>
      <ToggleButton className={themeMode} onClick={themeModeHandle}>
        {themeMode === 'dark' ? (
          <Image src={night} width={30} height={30}></Image>
        ) : (
          <Image src={day} width={30} height={30}></Image>
        )}
      </ToggleButton>
    </ThemeContainer>
  );
};

export default Theme;

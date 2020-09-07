import * as React from 'react';
import { useColorMode } from '@chakra-ui/core';
import Router from 'next/router';
import { PlusSquare as Add, Moon, Sun } from 'react-feather';

import AppBar from 'components/AppBar';
import NavIconButton from 'components/NavIconButton';
import UserSettingsMenu from 'components/UserSettingsMenu';

export default function Header(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <AppBar as="header">
      <NavIconButton
        aria-label="Add URL"
        onClick={(): void => {
          Router.push('/en/add-url');
        }}
        icon={Add}
      ></NavIconButton>
      <NavIconButton
        onClick={(): void => toggleColorMode()}
        aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
        icon={colorMode === 'light' ? Moon : Sun}
      ></NavIconButton>
      <UserSettingsMenu />
    </AppBar>
  );
}

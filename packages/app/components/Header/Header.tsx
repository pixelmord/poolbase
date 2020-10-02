import * as React from 'react';
import { useColorMode } from '@chakra-ui/core';
import Router from 'next/router';
import { PlusSquare as Add, Moon, Sun, LogOut, Home, Globe, Search } from 'react-feather';

import AppBar from 'components/AppBar';
import NavIconButton from 'components/NavIconButton';
import UserSettingsMenu from 'components/UserSettingsMenu';
import { useSession, useI18n } from 'hooks';

export default function Header(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useSession();
  const { activeLocale } = useI18n();
  const alternativeLocale = activeLocale === 'en' ? 'de' : 'en';
  return (
    <AppBar as="header">
      <NavIconButton
        aria-label="Homepage"
        onClick={(): void => {
          Router.push(`/${activeLocale}`);
        }}
        icon={Home}
      ></NavIconButton>
      <NavIconButton
        aria-label="Search"
        onClick={(): void => {
          Router.push(`/${activeLocale}/search`);
        }}
        icon={Search}
      ></NavIconButton>
      <NavIconButton
        aria-label="Add URL"
        onClick={(): void => {
          Router.push(`/${activeLocale}/add-url`);
        }}
        icon={Add}
      ></NavIconButton>
      <NavIconButton
        aria-label="Switch Language"
        onClick={(): void => {
          Router.push(`/${alternativeLocale}`);
        }}
        icon={Globe}
      ></NavIconButton>
      <NavIconButton
        aria-label="Logout"
        onClick={(): void => {
          logout();
        }}
        icon={LogOut}
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

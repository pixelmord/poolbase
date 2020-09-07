import * as React from 'react';
import { Flex, BoxProps, useColorMode } from '@chakra-ui/core';

export const AppBar: React.FC<BoxProps> = (props: React.PropsWithChildren<BoxProps>) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.500', dark: 'gray.700' };
  return <Flex {...props} direction="column" align="center" justify="center" bg={bgColor[colorMode]} />;
};
export default AppBar;

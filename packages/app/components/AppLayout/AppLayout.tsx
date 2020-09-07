import * as React from 'react';
import { Grid, useColorMode } from '@chakra-ui/core';

export const AppLayout: React.FC = (props: React.PropsWithChildren<{}>) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.200', dark: 'gray.800' };
  return <Grid gap={0} templateColumns={[0, '150px 1fr']} height="100%" bg={bgColor[colorMode]} {...props} />;
};
export default AppLayout;

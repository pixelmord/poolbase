import * as React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';
export const AppMain: React.FC = (props: React.PropsWithChildren<BoxProps>) => (
  <Box {...props} as="main" px={4} style={{ overflowY: 'scroll' }}>
    {props.children}
  </Box>
);
export default AppMain;

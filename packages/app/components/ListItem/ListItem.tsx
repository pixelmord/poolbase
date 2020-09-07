import * as React from 'react';
import { Box, Heading } from '@chakra-ui/core';

import { PageData } from 'lib/types';

export const ListItem: React.FC<{ data: PageData }> = ({
  data,
  ...rest
}: React.PropsWithChildren<{ data: PageData }>) => (
  <Box {...rest}>
    <Heading as="h3">{!data.metaTitle ? data.url : data.metaTitle}</Heading>
  </Box>
);

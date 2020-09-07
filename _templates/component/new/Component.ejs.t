---
to: "<%= h.src() %>/components/<%= name %>/<%= name %>.tsx"
---

import { Box, BoxProps } from '@chakra-ui/core';

export const <%= name %>: React.FC = (props: React.PropsWithChildren<BoxProps>) => <Box {...props} />;
export default <%= name %>;

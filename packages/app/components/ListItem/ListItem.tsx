import * as React from 'react';
import { Box, Badge, Image, Flex } from '@chakra-ui/core';

import { PageData } from 'lib/types';
import NextLink from 'components/NextLink';

export const ListItem: React.FC<{ data: PageData }> = ({
  data,
  ...rest
}: React.PropsWithChildren<{ data: PageData }>) => (
  <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" shadow="md">
    <NextLink href={`/content/${data.id}`}>
      {data.mainImageUrl && data.mainImageUrl.length && (
        <Image src={data.mainImageUrl} alt={data.metaTitle || ''} loading="lazy" />
      )}

      <Box p="6">
        <Box my="1" fontWeight="semibold" as="h4" lineHeight="tight" textDecoration="none">
          {!data.metaTitle ? data.url : data.metaTitle}
        </Box>
        {data.metaKeywords && data.metaKeywords.length && (
          <Flex alignItems="baseline" flexWrap="wrap">
            {data.metaKeywords.map((word, idx) => (
              <Badge key={idx} rounded="full" px="2" m="1" variantColor="teal">
                {word}
              </Badge>
            ))}
          </Flex>
        )}
      </Box>
    </NextLink>
  </Box>
);

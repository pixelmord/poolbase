import { IconButton, IconButtonProps } from '@chakra-ui/core';

export const NavIconButton: React.FC<IconButtonProps> = (props: React.PropsWithChildren<IconButtonProps>) => (
  <IconButton {...props} color="textInverted" width={10} height={10} display="flex" my={1} />
);
export default NavIconButton;

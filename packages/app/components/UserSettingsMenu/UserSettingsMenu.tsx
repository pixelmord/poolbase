import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/core';

import { useAuthUserProfile } from 'hooks';

import UserAccountForm from 'components/UserAccountForm';
import NavIconButton from 'components/NavIconButton';
import Avatar from 'components/Avatar';

export const UserSettingsMenu: React.FC = () => {
  const [user] = useAuthUserProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!user) {
    return null;
  }
  const icon = () => <Avatar user={user.profile} />;
  return (
    <>
      <NavIconButton aria-label="Open User Form" onClick={onOpen} icon={icon} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserAccountForm account={user || {}} />
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UserSettingsMenu;

import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import useChatStore from '@/store/ChatStore';

interface User {
  name: string;
  pic: string;
  email: string;
}

interface UserListItemProps {
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ handleFunction }) => {
  const { user } = useChatStore() as { user: User };

  return (
    <div>
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
      <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
    </div>
  )
};

export default UserListItem;
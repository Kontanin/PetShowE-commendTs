interface User {
  _id: string;
}

interface Message {
  sender: User;
}
interface User {
  _id: string;
  name: string;
}

export const isSameSenderMargin = (
  messages: Message[],
  m: Message,
  i: number,
  userId: string,
): number | 'auto' => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  ) {
    return 0;
  } else {
    return 'auto';
  }
};

export const isSameSender = (
  messages: Message[],
  m: Message,
  i: number,
  userId: string,
): boolean => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: Message[],
  i: number,
  userId: string,
): boolean => {
  return i === messages.length - 1 && messages[i].sender._id !== userId;
};

export const isSameUser = (messages: Message[], m: Message, i: number) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser: User | null, users: User[]): string => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser: User, users: User[]): User => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

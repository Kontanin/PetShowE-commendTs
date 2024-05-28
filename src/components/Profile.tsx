import React from 'react';
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  User,
  user,
  Link,
} from '@nextui-org/react';

export default function Profile() {
  const profile = {
    username: '@tonyreichert',
    fristname: 'Tony',
    lastname: 'Reichert',
    profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  };
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: profile.profilePic,
          }}
          className="transition-transform"
          description={profile.username}
          name={`${profile.fristname} ${profile.lastname}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings">
          <Link href="/myprofile" color="foreground">
            My Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="help_and_feedback">
          <Link href="/help&feedback" color="foreground">
            Help & Feedback
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

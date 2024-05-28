'use client';
import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';

function MyProfile() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['text']));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', '),
    [selectedKeys],
  );

  return (
    <div className="p-6 bg-gray-100 text-center">
      <h6>My Profile</h6>

      <img
        className="w-64 h-64 overflow-hidden mx-auto mb-4 rounded-full shadow-lg"
        src="/mypic.jpg"
      />

      <h3 className="text-xl font-semibold mb-2">Josh do</h3>

      <div className="max-w-40 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
          aria-label="Actions"
          onAction={key => alert(key)}
          className="text-2xl font-semibold text-blue-600 flex flex-col items-start justify-start"
        >
          <ListboxItem key="new">
            <h3 className="text-xl text-left py-2">Information</h3>
          </ListboxItem>
          <ListboxItem key="copy">
            <h3 className="text-xl text-left py-2">My Adress</h3>
          </ListboxItem>
          <ListboxItem key="edit">
            <h3 className="text-xl text-left py-2">My Order</h3>
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}

export default MyProfile;

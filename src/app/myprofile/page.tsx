'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { AddressEdit } from '@/components/MyProfile/AdressEdit';
import { ProfileEdit } from '@/components/MyProfile/ProfileEdit';

function MyProfile() {
  return (
    <div className="p-6 bg-gray-100 w-full bg-black">
      <div className="max-w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Tabs aria-label="Options" isVertical={true}>
          <Tab key="profile" title="profile" className='w-full'>
            <Card>
              <CardBody>
                <ProfileEdit />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Adress" title="Adress">
            <Card>
              <CardBody>
                <AddressEdit />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="MyOrder" title="MyOreder">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyProfile;

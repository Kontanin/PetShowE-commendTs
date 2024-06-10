'use client';
import React from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { AddressEdit } from '@/components/MyProfile/AdressEdit';
import { ProfileEdit } from '@/components/MyProfile/ProfileEdit';

function MyProfile() {
  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <div className="max-w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Tabs aria-label="Options" isVertical={true} className="space-y-4">
          <Tab
            key="profile"
            title="Profile"
            className="w-full text-lg font-bold py-4 px-2"
          >
            <Card>
              <CardBody>
                <ProfileEdit />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="address"
            title="Address"
            className="w-full text-lg font-bold py-4 px-2"
          >
            <Card>
              <CardBody>
                <AddressEdit />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="myOrder"
            title="My Order"
            className="w-full text-lg font-bold py-4 px-2"
          >
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

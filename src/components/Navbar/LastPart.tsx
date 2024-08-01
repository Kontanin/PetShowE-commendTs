import React, { useState, useEffect } from 'react';
import {
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
} from '@nextui-org/react';
import { BsBag } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import Cookies from 'js-cookie';
import CartOrder from '@/components/CartIcon/CartOrder';
import { UserStore } from '@/store/UserStore';
import { CartStore } from '@/store/CartStore';

export default function Lastpart() {
  const Order = CartStore(state => state.cart);
  const { isAuthenticated, setIsAuthenticated, role, firstName } = UserStore();
  const [permissions, setPermissions] = useState(false);
  useEffect(() => {
    if (isAuthenticated && role == 'admin') {
      setPermissions(true);
    }
  }, [role, permissions, isAuthenticated]);
  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('token'); // Assuming 'token' is the name of your authentication cookie
    // Optionally redirect the user after logout
    window.location.href = '/';
  };

  return (
    <NavbarContent justify="end">
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button className="bg-orange-500 rounded-full p-2">
            <Badge
              content={Order.length}
              color="primary"
              placement="bottom-right"
            >
              <BsBag size={25} />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Link href="/cart">Buy Now</Link>
          <CartOrder />
        </PopoverContent>
      </Popover>

      {isAuthenticated ? (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button className="flex items-center space-x-2 bg-transparent hover:bg-gray-200 rounded-full p-2">
              <FaUserCircle size={30} className="text-gray-700" />
              <span className="hidden lg:inline text-gray-700">
                {firstName}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <Link
              href="/myprofile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              My Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Settings
            </Link>
            <Link
              href="/help&feedback"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              help&feedback
            </Link>
            {permissions && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                admin
              </Link>
            )}
            <p
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Logout
            </p>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center space-x-4">
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/login  "
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </NavbarItem>
          <Button
            as={Link}
            href="/signup"
            className="bg-yellow-500 text-black hover:bg-yellow-600 rounded-full px-4 py-2"
          >
            Sign Up
          </Button>
        </div>
      )}
    </NavbarContent>
  );
}

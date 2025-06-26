import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppWindow, Menu, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  // Simple state to toggle between logged-in and logged-out views for demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClasses}>
        Home
      </NavLink>
      <NavLink to="/app-listing" className={navLinkClasses}>
        Apps
      </NavLink>
      <NavLink to="/app-listing?category=games" className={navLinkClasses}>
        Games
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <div className="md:hidden mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80">
                <Link to="/" className="flex items-center gap-2 mb-6">
                    <AppWindow className="h-6 w-6" />
                    <span className="font-bold text-lg">Storefront Mirror</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg">
                    {navLinks}
                </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo and Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
                <AppWindow className="h-6 w-6" />
                <span className="font-bold">Storefront Mirror</span>
            </Link>
            <nav className="flex items-center gap-6">
                {navLinks}
            </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search apps & games..."
              className="w-full pl-10"
            />
          </div>
        </div>

        {/* User Auth */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    m@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/user-profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to="/authentication">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
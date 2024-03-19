"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white mr-4">♟ Chess Tactics</div>
      </div>

      <div className="text-white">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/login">Sign in</Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;

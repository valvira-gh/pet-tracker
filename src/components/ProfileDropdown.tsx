import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export const ProfileDropdown = async () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href={"/profile"}>
          <Image
            src="/user.png"
            alt="profile icon"
            width={40}
            height={20}
            className="text-white mt-2"
          />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/user/profile"}>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/user/auth"} className="font-bold">
            Log In
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user/log-out"} className="font-bold">
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

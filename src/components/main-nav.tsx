import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pets", label: "Pets" },
  { href: "/profile", label: "Profile" },
];

// "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

const MainNav = () => {
  return (
    <nav className=" mt-4 flex space-x-4 items-start">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xl font-sans antialiased text-white font-medium border px-4 py-2 rounded-md hover:text-white/50 hover:bg-green-600"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;

import Link from "next/link";

const category = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "framer",
    path: "/framer",
  },
  {
    title: "hook-form",
    path: "/hook-form",
  },
  {
    title: "table",
    path: "/table",
  },
];

const Navbar = () => {
  return (
    <nav className="flex items-center h-10 bg-white gap-5 ">
      {category.map(({ title, path }) => (
        <Link href={path}>{title}</Link>
      ))}
    </nav>
  );
};

export default Navbar;

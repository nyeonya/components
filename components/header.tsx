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
];

const Navbar = () => {
  return (
    <nav className="h-10 bg-white">
      {category.map(({ title, path }) => (
        <Link href={path}>{title}</Link>
      ))}
    </nav>
  );
};

export default Navbar;

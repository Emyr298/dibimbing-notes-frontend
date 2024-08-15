import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="w-full p-3 bg-primary shadow-md">
      <Link href="/" className="font-bold text-xl">
        Notes<span className="text-white">App</span>
      </Link>
    </div>
  );
};

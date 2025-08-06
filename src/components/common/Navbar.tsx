"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
const Navbar = () => {
  const pathname = usePathname();
// gvMUAr  p-4  shadow-md 
  return (
    <nav 
    // className=" p-4 !absolute top-0 w-full "
    className={cn(
          pathname.includes('products') ? "gvMUAr bg-white  p-4  shadow-md" : "p-4 !absolute top-0 w-full"
        )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-gray-700 font-bold"></h1>
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded-md transition text-gray-700 ${
               pathname.includes('/')
                ? 'bg-white font-semibold text-gray-700'
                : 'hover:bg-blue-700 '
            }`}
          >
            Tic Tac Toe
          </Link>
          <Link
            href="/products/list"
            className={`px-4 py-2 rounded-md transition text-gray-700 ${
              pathname.includes('products')
                ? 'bg-blue-800 font-semibold text-white'
                : 'hover:bg-blue-700 '
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
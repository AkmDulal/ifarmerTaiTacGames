import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex space-x-4">
        <Link 
          href="/tic-tac-toe" 
          className={`px-4 py-2 rounded-md ${pathname?.startsWith('/tic-tac-toe') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          Tic Tac Toe
        </Link>
        <Link 
          href="/products" 
          className={`px-4 py-2 rounded-md ${pathname?.startsWith('/products') ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
        >
          products
        </Link>
      </div>
    </nav>
  )
}
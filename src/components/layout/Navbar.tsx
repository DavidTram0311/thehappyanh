import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full py-8 px-6 md:px-12 flex justify-between items-center z-10 relative">
      <div className="flex items-center">
        <Link href="/" className="text-4xl md:text-5xl font-extrabold text-[#4A5D1D] hover:opacity-80 transition-opacity">
          A
        </Link>
      </div>
      <div className="flex gap-6 md:gap-12 text-[#4A5D1D] font-medium text-lg">
        <Link href="#" className="hover:opacity-70 transition-opacity">
          about me
        </Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">
          blogs
        </Link>
        <Link href="#" className="hover:opacity-70 transition-opacity">
          contact me
        </Link>
      </div>
    </nav>
  );
}

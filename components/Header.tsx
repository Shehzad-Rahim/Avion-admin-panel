import Link from "next/link"


const navLinks = [
    { label : 'Home', href: '/'},
    { label : 'Analytics', href: '/admin/analytics'},
    { label : 'Orders', href: '/admin/orders'},
    { label : 'Users', href: '/admin/users'},
]
function Header() {
  return (
    <div className='flex flex-wrap justify-between items-center gap-5 py-5 px-20 border-b border-black bg-[#2a254b] text-white'>
        <h1 className="text-2xl font-semibold">Avion</h1>
        <p className="font-semibold md:ml-40">Checkout the Navigation Links</p>
        <ul className="flex justify-center gap-6">
            {navLinks.map((link , i) => (
                <li className="hover:underline" key={i}>
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Header
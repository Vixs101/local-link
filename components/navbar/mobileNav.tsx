import Link from "next/link"
import { Home, ShoppingCart, History, MessageCircle, User } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="grid h-16 grid-cols-5 items-center">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/orders", icon: ShoppingCart, label: "Orders" },
          { href: "/history", icon: History, label: "History" },
          { href: "/support", icon: MessageCircle, label: "Support" },
          { href: "/profile", icon: User, label: "Profile" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center text-sm"
          >
            <item.icon className="h-5 w-5 text-[#007BFF]" />
            <span className="text-[#007BFF]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}


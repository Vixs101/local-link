import React from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'

export default function DesktopNav() {
    return (
        // Desktop Navbar
        <header className="sticky top-0 z-50 w-full border-b bg-white px-5 md:px-28">
            <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007BFF]">
                            <span className="text-xl font-bold text-white">L</span>
                        </div>
                        <span className="text-xl font-semibold">LocalLink</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4 ml-auto">
                    <div className='hidden md:flex gap-4'>
                        <Link href="/" className="text-[#007BFF] font-semibold">
                            Products
                        </Link>
                        <Link href="/orders" className="text-[#007BFF] font-semibold">
                            Orders
                        </Link>
                        <Link href="/support" className="text-[#007BFF] font-semibold">
                            Support
                        </Link>
                        <Link href="/history" className="text-[#007BFF] font-semibold">
                            History
                        </Link>
                        <Link href="/profile" className="text-[#007BFF] font-semibold">
                            Profile
                        </Link>
                    </div>
                    <Button className='bg-[#007BFF] hover:bg-[#007BFF]/90'>Connect Wallet</Button>
                </div>
            </div>
        </header>
    )
}

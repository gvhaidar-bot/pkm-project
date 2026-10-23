import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../NavLink'

const Navbar = () => {
    return (
        <>
            <div className='w-full relative top-0 z-20 bg-green-500 shadow-md'>
                <div className='flex flex-wrap justify-between items-center p-4 mx-auto max-w-7xl'>
                    <Link href="/">
                        <Image src="/Hogwarts.jpg" alt="Logo" width={100} height={100} />
                    </Link>
                    <NavLink />
                </div>
            </div>
        </>

    )
}

export default Navbar
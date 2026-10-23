"use client";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const NavLink = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(!open)} className="inline-flex items-center p-2 justify-center text-sm text-gray-600 rounded-md md:hidden  hover:bg-gray-100" >
                {!open ? <IoMenu size={30} /> : <IoClose size={30} />}
            </button>

            <div className={clsx("w-full  md:block  md:w-auto", {
                hidden: !open,
            })}>
                <ul className="flex flex-col bg-white  gap-4 text-sm space-y-4 rounded-2xl shadow-xl p-4">
                    <li>
                        <Link href="/" className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                            Beranda
                        </Link>
                    </li>
                    <li>
                        <Link href="/tentang" className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                            Profil

                        </Link>
                    </li>
                    <li className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                        <Link href="/layanan">
                            Program
                        </Link>
                    </li>
                    <li className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                        <Link href="/galeri">
                            Galeri
                        </Link>
                    </li>
                    <li className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                        <Link href="/berita">
                            Berita
                        </Link>
                    </li>
                    <li className="hover:text-green-500 hover:bg-green-200 block p-2 rounded-lg">
                        <Link href="/kontak">
                            Kontak
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavLink
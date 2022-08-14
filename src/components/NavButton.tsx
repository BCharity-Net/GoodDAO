import React, { JSXElementConstructor } from 'react'
import Link from 'next/link'

type Props = {
    link:string,
    text:string
}


export default function NavButton({ link, text }: Props) {
    return (
        <button className='bg-purple py-1.5 px-5 rounded-2xl my-1 mx-4 hover:bg-[#e0e0e0]'>
            <li>
                <Link href={link}>{text}</Link>
            </li>
        </button>
    )
}
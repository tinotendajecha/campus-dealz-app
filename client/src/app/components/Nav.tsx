import React from 'react';
import Link from 'next/link'

const Nav = () => {
  return (
    <div>
        <ul>
            <li>
                <Link href='/home'>Home</Link>
            </li>
            <li>
                <Link href='/products'>Products</Link>
            </li>
        </ul>
    </div>
  )
}

export default Nav
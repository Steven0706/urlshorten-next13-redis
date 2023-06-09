
import Link from 'next/link';
import Image from "next/image";

import './globals.css'


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <nav className='flex-between w-full mb-16 pt-3'>
              <Link href='/' className='flex gap-2 flex-center'>
                <Image
                  src='/assets/images/logo.png'
                  alt='logo'
                  width={30}
                  height={30}
                  className='object-contain'
                />
                <p className='logo_text'>Shrinkly</p>
              </Link>

              {/* Desktop Navigation */}
              <div className='sm:flex hidden'>
                <div className='flex gap-3 md:gap-5'>
                  <Link href='/urls' className='black_btn'>
                    Create
                  </Link>
                </div>
              </div>

            </nav>
            {children}
          </main>

        </main>
      </body>
    </html>
  )
}

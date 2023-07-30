import '../styles/globals.css'
import type { Metadata } from 'next'
import { Roboto, Bebas_Neue } from 'next/font/google'
import Image from 'next/image'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'

});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue'
});

export const metadata: Metadata = {
  title: 'Test Frontend',
  description: 'Teste Técnico Dinheirow',
  icons: {
    icon: '/marvel-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${bebasNeue.variable} ${roboto.variable} font-sans text-slate-100 selection:text-red-600`}>
        <nav className="w-full h-20 bg-neutral-950 flex justify-between items-center px-48" >
          <Image
            src="/marvel-logo.svg"
            width={125}
            height={50}
            alt="Logo Marvel"
          />
        </nav>
        <div className='h-0.5 bg-neutral-600 w-auto' />
        {children}
      </body>
    </html >
  );
}

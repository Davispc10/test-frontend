import Image from 'next/image'
import Logo from '../components/logo'
import ReactDOMServer from 'react-dom/server'
const logoDataURL = `data:image/svg+xml;base64,${Buffer.from(
  ReactDOMServer.renderToString(<Logo />)
).toString('base64')}`

function Header() {
  return (
    <>
      <div className="w-full border-y border-black mb-[30px] shadow-md bg-[#e92228]">
        <Image
          className="m-auto w-[150px] h-[70px]"
          src={logoDataURL}
          width={150}
          height={70}
          priority={true}
          alt="marvel logo"
        />
      </div>
    </>
  )
}

export default Header

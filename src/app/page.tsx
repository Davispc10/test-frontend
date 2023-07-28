import Image from 'next/image'
import Header from './homePage/header/header'
import Main from './homePage/main/main'
import Footer from './homePage/footer/footer'

export default function Home() {
  return (
    <div className="grid w-screen h-screen items-center bg-image-marvel bg-repeat">
      <Header />
      <Main />
    </div>
  )
}

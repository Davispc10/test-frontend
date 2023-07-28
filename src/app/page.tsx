import Header from './homePage/header/header'
import Main from './homePage/main/main'

export default function Home() {
  return (
    <div className="grid w-screen h-screen items-center bg-image-marvel bg-repeat">
      <Header />
      <Main />
    </div>
  )
}

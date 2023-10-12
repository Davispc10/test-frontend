import Image from "next/image"
import marvel_logo from "@/assets/Marvel_Logo.svg"

const Header = () => {
    return(
        <section>
            <header className="relative bg-gray-900 w-full items-center flex h-24">
                <div className="flex items-center justify-between w-full mx-auto">
                    <div className="px-14 flex flex-1 items-center justify-between">
                        <div className="text-white">
                            <Image src={marvel_logo} alt="marvel logo" width={150} height={150}/>
                        </div>
                    </div>
                </div>
            </header>
            <div className="w-full bg-gray-600 h-10 bottom-0">

            </div>
        </section>
    )
}

export default Header
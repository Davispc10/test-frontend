import Image, { StaticImageData } from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

type HeroData = {
    id: number,
    name: string,
    img: string
}

const HeroCard = ({id, name, img} : HeroData) => {
    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
        >
            <Link href={{pathname: "/todos/[id]", query: {id: id}}}>
                <div className="items-center rounded-xl p-2 bg-white">
                    <div className="align-middle">
                        <Image 
                            className="w-full h-full rounded-t-2xl" 
                            src={img} 
                            width={192} 
                            height={240} 
                            alt="Hero Image"
                            />
                            <div className="sticky text-white text-center height-[100px] uppercase bg-black">
                                <p className="">{name}</p>
                            </div>                   
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default HeroCard
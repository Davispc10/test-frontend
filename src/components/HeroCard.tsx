import Image, { StaticImageData } from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

type HeroData = {
    id: number,
    name: string,
    img: string,
    extension: string
}

const HeroCard = ({id, name, img, extension} : HeroData) => {
    console.log(img)
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
                <div className="items-center rounded-xl w-48 h-60 p-2 overflow-hidden bg-white">
                    <div className="align-middle">
                        <Image 
                            className="h-full w-full rounded-t-2xl" 
                            src={img} 
                            width={192} 
                            height={240} 
                            alt="Hero Image"
                            />
                            <div className="sticky text-white text-center height-[150px] bottom-5 uppercase bg-black/60">
                                <p className="">{name}</p>
                            </div>                   
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default HeroCard
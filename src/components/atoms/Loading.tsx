'use client'

import Image from 'next/image'
import Load from 'public/assets/load.gif'

const Loading = () => {
	return (
        <div className="w-vw-100 h-vh-100 bg-black-60 -mt-[1rem] fixed">
            <Image src={Load} width={50} height={50} alt="Loading" className='m-auto top-[40%] relative' />
        </div>
	)
}

export default Loading


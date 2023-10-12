import HeroDetails from '@/components/HeroDetails'
import { useRouter, useParams } from 'next/navigation'

const Page = () => {
    const params = useParams()
    console.log(params)
    if (!params?.heroId) return
    
    return (
        <h1>
            <HeroDetails id={Number(params.heroId)} />
        </h1>
    )
}

export default Page
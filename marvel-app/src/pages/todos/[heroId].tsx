import HeroDetails from '@/components/HeroDetails'
import { useRouter, useParams } from 'next/navigation'

const Page = () => {
    const params = useParams()
    console.log("params : ", params)
    if (!params) return null
    console.log("params")
    return (
        <h1>
            <HeroDetails id={params.id} />
        </h1>
    )
}

export default Page
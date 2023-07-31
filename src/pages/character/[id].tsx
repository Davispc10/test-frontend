import { Template } from '@/components/templates'

interface IDetailPage {
  id: number
}

export default function DetailPage({ id }: IDetailPage) {
  const idCharacter = Number(id)

  return (
    <>
      <Template.MainDetail id={idCharacter} />
    </>
  )
}

export const getServerSideProps = (context: { query: { id: string } }) => {
  const { id } = context.query

  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      id,
    },
  }
}

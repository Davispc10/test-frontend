import Image from 'next/image'

export type ComicProps = {
  title: string;
  format: string;
  thumbnail: string;
}

const Comic = ({ title, format, thumbnail }: ComicProps) => (
  <div className="comic">
    <Image
        src={thumbnail}
        alt={title}
        priority
        fill
      />

    <div className="comic-info">
      <h2>{title}</h2>
      <p>Format: {format}</p>
    </div>
  </div>
)

export default Comic

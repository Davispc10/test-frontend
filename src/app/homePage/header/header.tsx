export default function Header() {
  const logo = `/Marvel-Logo.png`;

  return (
    <div className="fixed bg-gray-700 h-12 top-0 w-full">
      <div className="grid w-full h-full items-center justify-items-center justify-content-center">
        <img
            src= {logo}
            alt=''
            className='relative object-cover w-24 h-full rounded-t-lg top-6'
        />
      </div>
    </div>
  )
}

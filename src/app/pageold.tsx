import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <header className="text-3xl font-bold mb-8">
        <h1>Marvel Heroes</h1>
      </header>

      <div className="flex items-center justify-center w-full mb-8">
        <input
          type="text"
          placeholder="Pesquisar por nome do herói"
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Pesquisar
        </button>
      </div>

      {/* Cards dos Heróis (placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="border rounded-md p-4">
          <Image
            src="/downloadmarvel.png"
            alt="Hero Image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-xl font-semibold">Hero Name</p>
        </div>
        <div className="border rounded-md p-4">
          <Image
            src="/downloadmarvel.png"
            alt="Hero Image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-xl font-semibold">Hero Name</p>
        </div>
        <div className="border rounded-md p-4">
          <Image
            src="/downloadmarvel.png"
            alt="Hero Image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-xl font-semibold">Hero Name</p>
        </div>
        <div className="border rounded-md p-4">
          <Image
            src="/downloadmarvel.png"
            alt="Hero Image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-xl font-semibold">Hero Name</p>
        </div>
        <div className="border rounded-md p-4">
          <Image
            src="/downloadmarvel.png"
            alt="Hero Image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-xl font-semibold">Hero Name</p>
        </div>

      </div>

      {/* Paginação (opcional, depende da API Marvel) */}
      {/* Aqui você pode implementar a paginação, mas como é um exemplo básico, deixaremos vazio */}
      <footer>
        D. Feuser - 2023
      </footer>
    </main>
  );
}
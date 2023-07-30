export function Footer(){
    return (
        <footer className="flex justify-between gap-4 border-t-2 border-t-zinc-700 bg-zinc-900 px-16 py-8 sm:flex-col sm:items-center sm:p-8">
      <div className="flex flex-col sm:text-center">
        <a href="https://yuri-monteiro-portfolio.vercel.app/" className="mb-2 font-alt text-4xl font-bold uppercase text-white sm:text-3xl">
        {"<Yuri Monteiro/>"}
        </a>
        <span className="">Yuri Monteiro© 2023.</span>
        <span className="">Todos os direitos reservados</span>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-alt text-2xl font-bold text-white">Pages</h1>
        <a href="/" className="hover:opacity-80">
          Home
        </a>
        <a href="/characters/pages/1" className="hover:opacity-80">
          Characters
        </a>
        <a href="https://github.com/YuriMont/test-frontend" className="hover:opacity-80">
          Credits
        </a>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-alt text-2xl font-bold text-white">Socials</h1>
        <span className="flex flex-col items-center justify-center">
          <a
            href="https://www.linkedin.com/in/yuri-monteiro-5b6b48205/"
            className="text-center transition-colors hover:opacity-70"
          >
            Linkedin
          </a>

          <a
            href="https://github.com/YuriMont"
            className="text-center transition-colors hover:opacity-70"
          >
            Github
          </a>

          <a
            href="https://t.me/yuri_monteiro1043"
            className="text-center transition-colors hover:opacity-70"
          >
            Telegram
          </a>
        </span>
      </div>
    </footer>
    );
}
import Image from 'next/image';
import Logo from '../components/logo';
import ReactDOMServer from 'react-dom/server';
const logoDataURL = `data:image/svg+xml;base64,${Buffer.from(ReactDOMServer.renderToString(<Logo />)).toString('base64')}`;

function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className="">
			<div className="w-full border-y border-black mb-[30px] shadow-md bg-[#e92228]">
				<Image
					className="m-auto w-[150px] h-[70px]"
					src={logoDataURL}
					width={150}
					height={70}
					priority={true}
					alt="marvel logo"
				/>
			</div>
			<div>{children}</div>
			<footer className="text-sm text-center py-1">
				D. Feuser - 2023
			</footer>
		</div>
	);
}

export default Layout;

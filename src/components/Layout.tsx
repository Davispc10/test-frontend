import Image from 'next/image';
import Link from 'next/link';
function Layout({ children }: React.PropsWithChildren) {
	return (
		<div>
		
			<div className="w-full border-y border-black mb-[30px] shadow-md">
				<Image
					className="m-auto w-auto h-auto"
					src="/images/logo.png"
					width={120}
					height={100}
					alt="marvel logo"
					priority
				/>
				<div className="flex w-1/2 m-auto justify-evenly p-[8px]">
					<Link className="text-lg " href="/" rel="preload">
						Home
					</Link>
					<Link className="text-lg" href="/favorites" rel="preload">
						Favorites
					</Link>
				</div>
			</div>
			<div className="w-[80%] mx-auto border border-black">{children}</div>
		</div>
	);
}

export default Layout;

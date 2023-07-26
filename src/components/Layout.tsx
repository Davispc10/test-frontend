import Image from 'next/image';
function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className="">
			<div className="w-full border-y border-black mb-[30px] shadow-md">
				<Image
					className="m-auto"
					src="/images/logo.png"
					width={150}
					height={100}
					alt="marvel logo"
				/>
				<div className="flex w-1/2 m-auto justify-evenly p-[8px]">
					<a className="text-lg " href="/">
						Home
					</a>
					<a className="text-lg" href="/favorites">
						Favorites
					</a>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
}

export default Layout;

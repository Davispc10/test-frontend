import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className="">			
			<Header></Header>
			{children}
			<Footer></Footer>
		</div>
	);
}

export default Layout;

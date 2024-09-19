import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<header className="fixed top-0 left-0 w-full bg-slate-50 shadow-md z-50">
			<nav className="container mx-auto p-4 flex items-center justify-between flex-wrap">
				<div className="text-xl font-bold">
					<Link to="/">Sensor Chadboard</Link>
				</div>
				<ul className="hidden md:flex space-x-4">
					<Link to="/sensors">Sensor Data</Link>
					<Link to="/stats">Stats</Link>
				</ul>
			</nav>
		</header>
	);
};

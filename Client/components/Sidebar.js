import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useState } from 'react';
import { FaTools } from 'react-icons/fa';


const Sidebar = () => {
	const [submenuOpen, setSubmenuOpen] = useState(false);


	const menus = [
		{
			title: 'Tools',
			submenu: true,
			href: '',
			submenuItems: [
				{
					title: "Auto Description",
					href: 'http://localhost:8000/tools/autodescription'
				}
			],
		},
		{
			title: 'Settings',
			href: 'http://localhost:8000/settings'
		},
		{
			title: 'About',
			href: 'http://localhost:8000/about'
		}
	]

	return (

		<div className="flex">

			<div className={`bg-slate-600 h-screen p-5 pt-8 w-72 duration-300 relative`}>


				<div className="inline-flex">
					<FaTools className="text-white text-4xl rounded cursor-pointer block float-left mr-2" />
					<h1 className={`text-white origin-left font-medium text-2xl duration-300 "scale-0"`}>Technical Panel</h1>
				</div>

				<div className={`flex items-center rounded-md bg-light-white mt-6 px-4 py-2`}>

					<BsSearch className={`text-white text-lg block float-left cursor-pointer mr-2`} />

					<input type={"search"} placeholder="Search" className={`text-base bg-transparent w-full text-white focus:outline-none "hidden"`} />
				</div>

				<ul className="pt-2">
					{menus.map((menu, index) => (
						<>
							<li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
								<span><a href={`${menu.href}`}>{menu.title}</a></span>

								{menu.submenu && (
									<BsChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => { setSubmenuOpen(!submenuOpen) }} />
								)}
							</li>
							{menu.submenu && submenuOpen && (
								<ul>
									{menu.submenuItems.map((submenuItem, index) => (
										<li key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md mt-2">
											<a href={`${submenuItem.href}`}>{submenuItem.title}</a>
										</li>
									))}
								</ul>
							)}
						</>
					))}
				</ul>


			</div>
		</div>
	)
}

export default Sidebar;
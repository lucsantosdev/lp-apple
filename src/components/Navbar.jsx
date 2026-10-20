import { appleImg, searchImg, bagImg } from '../utils'
import { navLists } from '../constants'

export default function Navbar() {
  return (
    <header className="w-full py-5 px-5 sm:px-10 flex justify-between items-center">
        <nav className="flex w-full screen-max-width" aria-label="Main">
            <a href="#" aria-label="Apple">
                <img src={appleImg} alt="" width={14} height={18} />
            </a>
            <ul className="flex flex-1 justify-center max-sm:hidden">
                {navLists.map((nav) => (
                    <li key={nav}>
                        <a
                          href="#"
                          className="block px-5 text-sm text-gray hover:text-white transition-all"
                        >
                            {nav}
                        </a>
                    </li>
                ))}
            </ul>
            {/* purely illustrative icons, no action on purpose */}
            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                <img src={searchImg} alt="Search" width={18} height={18} />
                <img src={bagImg} alt="Shopping Bag" width={18} height={18} />
            </div>
        </nav>
    </header>
  )
}

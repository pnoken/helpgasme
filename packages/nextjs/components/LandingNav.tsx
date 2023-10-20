import { SwitchTheme } from "~~/components/SwitchTheme";

export const LandingNav = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">

                <a className="btn btn-ghost normal-case text-xl">Stake4Fun</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <li><a href="#how-it-works">How it works</a></li>
                    <li><a href="#mission">Mission</a></li>
                    <li><a href="#faq">FAQ</a></li>

                </ul>
            </div>

            <div className="navbar-end">

                <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">

                    <SwitchTheme className="pointer-events-auto" />
                </div>
                <a className="btn" href="/dapp" target="_blank">Launch App</a>
            </div>
        </div>
    )
}
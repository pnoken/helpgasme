import Link from "next/link";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {

  return (
    <div className="sticky lg:static top-0 navbar bg-primary min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">

        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">

          <div className="flex flex-col">
            <span className="font-bold leading-tight">Stake4Fun</span>
            <span className="text-xs">Decentralized Staking App</span>
          </div>
        </Link>

      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />

      </div>
    </div>
  );
};

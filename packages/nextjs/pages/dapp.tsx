import type { NextPage } from "next";
import { Header } from "~~/components/Header";
import { MetaHeader } from "~~/components/MetaHeader";
import Stakings from "~~/components/Transactions";
import { StakeContractInteraction } from "~~/components/stake";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const StakerUI: NextPage = () => {
  const { data: StakerContract } = useDeployedContractInfo("Staker");
  return (
    <>
      <Header />

      <MetaHeader />
      <div className="flex">
        <div className="md:block hidden overflow-y-scroll min-h-full bg-gray-100 md:w-1/4">
          <div className="grid card bg-white rounded-box p-4 m-4">
            <div className="gap-4 flex flex-col">
              <h3>Polygon</h3>
              <h3 className="bg-gray-200 rounded-box p-4">Staking</h3>
              <h3 className="bg-gray-200 rounded-box p-4">Swap</h3>
              <h3 className="bg-gray-200 rounded-box p-4">Borrow</h3>
              <h3 className="bg-gray-200 rounded-box p-4">Gas Request</h3>
            </div>
          </div>


        </div>


        <div className="md:w-3/4 w-full bg-gray-100">
          <StakeContractInteraction key={StakerContract?.address} address={StakerContract?.address} />


          <Stakings />
        </div>
      </div>

    </>
  );
};

export default StakerUI;

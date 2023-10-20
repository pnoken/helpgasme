import React, { useState } from "react";
import { Address, Balance } from "../scaffold-eth";
import { ETHToPrice } from "./EthToPrice";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import {
  useAccountBalance,
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

export const StakeContractInteraction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: StakerContract } = useDeployedContractInfo("Staker");
  const { data: ExternalContact } = useDeployedContractInfo("ExternalContract");
  const { balance: stakerContractBalance } = useAccountBalance(StakerContract?.address);
  const { balance: externalContractBalance } = useAccountBalance(ExternalContact?.address);
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);


  const configuredNetwork = getTargetNetwork();

  const [amount, setAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('stake');

  // Contract Read Actions
  const { data: threshold } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "threshold",
    watch: true,
  });

  const { data: apy } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "apy",
    watch: true,
  });

  const { data: rewards } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "userRewardPerTokenPaid",
    args: [connectedAddress],
    watch: true,
  });

  // const { data: eatimatedEarnings } = useScaffoldContractRead({
  //   contractName: "Staker",
  //   functionName: "calculateEarnings",
  //   args: [amount, 20000],
  //   watch: true,
  // });

  const { data: myStake } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "balances",
    args: [connectedAddress],
    watch: true,
  });

  const { data: isOpenForWithdraw } = useScaffoldContractRead({
    contractName: "Staker",
    functionName: "openForWithdraw",
    watch: true,
  });

  // Contract Write Actions
  // const { writeAsync: stakeETH } = useScaffoldContractWrite({
  //   contractName: "Staker",
  //   functionName: "stake",
  //   value: amount.toString(),
  // });

  const { writeAsync: execute } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "execute",
  });

  const { writeAsync: withdrawETH } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "withdraw",
    args: [myStake],
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  return (
    <div className="flex items-center flex-col flex-grow w-full bg-gray-100 px-4 gap-12">
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card bg-white rounded-box p-4 mt-4">
          <div className="flex justify-between">
            <h3>Annual Staking Rewards</h3>
            <h3>{apy ? (formatEther(apy)) * 10e15 + "%" : ""}</h3>
          </div>

          <div className="flex justify-between">
            <h3>Total matic Staked</h3>
            <div className="flex space-x-2">
              {<ETHToPrice value={stakerContractBalance != null ? stakerContractBalance.toString() : undefined} />} |
              <h3 className="text-sm mt-1">${stakerContractBalance != null && (nativeCurrencyPrice * stakerContractBalance).toFixed(3)}</h3>

            </div>
          </div>
        </div>


      </div>

      <div className="flex justify-end w-full items-center">

        <div className="flex">
          <p className="block font-semibold">Contract:</p>
          <Address address={address} size="xl" />
        </div>
      </div>
      {/* <Countdown /> */}
      <div
        className={`flex flex-col items-center bg-white shadow-lg shadow-secondary border-secondary rounded-xl p-6 w-full md:w-2/3`}
      >

        <div className="form-control w-full">
          <div className="tabs">
            <a className={`tab tab-lifted ${activeTab === 'stake' ? 'tab-active' : ''}`} onClick={() => handleTabClick('stake')}>Stake</a>
            <a className={`tab tab-lifted ${activeTab === 'unstake' ? 'tab-active' : ''}`} onClick={() => handleTabClick('unstake')}>Unstake</a>
            <a className={`tab tab-lifted ${activeTab === 'withdraw' ? 'tab-active' : ''}`} onClick={() => handleTabClick('withdraw')}>Withdraw</a>
          </div>
          <label className="label">
            <span className="label-text">Enter Matic amount</span>
            <span className="label-text-alt"><b>Staked : {myStake ? formatEther(myStake) : 0} {configuredNetwork.nativeCurrency.symbol}</b></span>
          </label>
          <div className="relative">
            <input type="number" maxlength={"100000"} placeholder="0.0" value={amount} onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} onChange={(e: React.ChangeEvent<InputEvent>) => { setAmount(e.target.value) }} className="input input-bordered w-full" />
            <div className="absolute inset-y-0 right-0 flex items-center z-20 pr-4">
              <Balance address={address} className="min-h-0 h-auto" />
              <button className="btn btn-primary btn-sm ml-4">MAX</button>
            </div>
          </div>

          <label className="label">
            <span className="label-text-alt">You will get</span>
            <span className="label-text-alt">{amount} Matic</span>
            {/* <span>& earn approx {eatimatedEarnings}</span> */}
          </label>
        </div>



        <div className="divider">
        </div>
        <div className="grid card bg-white rounded-box w-full p-4 mt-4">
          <div className="flex gap-12 justify-between">
            <h3>Exchange Rate:</h3>
            <h3>${nativeCurrencyPrice}</h3>
          </div>

          <div className="flex justify-between">
            <h3>Transaction Cost:</h3>
            <h3>$0.00</h3>
          </div>
        </div>
        <div className="grid card bg-gray-100 w-full rounded-box p-4 m-4">
          <div className="flex justify-between">
            <div className="flex gap-2"><h3>Staking Limit</h3><div className="tooltip" data-tip="The maximum number of matic that can be staked at the moment"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg></div></div>
            <div className="flex"><h3>{stakerContractBalance && threshold ? (formatEther(threshold) - stakerContractBalance) : 0}</h3><h3>/</h3><h3>{threshold ? formatEther(threshold) : 0}</h3></div>
          </div>
          <progress className="progress progress-secondary w-56" value={stakerContractBalance && threshold ? (formatEther(threshold) - stakerContractBalance) : 0} max={threshold ? formatEther(threshold) : 0}></progress>
        </div>
        {activeTab === 'stake' ? (<button className="btn btn-primary w-full" onClick={() => { stakeETH() }}>
          Stake
        </button>) : activeTab === 'unstake' ? (<button disabled className="btn btn-primary w-full" onClick={() => stakeETH()}>
          untake
        </button>) : (<button disabled={!isOpenForWithdraw} className="btn btn-primary w-full" onClick={() => withdrawETH()}>
          Withdraw
        </button>)}
      </div>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow card bg-white m-4 rounded-box p-4">
          <h2>Stakings</h2>
          <div className="divider"></div>
          <div className="flex gap-12">
            <div className="radial-progress" style={{ "--value": "100", "--size": "12rem", "--thickness": "2rem" }}>100%</div>
            <div>
              <h3>Deposit Composition</h3>
              <p>MATIC: <b>100%</b></p>
            </div>

          </div>
        </div>

        <div className="grid flex-grow card bg-white m-4 rounded-box p-4">
          <h2>Rewards: {rewards ? formatEther(rewards) : 0} MATIC</h2>
          <div className="divider"></div>
          <h3>Pending Rewards: {rewards ? formatEther(rewards) : 0}</h3>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from "react"
import { useAccount, useContractRead } from "wagmi"
import { GOVERNANCE_ABI } from "../../abis/GOVERNANCE_ABI"
import { GOVERNANCE_ADDRESS } from "../../utils/constants"

import { useRouter } from "next/router";

import Vote from '../../components/Vote'
import ProposalButtons from "../../components/ProposalButtons"

const Proposal = () => {
  const router = useRouter();
  const proposalId = router.query.id;
  const proposal = useRef({
    Audits: "",
    "Good Reward Allocation": "",
    "Guardian Name": "",
    "Guardian Social Handle": "",
    "Guardian Wallet": "",
    "Lite/Whitepaper": "",
    "Project Ethereum Wallet": "",
    "Project Summary": "",
    Proposal: "",
    "Reward Distribution Terms": "",
    "Social Docs": "",
  });

  const {address} = useAccount()

  const { data: proposalData } = useContractRead({
    addressOrName: GOVERNANCE_ADDRESS,
    contractInterface: GOVERNANCE_ABI,
    functionName: "proposals",
    args: [proposalId],
  });

  const {data: state} = useContractRead({
    addressOrName: GOVERNANCE_ADDRESS,
    contractInterface: GOVERNANCE_ABI,
    functionName: 'state',
    args: [proposalId],
  })

  var query = `query {
    proposal (id: ${proposalId}) {
      description
    }
  }`;

  useEffect(() => {
    fetch("https://api.thegraph.com/subgraphs/name/clearlyrubix/poggers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        try {
          proposal.current = JSON.parse(data.data.proposal.description);
        } catch (e) {
          console.log(e)
        }
      });
  });

  return (
    <div className="flex h-screen space-x-10 p-10 items-center justify-center">
      <div className="bg-white w-1/2 h-1/2 overflow-auto border-purple border-[5px] rounded-md p-2">
        <div className="w-full mb-2">
          <span className="font-bold text-xl">Proposal:</span>{" "}
          <span className="font-bold text-lg">{proposal.current.Proposal}</span>
        </div>
        <div className="w-full my-2">
          <span className="font-bold text-xl">Guardian Information</span>

          <p className="my-1 ml-2">
            <span className="underline text-lg">Guardian Name:</span>{" "}
            {proposal.current["Guardian Name"]}
          </p>

          <p className="my-1 ml-2">
            <span className="underline text-lg">Guardian Social Handle:</span>{" "}
            {proposal.current["Guardian Social Handle"]}
          </p>

          <p className="my-1 ml-2">
            <span className="underline text-lg">Guardian Wallet:</span>{" "}
            {proposal.current["Guardian Wallet"]}
          </p>
        </div>
        <div className="w-full">
          <span className="font-bold text-xl">Project Summary:</span>
          <p>{proposal.current["Project Summary"]}</p>
        </div>
        <div className="w-full">
          <span className="font-bold text-xl">Project Docs</span>
          <p className="my-1 ml-2">
            <span className="underline text-lg">Lite/Whitepaper</span>
            <br></br>
            {proposal.current["Lite/Whitepaper"]}
          </p>
          <p className="my-1 ml-2">
            <span className="underline text-lg">Social Docs</span>
            <br></br>
            {proposal.current["Social Docs"]}
          </p>
          <p className="my-1 ml-2">
            <span className="underline text-lg">Audits</span>
            <br></br>
            {proposal.current.Audits}
          </p>
        </div>
        <div className="w-full">
          <span className="font-bold text-xl">GOOD Reward Allocation</span>
          <p>{proposal.current["Good Reward Allocation"]}</p>
        </div>
        <div className="w-full">
          <span className="font-bold text-xl">Reward Distribution Terms</span>
          <p>{proposal.current["Reward Distribution Terms"]}</p>
        </div>
        <div className="w-full">
          <span className="font-bold text-xl">Project Ethereum Wallet</span>
          <p>{proposal.current["Project Ethereum Wallet"]}</p>
        </div>
        <ProposalButtons id={proposalId} state={state?.toString()} isOwner={proposalData?.proposer == address}/>
      </div>
    </div>
  );
};

export default Proposal;

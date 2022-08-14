import React from "react"
import { toast } from "react-toastify"
import { useAccount, useContractWrite } from "wagmi"
import { GOVERNANCE_ABI } from "../abis/GOVERNANCE_ABI"
import { GOVERNANCE_ADDRESS } from "../utils/constants"
import Vote from "./Vote"

type Props = {
  state?: string;
  isOwner: boolean;
  id?: string | string[];
};



const ProposalButtons = ({ state, isOwner, id }: Props) => {


	const {write} = useContractWrite({
		addressOrName: GOVERNANCE_ADDRESS,
		contractInterface: GOVERNANCE_ABI,
		functionName: 'cancel',
		args: [
			id
		],
		onSuccess() {
			toast.success('Canceled')
		},
		onError(error:any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

  return (
    <div className="w-full flex flex-1 justify-evenly">
      {state == "1" ? (
        <>
          <Vote id={id} vote={1} />
          <Vote id={id} vote={0} />
        </>
      ) : null}
      {/* {isOwner && <button onClick={()=> {write()}}>Cancel</button>} */}
    </div>
  );
};

export default ProposalButtons;

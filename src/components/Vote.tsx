import { GOVERNANCE_ABI} from '../abis/GOVERNANCE_ABI'
import { GOVERNANCE_ADDRESS } from '../utils/constants'
import { useContractRead, useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useState } from 'react';
import {toast} from 'react-toastify'

type Props = {
	id?: string | string[]
	vote: number
}


export default function Vote({ id, vote }: Props) {

	const castVote = useContractWrite({
		addressOrName: GOVERNANCE_ADDRESS,
		contractInterface: GOVERNANCE_ABI,
		functionName: 'castVote',
		chainId: 80001,
		args: [
			id,
			vote
		],
		onSuccess() {
			toast.warn('Transaction Pending')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

	const {isLoading} = useWaitForTransaction({
		hash: castVote.data?.hash,
		onSuccess() {
			toast.success(vote == 0 ? 'Vote casted: Reject' : 'Vote casted: Approve')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})



	if (vote == 0) {
		return (
		<button onClick={() => { castVote.write() }} className='m-auto text-white bg-red-500 rounded-md py-2 px-3 mt-2 font-bold' disabled={isLoading}>
			{isLoading? 'Processing...' : 'Reject'}
		</button>
		)
	} 
	else {
		return (
		<button onClick={() => { castVote.write() }} className='m-auto text-white bg-green rounded-md py-2 px-3 mt-2 font-bold' disabled={isLoading}>
			{isLoading? 'Processing...' : 'Approve'}
		</button>
	)
	}
}
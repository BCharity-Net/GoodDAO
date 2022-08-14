import { formatUnits } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useContractReads, useContractWrite, useWaitForTransaction } from 'wagmi'
import { IGIVE_ABI } from '../abis/IGIVE_ABI'
import { IGIVE_TOKEN } from '../utils/constants'
import { useTranslation } from 'react-i18next'

const DelegateBox = () => {
	const { t } = useTranslation('common')

	const [address, setAddress] = useState('')

	const delegate = useContractWrite({
        addressOrName: IGIVE_TOKEN,
        contractInterface: IGIVE_ABI,
        functionName: 'delegate',
		chainId: 80001,
        args: [
            address
        ],
		onSuccess(data) {
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

	const { isLoading: delegateLoading } = useWaitForTransaction({
		hash: delegate.data?.hash,
		onSuccess(data) {
			toast.success('Delegated!')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

  return (
	<div className='mt-[5vh] ml-[20vw] w-[60vw] h-[60vh] bg-white rounded-3xl border-purple border-4 p-6 overflow-auto font-bold'>

	<h2>{t('Before you can vote')}</h2>
	<br/>
	<br/>	

	{t('Enter address')}
	<input className='w-full border-black rounded-lg border-2 p-1 font-bold' type={'text'} value ={address} onChange={(e)=>{setAddress(e.target.value)}} />
	<br/>
	<br/>
	<button onClick={()=>{delegate.write()}} className='bg-green rounded-2xl py-2 px-3 font-bold text-white ml-[50%] -translate-x-1/2'>
		{t('Delegate')}
	</button>
	<br/>
	<br/>
	<p className='text-zinc-400 font-normal text-sm'>
		{t('Delegate Terms')}
	</p>
	</div>
  )
}

export default DelegateBox
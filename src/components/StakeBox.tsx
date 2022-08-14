import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useContractWrite, useContractRead, useBalance, useAccount, useWaitForTransaction } from 'wagmi'
import { GOOD_ABI } from '../abis/GOOD_ABI'
import { IGIVE_ABI} from '../abis/IGIVE_ABI'
import { IGIVE_TOKEN, GOOD_TOKEN } from '../utils/constants'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import {toast} from 'react-toastify'
import { useTranslation } from 'react-i18next'

const StakeBox = () => {
	const { t } = useTranslation('common')

	const [showModal, setShowModal] = useState(false)

	const [approveAmnt, setApproveAmnt] = useState('0')
	const [withdrawAmnt, setWithdrawAmnt] = useState('0')

	const [goodBalance, setGoodBalance] = useState('Fetching')
	const [giveBalance, setGiveBalance] = useState('Fetching')
	const [claimable, setClaimable] = useState('Fetching')

	const [approved, setApproved] = useState(false)

	const {address} = useAccount()

	const getGoodBalance = useBalance({
		addressOrName: address,
		token: GOOD_TOKEN,
		watch: true,
		chainId: 80001,
	})

	const getGiveBalance = useBalance({
		addressOrName: address,
		token: IGIVE_TOKEN,
		watch: true,
		chainId: 80001,
	})


	const pendingGood = useContractRead({
		addressOrName: IGIVE_TOKEN,
		contractInterface: IGIVE_ABI,
		functionName: 'pendingGOOD',
		watch: true,
		chainId: 80001,
		args: [
			0,
			address
		],
	})

	const allowance = useContractRead({
		addressOrName: GOOD_TOKEN,
		contractInterface: GOOD_ABI,
		functionName: 'allowance',
		watch: true,
		chainId: 80001,
		args: [
			address,
			IGIVE_TOKEN
		]
	})

	useEffect(
		() => {
			//setGoodBalance(getGoodBalance.data?.formatted.length! > 7 ? getGoodBalance.data?.formatted.slice(0,7)! + '...' :  getGoodBalance.data?.formatted! )
			setGoodBalance(getGoodBalance.data?.formatted!)
			//setGiveBalance(getGiveBalance.data?.formatted.length! > 7 ? getGiveBalance.data?.formatted.slice(0,7)! + '...' : getGiveBalance.data?.formatted!)
			setGiveBalance(getGiveBalance.data?.formatted!)
			setClaimable(formatUnits(pendingGood.data == undefined ? 0 : pendingGood.data, 18).length > 7 ? formatUnits(pendingGood.data == undefined ? 0 : pendingGood.data, 18).slice(0,7) + '...' : formatUnits(pendingGood.data == undefined ? 0 : pendingGood.data, 18))
			allowance.data?.toHexString() == "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" ? setApproved(true) : setApproved(false)
		},[allowance.data, getGiveBalance.data?.formatted, getGoodBalance.data?.formatted, pendingGood.data]
	)
	

	const deposit = useContractWrite({
		addressOrName: IGIVE_TOKEN,
		contractInterface: IGIVE_ABI,
		functionName: 'deposit',
		chainId: 80001,
		args: [
			0, // pid
			approveAmnt !== '' ? parseUnits(approveAmnt, 18) : 0
		],
		onSuccess() {
			toast.warn('Trasaction Pending')
			setShowModal(false)
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

	const { isLoading: depositLoading } = useWaitForTransaction({
		hash: deposit.data?.hash,
		onSuccess(data) {
			toast.success('Deposited')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})


	const approve = useContractWrite({
		addressOrName: GOOD_TOKEN,
		contractInterface: GOOD_ABI,
		functionName: 'approve',
		chainId: 80001,
		args: [
			IGIVE_TOKEN, //
			//approveAmnt !== '' ? parseUnits(approveAmnt, 18) : 0
			'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

		],
		onSuccess() {
			toast.warn('Trasaction Pending')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

	const { isLoading: waitLoading } = useWaitForTransaction({
		hash: approve.data?.hash,
		onSuccess(data) {
			toast.success('Approved')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

	const withdraw = useContractWrite({
		addressOrName: IGIVE_TOKEN,
		contractInterface: IGIVE_ABI,
		chainId: 80001,
		functionName: 'withdraw',
		args: [
			0, // pid
			withdrawAmnt !== '' ? parseUnits(withdrawAmnt, 18) : 0
		],
		onSuccess() {
			toast.warn('Trasaction Pending')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
		
	})

	const { isLoading: withdrawLoading } = useWaitForTransaction({
		hash: withdraw.data?.hash,
		onSuccess(data) {
			toast.success('Withdrawn')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})



	const claimGood = useContractWrite({
		addressOrName: IGIVE_TOKEN,
		contractInterface: IGIVE_ABI,
		functionName: 'claimGOOD',
		chainId: 80001,
		args: [
			0 //pid
		],
		onSuccess() {
			toast.warn('Trasaction Pending')
		},
		onError(error: any) {
			if (error.error != null) {
				toast.error(error.error.data.message)
			} else {
				toast.error(error.message)
			}
		},
	})

	const { isLoading: claimLoading } = useWaitForTransaction({
		hash: claimGood.data?.hash,
		onSuccess(data) {
			toast.success('Claimed')
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
	
	<div className='bg-gray rounded-lg border-solid border px-10 flex flex-col md:h-full md:w-full justify-between lg:h-[30rem]'>
		
		{/* Deposit Modal */}
		{showModal && 
		<div>
			<div onClick={()=>{setShowModal(false)}} className='fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-40'>
			
			</div>
			<div className='absolute inset-1/2 bg-white -translate-x-1/2 -translate-y-1/2 z-[11] w-1/5 h-1/5 rounded-lg shadow-2xl opacity-100'>
				{/* Header */}
				<div className='flex justify-start shadow-md'>
					<p className='text-black font-bold text-xl py-2 inline ml-2'>{t('Confirm Deposit')}</p>
					<button className='ml-auto p-2 mr-2' onClick={()=>{setShowModal(false)}}><FontAwesomeIcon icon={faClose}/></button>
				</div>
				{/* Body */}
				<div className='h-full'>
					<p className='pt-3 pl-2'>{t('Confirm Deposit Amount')}</p>
					<p className='pt-3 pl-2 text-lg font-bold'>{approveAmnt}</p>
					<div className='absolute left-1/2 -translate-x-1/2 bottom-2'><button className='text-white rounded-md bg-green lg:py-2 md:py-1 px-3 mt-2 font-bold xl:text-sm lg:text-sm md:text-xs' onClick={()=>{deposit.write()}}>{t('Deposit')}</button></div>
				</div>
			</div>
		</div>

		}

		{/* Header */}
		{/* <button className='ml-auto -mr-8 mt-2'><FontAwesomeIcon icon={faRotateRight}/></button> */}
		<div className=''>
			<h1 className='font-bold text-black text-center text-xl mt-6'>{t('Stake GOOD')}</h1>
		</div>


		{/* Approve Section */}
		<div className='flex flex-col'>
			<div>
				<div className='flex justify-between text-inline'>
					<h1 className='items-start lg:text-base md:text-xs'>{t('GOOD Balance')}</h1>
					<h1 className='items-end lg:text-base md:text-xs overflow-ellipsis'>{goodBalance}</h1>
				</div>
				<div className='relative'>
			</div>
				<input className='rounded-lg h-8 bg-gray border border-solid w-full'  type={'number'} value={approveAmnt} onChange={(e) => {setApproveAmnt(e.currentTarget.value)}} min={0}/>
			</div>

			{approved ? 
			<button className={`m-auto text-white bg-green rounded-md font-bold lg:py-2 md:py-1 px-3 mt-2 xl:text-sm lg:text-sm md:text-xs`} 
				onClick={() => setShowModal(true)}
				disabled={depositLoading}>
					{depositLoading ? 'Processing...' : 'Deposit'}
					</button> 
				
				:

				<button className={`m-auto text-white bg-green rounded-md font-bold lg:py-2 md:py-1 px-3 mt-2 xl:text-sm lg:text-sm md:text-xs`} onClick={
				
					() => approve.write()}
					disabled={waitLoading}>{waitLoading? 'Processing...' : 'Approve'}</button>
			}
		</div>
			


		{/* Withdraw Section */}
		<div className='flex flex-col'>
			<div className='flex justify-between'>
				<h1 className='items-start lg:text-base md:text-xs'>{t('iGIVE Balance')}</h1>
				<h1 className='items-end lg:text-base md:text-xs overflow-ellipsis'>{giveBalance}</h1>
			</div>
			<div className='relative'>
				<input className='rounded-lg h-8 bg-gray border border-solid w-full' type={'number'} value={withdrawAmnt} onChange={(e) => {setWithdrawAmnt(e.currentTarget.value)}} min={0}/>
			</div>
			<button className={`m-auto text-white bg-purple rounded-md lg:py-2 md:py-1 px-3 mt-2 font-bold xl:text-sm lg:text-sm md:text-xs`} onClick={() => withdraw.write()} disabled={withdrawLoading}>{withdrawLoading? 'Processing...' : 'Withdraw'}</button>
		</div>


		{/* Claim Section */}
		<div className='flex flex-col mb-6'>
			<div className='flex justify-between'>
				<h1 className='items-start xl:text-sm lg:text-sm md:text-xs'>{t('Claimable GOOD')}</h1>
				<h1 className='items-end xl:text-sm lg:text-sm md:text-xs'>{claimable}</h1>
			</div>
			<button className={`m-auto text-white bg-green rounded-md lg:py-2 md:py-1 px-3 mt-2 font-bold xl:text-sm lg:text-sm md:text-xs`} onClick={()=> {claimGood.write()}} disabled={claimLoading}>{claimLoading? 'Processing...' : 'Claim GOOD'}</button>
		</div>
	</div>
  )
}

export default StakeBox
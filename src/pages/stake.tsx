import React, { useEffect, useState } from 'react'
import InfoBox from '../components/InfoBox'
import StakeBox from '../components/StakeBox'
import { getApr } from '../utils/getApr'
import { useContractRead } from 'wagmi'
import { GOOD_ABI } from '../abis/GOOD_ABI'
import { IGIVE_ABI } from '../abis/IGIVE_ABI'
import { DAI_ABI } from '../abis/DAI_ABI'
import { IGIVE_TOKEN, GOOD_TOKEN, GIVE_DAI_LP, DAI_TOKEN, RPC_URL } from '../utils/constants'
import { formatUnits } from 'ethers/lib/utils'
import Web3 from 'web3'
import { useTranslation } from 'react-i18next'

interface Transfers {
	from: string;
	to: string;
	balance: number;
}

interface Guardians {
	address: string;
	balance: number;
}

const Stake = () => {
	const { t } = useTranslation('common')

	//const [burned, setBurned] = useState('')
	const [staked, setStaked] = useState('')
	const [threshold, setThreshold] = useState('')
	const [apr, setApr] = useState('')
	const [balanceOf, setBalanceOf] = useState(-99)
	const [balanceOfQuote, setBalanceOfQuote] = useState(-99)
	const [decimals, setDecimals] = useState(-99)
	const [totalSupply, setTotalSupply] = useState(-99)
	
	useContractRead({
		addressOrName: GOOD_TOKEN,
		contractInterface: GOOD_ABI,
		functionName: 'decimals',
		watch: true,
		onSuccess(data) {
			//console.log('Success', data)
			setDecimals(parseFloat(data.toString()));
			//console.log(totalSupply);
		},
	})

	useEffect(() => {
		const goodFirstBlock = 27147618
		const transmitLog = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

		let web3 = new Web3(RPC_URL);

		web3.eth.getPastLogs({
			address: IGIVE_TOKEN,
			fromBlock: web3.utils.toHex(goodFirstBlock),
			//toBlock: 'latest',
			topics: [transmitLog]
		}
		, (error, result) => {
			if(error)
			{
					console.log(error)
			}
			else
			{
					//console.log(result);
					
					let transfers: Transfers[] = [];
					var array1: string[] = [];
					var array2: string[] = [];
				
					for ( let log in result){

						array1[log] = '0x' + result[log].topics[1].slice(-40)
						array2[log] = '0x' + result[log].topics[2].slice(-40)

						let transfer: Transfers = {
							from : array1[log],
							to  : array2[log],
							balance : ( parseInt(result[log].data, 16) / Math.pow(10, 18))
						}

						transfers.push(transfer)
						//console.log(transfer)

					}
					var array3 = array1.concat(array2)

					var uniqueAdress = (array3).filter((item, index) => array3.indexOf(item) === index);

					//console.log(uniqueAdress)

					let guardians: Guardians[] = [];

					for ( let j in uniqueAdress){

						var balanceTotal = 0;
					
						for ( let i in transfers){
							if(uniqueAdress[j] == transfers[i].from){
								balanceTotal -= transfers[i].balance
							}
							else if(uniqueAdress[j] == transfers[i].to){
								balanceTotal += transfers[i].balance
							}
						}

						let guardian: Guardians = {
							address: uniqueAdress[j],
							balance: balanceTotal
						}

						guardians.push(guardian)
					}

					for(let i in guardians){
						if(guardians[i].balance <= 0) guardians.splice(parseInt(i),1)
					}

					guardians.sort((a, b) => {
						return b.balance - a.balance;
					});
					
					//console.log(guardians)

					if(guardians.length < 21){
						setThreshold('> 0')
					}
					else{
						setThreshold( ("> " + guardians[20].balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",") )
					}

			}
		})
		.then();

	 }, []);
	
	useContractRead({
		addressOrName: GOOD_TOKEN,
		contractInterface: GOOD_ABI,
		functionName: 'totalSupply',
		watch: true,
		onSuccess(data) {
			setTotalSupply(parseFloat(data.toString()) / (10 ** 18));
		},
	})

	useContractRead({
		addressOrName: GOOD_TOKEN,
		contractInterface: GOOD_ABI,
		functionName: 'balanceOf',
		watch: true,
		args: [
			GIVE_DAI_LP
		],
	
		onSuccess(data) {
			//console.log('Success', data)
			setBalanceOf(parseFloat(data.toString()));
			//console.log(totalSupply);
		},
	})

	useContractRead({
		addressOrName: DAI_TOKEN,
		contractInterface: DAI_ABI,
		functionName: 'balanceOf',
		watch: true,
		args: [
			GIVE_DAI_LP
		],
	
		onSuccess(data) {
			//console.log('Success', data)
			setBalanceOfQuote(parseFloat(data.toString()));
			//console.log(totalSupply);
		},
	});
	
	useContractRead({
		addressOrName: IGIVE_TOKEN,
		contractInterface: IGIVE_ABI,
		functionName: 'totalGOODStaked',
		watch: true,
		onSuccess(data) {
			setStaked(formatUnits(data, 18))
		},
	})

	const quoteTokenAmountTotal = balanceOfQuote / (10 ** decimals)
	const tokenAmountTotal = balanceOf / (10 ** decimals)
	const tokenPriceVsQuote = +(quoteTokenAmountTotal / tokenAmountTotal).toFixed(8)
	
	useEffect(() => {
		const callData = async () => {
			setApr(await getApr(tokenPriceVsQuote, balanceOf, totalSupply, decimals))
		}
		callData()
	}, [balanceOf, decimals, tokenPriceVsQuote, totalSupply]);


  return (
	<div className='flex h-screen items-center w-screen'>
		<div className='flex flex-1 flex-col h-screen pt-[200px] pb-60 justify-between px-20'>
			<InfoBox title={t('Price')} text={'$' + tokenPriceVsQuote.toString()}/>
			<InfoBox title={t('Token Threshold')} text={threshold}/>
		</div>
		<div className='flex flex-1 flex-col h-screen pt-[200px] pb-60 justify-center px-20 '>
			<StakeBox/>
		</div>
		<div className='flex flex-1 flex-col h-screen pt-[200px] pb-60 justify-between px-20'>
			<InfoBox title={t('APR')} text={apr}/>
			<InfoBox title={t('Total Staked')} text={staked}/>
		</div>
	</div>
	
  )
}

export default Stake
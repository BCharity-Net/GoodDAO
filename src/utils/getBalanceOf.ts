import { ethers } from 'ethers'
import { ERC20_ABI } from '../abis/ERC20_ABI'
import { GOOD_TOKEN, RPC_URL } from './constants'

const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
const abi =  ERC20_ABI
const GoodToken = new ethers.Contract(GOOD_TOKEN, abi, provider)

export const getBalanceOf = async (address: string) => {
	let balance = await GoodToken.balanceOf(address)
	return balance
}
import { getBalanceOf } from "./getBalanceOf";

const wallet1 = '0x000000000000000000000000000000000000dead'
const wallet2 = '0xdead000000000000000042069420694206942069'

export const getBurned = async () => {
	const burn1 = await getBalanceOf(wallet1)
	const burn2 = await getBalanceOf(wallet2)
	const total = burn1.add(burn2).toString()
	return total
	//return "$ 0.00001382"
}

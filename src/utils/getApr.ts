import BigNumber from 'bignumber.js'

const BSC_BLOCK_TIME = 1
const GOOD_PER_BLOCK = new BigNumber(3)
const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 2628000
const GOOD_PER_YEAR = GOOD_PER_BLOCK.times(BLOCKS_PER_YEAR)


/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param goodPriceUsd good price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
const getFarmApr = (poolWeight: BigNumber, goodPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
	const yearlygoodRewardAllocation = GOOD_PER_YEAR.times(poolWeight)
	const apr = yearlygoodRewardAllocation.times(goodPriceUsd).div(poolLiquidityUsd).times(100)
	return apr.isNaN() || !apr.isFinite() ? -99 : apr.toNumber()
  }

  export const getApr = async (_tokenPriceVsQuote: number, tokenBalance: number, totalSupply: number, tokenDecimals : number) => {

	const tokenRatio = new BigNumber(tokenBalance).div(new BigNumber(totalSupply))

	//console.log(tokenRatio)

	const tokenAmountTotal = new BigNumber(tokenBalance).div(10 ** tokenDecimals)

	const quoteTokenAmount = tokenAmountTotal.times(tokenRatio)

	const totalInQuoteToken = quoteTokenAmount.times(new BigNumber(2))

	const totalLiquidity = new BigNumber(totalInQuoteToken).times(_tokenPriceVsQuote)

	//console.log(totalLiquidity)

	const apr = +(getFarmApr(new BigNumber(100), new BigNumber(_tokenPriceVsQuote), new BigNumber(totalLiquidity))).toFixed(3) // placeholder values

	//return apr + "%"
	return "60 %"
}

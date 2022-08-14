import React from 'react'

type Props = {
	title: string
	text: string
}

const InfoBox = ({title, text}: Props) => {
  return (
	<div className="bg-gray py-6 m-10 rounded-xl flex flex-col justify-between text-lg border-black border-4 border-r-4">
		<span className='pb-2 text-black font-bold text-center'>{title}</span>
		<span className='pt-2 text-center text-black'>{text}</span>
	</div>
  )
}

export default InfoBox
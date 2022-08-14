import Image from 'next/image'
import React, { ReactNode } from 'react'
import Nav from './Nav'
import background from '../../public/bg-hero.png'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
	children?: ReactNode
}

const Layout = ({ children }: Props) => (
	<>
	<div className='h-screen'>
		<div className='fixed h-screen w-screen overflow-hidden z-[-1] '>
			<Image src={background} alt='background' layout='fill' quality={100} />	
		</div>
		<Nav />
		<main className='h-screen'>
			{children}
		</main>
		<ToastContainer
			position="bottom-left"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<Footer/>
		
	</div>
	</>
  )


export default Layout
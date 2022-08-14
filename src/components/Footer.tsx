import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHighlighter, faBook } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faDiscord, faGithub, faInstagram, } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Footer = () => {
	const router = useRouter();
	const { t } = useTranslation('common')

	function copyElementText() {
		// var text = document.getElementById("heading")!.innerText;
		var text = '0x7cE76D95B5BE54D3c1D2b40C1c37C4A8913bD4b5';
		var elem = document.createElement("textarea");
		document.body.appendChild(elem);
		elem.value = text;
		elem.select();
		document.execCommand("copy");
		document.body.removeChild(elem);
	}


	return (

		<div className='fixed bottom-0 justify-center w-screen z-10'>
			<div className="flex justify-between mx-auto pb-5 w-1/6 border-red-500 border-0">
				<a href='https://twitter.com/BCharityFi' rel='noreferrer' target='_blank'>
					<div className='flex justify-center align-middle items-center self-center bg-white w-10 h-10 rounded-full'>
						<FontAwesomeIcon icon={faTwitter} />
					</div>
				</a>

				<a href='https://discord.com/invite/4vKS59q5kV' rel='noreferrer' target='_blank'>
					<div className='flex justify-center align-middle items-center self-center bg-white w-10 h-10 rounded-full'>
						<FontAwesomeIcon icon={faDiscord} />
					</div>
				</a>

				<a href='https://www.instagram.com/bcharityofficial/' rel='noreferrer' target='_blank'>
					<div className='flex justify-center align-middle items-center self-center bg-white w-10 h-10 rounded-full'>
						<FontAwesomeIcon icon={faInstagram} />
					</div>
				</a>
				<a href='https://github.com/BCharity-Net/web3gooddao/' rel='noreferrer' target='_blank'>
					<div className='flex justify-center align-middle items-center self-center bg-white w-10 h-10 rounded-full'>
						<FontAwesomeIcon icon={faGithub} />
					</div>
				</a>

				<a href='https://gooddao-1.gitbook.io/gooddao/' rel='noreferrer' target='_blank'>
					<div className='flex justify-center align-middle items-center self-center bg-white w-10 h-10 rounded-full'>
						<FontAwesomeIcon icon={faBook} />
					</div>
				</a>

				<div className='absolute mr-6 right-0'>
					<h1>{t('Donate to our community wallet')}</h1>
					{/* <h1 onClick={copyElementText} id="heading">0x7cE76D95B5BE54D3c1D2b40C1c37C4A8913bD4b5</h1> */}
					{/* <button onClick={copyElementText} id="heading">0x7cE76D95B5BE54D3c1D2b40C1c37C4A8913bD4b5</button> */}
					<div className='flex justify-center'>
						<button onClick={copyElementText}>0x7cE...4b5</button>
					</div>
				</div>


				<div className='absolute left-48'>
					<div className='flex justify-center'>
						{/* <h1>The current URL is {router.asPath}</h1> */}
					</div>
				</div>

				{router.asPath == '/' ? <div></div> :
					<div className='absolute ml-14 left-0'>
						<div className='flex justify-center border-black border-2 px-2 rounded-md'>
							{/* <Link href={'/'}>Back</Link> */}
							<button onClick={() => router.back()}>{t('Back')}</button>
						</div>
					</div>
				}

			</div >
		</div>

	)
}

export default Footer

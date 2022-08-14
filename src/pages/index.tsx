import type { NextPage } from 'next'
import Head from 'next/head'
import styles from "../styles/Home.module.css"
import Paragraph from '../components/Paragraph'
import HomepageItem from '../components/HomepageItem'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
const paragraphText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed porttitor lorem. Proin non est dictum, tempor lacus at, volutpat mauris. Phasellus consectetur eros erat, nec scelerisque massa elementum in. Sed sagittis lorem at lectus fermentum, id convallis tortor efficitur. Vivamus sollicitudin bibendum odio, quis ornare velit sodales congue. Curabitur auctor sed nunc id porta. Aenean nulla est, rutrum a orci nec, finibus rhoncus ex.'

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>GoodDAO</title>
      </Head>
      <div>
        <div className="flex h-screen space-x-10 p-10 items-center">
          <div className='flex flex-1 flex-col h-screen pt-[200px] pb-60 justify-between px-20'>
            <HomepageItem text={t('GOOD Price')} price={0.00005}/> {/*Done  */}
            <HomepageItem text={t('Treasury Balance')} price={100000000000000000000 * 0.00005}/> {/*Done  */}
            <HomepageItem text={t('Marketcap')} price={100000000000000000000 * 0.05}/> {/*Done  */}
          </div>
          <div className='flex flex-1 flex-col h-screen pt-[200px] pb-60 justify-between px-20'>
            <HomepageItem text={t('Total Funds Sent')} price={2 * 5}/> {/*Done  */}
            <HomepageItem text={t('Total Value Locked')} price={100000000000000000000 * 0.00005}/> {/*Done  */}
            <HomepageItem text={t('GOOD Burned')} price={21.075226878132146229}/> {/*Done  */}
          </div>
          

        </div>

      </div>
    </>
  )
}

export default Home

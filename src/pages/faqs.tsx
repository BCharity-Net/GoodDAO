import React from 'react'
import Accordion from "../components/Accordion"
import { useTranslation } from 'react-i18next'

export default function Faqs() {
    const { t } = useTranslation('common')
    return (
        <div className="fixed top-0 w-full mt-32">	
	        <div className="container px-5 pb-5 mx-auto max-w-screen-xl max-h-[78vh] flex-grow !overflow-y-auto">
                <div className="mb-10 font-bold text-2xl brand-500">
                {t('FAQ & Explanations')}
                </div>
                <Accordion>
                    <div id={t('What is a DAO')} >
                        <p className="mb-3">
                       {t('DAO')}
                        </p>
                        <p className="mb-3">
                        {t('DAO2')}
                        </p>
                        <p>
                        {t('DAO3')}
                        </p>
                    </div>

                    <div id={t('What is GOOD DAO')} >
                        <p>
                        {t('GOOD DAO')}
                        </p>
                    </div>

                </Accordion>
                    
                <div className="my-5 font-bold text-xl brand-500">
                    {t('GOOD Token')}
                </div>

                <Accordion>

                    <div id={t('What is GOOD')} >
                        <p>
                        {t('Buy GOOD')}
                        </p>
                    </div>

                    <div id={t('Where can I buy GOOD')} >
                        <p>
                        {t('Where GOOD')}
                        </p>
                    </div>

                </Accordion>
                    
                <div className="my-5 font-bold text-xl brand-500">
                    {t('iGIVE')}
                </div>

                <Accordion>

                    <div id={t('What is iGIVE')} >
                        <p>
                        {t('What iGIVE')}</p>
                    </div>

                    <div id={t('How are rewards paid')} >
                        <p className="mb-3">
                        {t('Rewards paid')}
                        </p>
                        <p>
                        {t('Rewards paid2')}
                        </p>
                    </div>

                    <div id={t('Can I add iGIVE to my wallet')} >
                        <p className="mb-3">
                        {t('iGIVE Wallet')}
                        </p>
                        <p>
                        {t('iGIVE Address')}
                        </p>
                    </div>

                </Accordion>
                    
                <div className="my-5 font-bold text-xl brand-500">
                    {t('Staking')}
                </div>

                <Accordion>

                    <div id={t('Why stake GOOD')} >
                        <p className="mb-3">
                        {t('Why Stake')}
                        </p>
                        <p className="mb-3">
                        {t('Why Stake 2')}
                        </p>
                        <p>
                        {t('Why Stake 3')}
                        </p>
                    </div>

                    <div id={t('How to Stake GOOD')} >
                        <p className="mb-3">
                        {t('How to Stake')} 
                        </p>
                        <p>
                        {t('How to Stake 2')}
                        </p>
                    </div>
                    
                    <div id={t('How to Unstake GOOD')}>
                        <p>
                        {t('How to Unstake')}
                        </p>
                    </div>

                    </Accordion>
                    
                    <div className="my-5 font-bold text-xl brand-500">
                        {t('Rewards')}
                    </div>
    
                    <Accordion>

                    <div id={t('How do rewards work')} >
                        <p className="mb-3">
                        {t('How rewards work')}
                        </p>
                        <p className="mb-3">
                        {t('How rewards work2')}
                        </p>
                        <p className="mb-3">
                        {t('How rewards work3')}
                        </p>
                        <p>
                        {t('How rewards work4')}
                        </p>
                    </div>

                    <div id={t('Sending Rewards')} >
                        <p className="mb-3">
                        {t('Sending Rewards 1')}
                        </p>
                        <p className="mb-3">
                        {t('Sending Rewards 2')}
                        </p>
                        <p className="mb-3">
                        {t('Sending Rewards 3')}
                        </p>
                        <p className="mb-3">
                        {t('Sending Rewards 4')}
                        </p>
                        <p>
                        {t('Sending Rewards 5')}
                        </p>
                    </div>

                    
                    </Accordion>
                    
                    <div className="my-5 font-bold text-xl brand-500">
                        {t('Proposals')}
                    </div>
    
                    <Accordion>

                    <div id={t('How to Submit Proposal')}>
                        <p className="mb-3">
                        {t('How Submit 1')}
                        </p>
                        <p className="mb-3">
                        <ul className='list-disc'>
                            <li className="ml-3">
                            {t('How Submit 2')}
                            </li>
                            <li className="ml-3">
                            {t('How Submit 3')}
                            </li>
                            <li className="ml-3">
                            {t('How Submit 4')}
                            </li>
                        </ul>

                        </p>
                        <p>
                        {t('How Submit 5')}
                        </p>
                    </div>

                    <div id={t('What to Include')}>
                        <p>
                        <ul className='list-disc'>
                            <li className="ml-3">
                                {t('To Include 1')}
                            </li>
                            <li className="ml-3">
                            {t('To Include 2')}
                            </li>
                            <li className="ml-3">
                            {t('To Include 3')}


                            </li>
                            <li className="ml-3">
                            {t('To Include 4')}

                            </li>
                            <li className="ml-3">
                            {t('To Include 5')}
                            </li>
                        </ul>
                        </p>
                    </div>
                    
                </Accordion>
            </div>
        </div>
    )
}

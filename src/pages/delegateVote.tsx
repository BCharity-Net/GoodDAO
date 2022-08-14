import DelegateBox from '../components/DelegateBox'
import { useTranslation } from 'react-i18next'

export default function DelegateVote() {
    const { t } = useTranslation('common')


    return (
        <>
            <h1 className='mt-[15vh] text-center text-4xl font-bold'>{t('Delegate Votes')}</h1>
            <DelegateBox/>
        </>
    )
}

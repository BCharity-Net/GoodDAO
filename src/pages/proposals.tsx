import styles from '../styles/Proposals.module.css'
import React from 'react'
import Paragraph from '../components/Paragraph'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const paragraphText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed porttitor lorem. Proin non est dictum, tempor lacus at, volutpat mauris. Phasellus consectetur eros erat, nec scelerisque massa elementum in. Sed sagittis lorem at lectus fermentum, id convallis tortor efficitur. Vivamus sollicitudin bibendum odio, quis ornare velit sodales congue. Curabitur auctor sed nunc id porta. Aenean nulla est, rutrum a orci nec, finibus rhoncus ex.'

export default function Proposals() {
    const { t } = useTranslation('common')
    return (
        <div className={styles.main}>

            <Link href='/pendingProposal'>
            <div className={styles.proposals}>
                {t('Pending Proposals')}
            </div>
            </Link>
            <Link href='/closedProposal'>
            <div className={styles.proposals}>
                {t('Closed Proposals')}
            </div>
            </Link>
            <Link href='/submitProposal'>
            <div className={styles.proposals}>
                {t('Submit Proposals')}
            </div>
            </Link>
            <Link href='/DelegateVote'>
            <div className={styles.proposals}>
                {t('Delegate Votes')}
            </div>
            </Link>
        </div>
    )
}

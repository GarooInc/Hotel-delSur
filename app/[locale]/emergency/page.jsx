import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import PhoneItem from '@/components/PhoneItem/PhoneItem'
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['emergency', 'header']

export default async function Emergency({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white">
            <HeaderItem v={"v5"} />
            <div className='info_container'>
                <h2 className='italictiempos_title'>{t('emergency:title')}</h2>
                <span className='description_page_general'>{t('emergency:contact1')} <a className='underline text-secondary' href="tel:+506 8749-7337;">+506 8749-7337</a></span>
                <span className='phone_span'>{t('emergency:contact2')}</span>
                <div className='cellphone_container'>
                    <div className='cellphone_container_inner'>
                        <PhoneItem name={t('emergency:ext1')}/>
                        <PhoneItem name={t('emergency:ext2')}/>
                        <PhoneItem name={t('emergency:ext3')}/>
                        <PhoneItem name={t('emergency:ext4')}/>
                    </div>
                </div>
                <FooterItem  transparent/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}
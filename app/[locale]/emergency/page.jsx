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
                <InfoDisplay collection="Emergency" />
                <div className='cellphone_container'>
                    <div className='cellphone_container_inner'>
                        <PhoneItem name="Frontdesk" p1="+503 8749-7337;" link1="tel:+5018749-7337" />
                    </div>
                    <div className='cellphone_container_inner'>
                        <PhoneItem name="Directorio interno #0" p1="+503 8749-7337;" link1="tel:+5018749-7337" />
                        <PhoneItem name="Restaurante #315" p1="+503 8749-7337;" link1="tel:+5018749-7337" />
                    </div>
                </div>
                <FooterItem  transparent/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}
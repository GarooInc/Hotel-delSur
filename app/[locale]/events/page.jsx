import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FooterItem from '@/components/FooterItem/FooterItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'

const namespaces = ['events', 'header']

export default async function Events({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white relative">
            <div className="flex flex-col w-full items-center">
                <HeaderItem/>
                <h2 className='italictiempos_title'>{t('events:title')}</h2>
                <div className="description_page_general">
                        {t('promos:text1')}
                </div>
                <div className='info_container'>
                    <div className='flex flex-col justify-center items-center gap-4 py-10 md:w-3/4'>
                        <InfoDisplay collection={"events"} />
                    </div>
                </div>
            </div>
            <FooterItem transparent/>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
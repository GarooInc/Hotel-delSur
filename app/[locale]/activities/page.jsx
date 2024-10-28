import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import ActivitiesItem from '@/components/ActivitiesItem/ActivitiesItem'


const namespaces = ['activities', 'header']

export default async function Activities({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white">
            <div className="flex flex-col w-full items-center">
                <HeaderItem />
                <div className='info_container'>
                    <h2 className='italictiempos_title'>{t('emergency:title')}</h2>
                    <div className="description_page_general">
                        {t('activities:rich_text1')}
                    </div>
                </div>
                <ActivitiesItem />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
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
                <div className="md:w-1/2 w-3/4  bg-white rounded-lg shadow p-4 my-10 font-futura text-black text-center">
                    {t('activities:rich_text1')}
                </div>
                <ActivitiesItem />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
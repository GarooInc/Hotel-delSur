import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import TvItem from '@/components/TvItem/TvItem'


const namespaces = ['tv', 'header']

export default async function TV({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-white">
            <div className="flex flex-col w-full h-screen items-center">
                <HeaderItem namePage="TV" />
                <div className="md:w-1/2 w-3/4  bg-white rounded-lg shadow p-4 my-10 font-futura text-black text-center">
                    Find ocean-view rooms, eclectic cuisine, and sparkling pools along the Caribbean Sea. Explore our all-inclusive resort ahead of your stay and
                    imagine what&apos;s possible.
                </div>
                <TvItem />
            </div>
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
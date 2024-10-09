import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Carousel from '@/components/Carousel/Carousel'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'



const namespaces = ['welcome', 'header']

export default async function Welcome({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page bg-gray-700">
        <div className="flex flex-col w-full">
            <HeaderItem/>
            <div className="w-full md:h-[480px]">
                <Carousel />
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full bg-green p-10 md:p-14'>
                <h1 className="principal_title">{t('welcome:title_main')}</h1>
                <span className="text-cream text-md font-futuralight text-center leading-6 tracking-tight my-4">
                    {t('welcome:desc_main')}
                </span>
            </div>
        </div>
        <ChatBubble />
      </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
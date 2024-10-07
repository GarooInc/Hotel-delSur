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
    const images = []

    for (let i = 2; i < 9; i++) {
        images.push(`/assets/images/welcome/welcome${i}.jpg`)
    }

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page">
        <div className="flex flex-col w-full h-screen">
            <HeaderItem v={"v5"}/>
            <div className="w-full md:h-3/5">
                <Carousel images={images} />
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
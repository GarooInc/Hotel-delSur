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
                <h1 className="principal_title">WELCOME TO ITZ&#39;ANA RESORT &amp; RESIDENCES</h1>
                <p className="text-center md:text-xl text-md  text-light-brown font-futura font-bold">A Luxury Oasis on the Caribbean Sea</p>
                <span className="text-cream text-md font-futuralight text-center leading-6 tracking-tight my-4">
                    Escape the ordinary to a breathtaking destination on the Belize coast, where the emerald colors
                    of the Caribbean Sea and the rhythm of the Mayan jungle create an oasis of relaxation and
                    adventure. Relax on the white sand beach. Enjoy local cuisine fresh from the garden. Renew
                    your senses with a spa treatment overlooking the ocean. Discover the tranquillity and cultural
                    spirit of our Placencia resort, where the reef meets the rainforest. Life imitates luxury at Itz&#39;ana.
                </span>
            </div>
        </div>
        <ChatBubble />
      </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}
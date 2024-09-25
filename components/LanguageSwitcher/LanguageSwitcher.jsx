'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18nConfig'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };


    return (
        <div className='fixed top-2 right-0 p-4 dropdown'>
          <div tabIndex={0} role="button" className="m-4 bg-transparent">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_923)">
              <path d="M34.5676 19.0908C33.4756 16.1035 30.4271 14.3203 26.4109 14.3203C26.2533 14.3203 26.1028 14.3238 25.9524 14.3308L25.9244 10.7205L32.0931 9.65828C32.2943 9.62503 32.3259 9.45003 32.2839 9.25403C32.2436 9.05978 31.9916 7.70878 31.9548 7.54603C31.9076 7.31678 31.7763 7.32378 31.5926 7.35528C31.4106 7.38678 25.9051 8.16203 25.9051 8.16203L25.8823 4.52553C25.8806 4.30678 25.7616 4.24903 25.5428 4.25253L23.7491 4.28053C23.5653 4.28403 23.4621 4.36628 23.4656 4.53953L23.5233 8.57678C23.5233 8.57678 18.1666 9.49903 18.0214 9.52703C17.8743 9.55153 17.7239 9.61978 17.7571 9.77728C17.7903 9.93478 18.0896 11.6918 18.1211 11.8283C18.1526 11.9683 18.2471 12.054 18.4501 12.0155L23.5671 11.1335L23.6283 14.665C21.7436 15.1568 20.4766 16.107 19.6804 16.9453C18.3363 18.3575 17.5681 20.2475 17.5681 22.1305C17.5681 24.906 19.2673 26.5563 21.6421 26.8468C27.1756 27.524 30.6003 21.4918 31.7379 18.5955C33.6576 21.231 32.1858 26.215 28.0733 29.0605C27.9981 29.1113 27.9019 29.2863 28.0156 29.4228L29.0989 30.7458C29.2388 30.9138 29.4594 30.849 29.5469 30.786C33.9394 27.7585 35.9536 22.8848 34.5676 19.0908ZM21.6421 24.6698C19.9516 24.458 19.9901 23.0703 19.9901 22.127C19.9901 20.7743 20.5623 19.362 21.5231 18.354C22.1226 17.7283 22.8587 17.2497 23.6738 16.9558L23.8173 24.4405C23.1192 24.6815 22.3752 24.7599 21.6421 24.6698ZM25.8893 23.702L25.9699 16.5113C26.1168 16.5043 26.2603 16.4938 26.4109 16.4938C27.7636 16.4938 29.0253 16.7475 29.7096 17.1255C30.3938 17.5053 27.9193 21.8733 25.8893 23.702ZM10.2268 10.283C10.2067 10.2082 10.1619 10.1424 10.0996 10.0963C10.0373 10.0503 9.96128 10.0266 9.88385 10.0293H6.47135C6.3946 10.0267 6.31924 10.0502 6.25758 10.096C6.19592 10.1417 6.1516 10.2071 6.13185 10.2813L0.0138495 29.603C-0.0159005 29.6923 -0.00540046 29.736 0.12235 29.736H3.1551C3.28635 29.736 3.32835 29.6958 3.3546 29.61L5.1186 23.8035H11.2366L13.0006 29.61C13.0286 29.6958 13.0688 29.736 13.1983 29.736H16.2328C16.3589 29.736 16.3694 29.6923 16.3414 29.603C16.3169 29.5155 10.9461 12.5563 10.2268 10.283ZM5.64535 21.3395L8.1776 12.152L10.7098 21.3395H5.64535Z" fill="#AE2602"/>
              </g>
              <defs>
              <clipPath id="clip0_17_923">
              <rect width="35" height="35" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
          <select onChange={handleChange} value={currentLocale} tabIndex={0} className="dropdown-content card card-compact bg-redorange text-white z-[1] w-20 p-2 shadow">
              <option value="en">EN</option>
              <option value="es">ES</option>
          </select>
        </div>
    )
}

export default LanguageSwitcher;

import Link from "next/link";
import "@/app/globals.css";
import {UserProvider} from "@/context/UserContext";
import {Toaster} from 'react-hot-toast';
import Navbar from "@/app/_components/Navbar";
import Script from "next/script";
import Image from "next/image";
import { Vazirmatn } from 'next/font/google'
const vazirmatn = Vazirmatn({ subsets: ['latin', 'arabic'] })

export const metadata = {
    keywords: ['ایران ویب', 'Iranweeb', 'Iran Weeb', 'دانلود مانگا', 'دانلود مانهوا', 'دانلود مانها', 'مانگا با ترجمه فارسی', 'مانهوا با ترجمه فارسی', 'مانها با ترجمه فارسی', 'وبسایت دانلود مانگا', 'وبسایت دانلود مانهوا', 'وبسایت دانلود مانها'],
    title: {
        default: 'ایران ویب: مرجع مانگا، مانهوا و مانها با ترجمه فارسی',
        template: `%s | ایران ویب`
    },
    description: 'با ایران ویب، هزاران مانگا و منهوا را به صورت رایگان دانلود کنید! اکتشاف داستان‌های هیجان‌انگیز و جذاب در وبسایت ما. به ما بپیوندید و جهان خیالی خود را کشف کنید!',
}


export default function RootLayout({children}) {

    return (
        <html lang="fa" dir={'rtl'}>
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-5VFQ06XPXH"
            />

            <Script id="google-analytics">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5VFQ06XPXH');
          `}
            </Script>


        </head>
        <body className={`bg-[#131720] text-white min-h-screen flex flex-col antialiased ${vazirmatn.className}`}>
        <UserProvider>
            <Toaster/>
            <Navbar/>

            <main>
                {children}
            </main>


            <footer
                className="flex flex-col w-full bg-[#151f30] items-center justify-center mt-20 md:py-10 gap-10">
                <div
                    className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center w-full  md:w-9/12 "}>
                    <div className={"p-5 flex flex-col gap-5"}>
                        <Link href={"/"}>
                            <h1 className={"text-3xl md:text-4xl"}>
                                <span>ایران</span>
                                <span className={"text-red-500"}> ویب</span>
                            </h1>
                        </Link>
                        <p className={"text-sm text-gray-300 text-justify"}>ایران‌ویب یکی از بزرگ‌ترین منابع فارسی برای مانهوا، مانها و مانگا با ترجمه فارسی است. ما با ارائه جدیدترین و محبوب‌ترین عناوین و ترجمه‌های باکیفیت، همواره در تلاشیم تا تجربه‌ای لذت‌بخش و متفاوت را برای علاقه‌مندان این دنیای جذاب فراهم کنیم.</p>
                        <div className={"flex gap-3"}>
                            <Link href="https://t.me/iranweeb_official"
                                  className="w-fit h-fit hover:text-blue-500 flex items-center justify-center text-blue-400 hover:scale-125 transition duration-150">
                                <Image src={'/telegram.png'} alt={"telegram icon"} width={32} height={32} />
                            </Link>
                            <Link href="https://t.me/iranweeb_official"
                                  className="w-fit h-fit hover:text-blue-500 flex items-center justify-center text-blue-400 hover:scale-125 transition duration-150">
                                <Image src={'/instagram.png'} alt={"telegram icon"} width={32} height={32} />
                            </Link>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4 p-5"}>
                        <h6 className={"text-base"}>صفحات مهم</h6>
                        <div className={"flex flex-col gap-2.5"}>
                            <Link href={"/about"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>درباره
                                ما</Link>
                            <Link href={"/contact-us"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>تماس با
                                ما</Link>
                            <Link href={"/"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>درخواست
                                عضویت در تیم</Link>
                            <Link href={"/register"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>ثبت
                                نام</Link>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-4 p-5"}>
                        <h6 className={"text-base"}>میانبر</h6>
                        <div className={"flex flex-col gap-2.5"}>
                            <Link href={"/manga"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>همه
                                مانگا</Link>
                            <Link href={"/manhwa"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>همه
                                مانهوا</Link>
                            <Link href={"/manhua"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>همه
                                مانها</Link>
                            <Link href={"/search"}
                                  className={"text-gray-300 text-sm hover:text-red-500 transition duration-300"}>جست و
                                جو</Link>
                        </div>
                    </div>
                    <div className={"flex justify-between gap-10 p-5"}>
                        <a href="https://bitpay.ir/certificate-480482-iranweeb.ir" target="_blank"><img
                            alt='bitpay logo'
                            src="https://bitpay.ir/theme/public/images/trusted-logo.svg"/></a>
                        <a referrerPolicy='origin' target='_blank'
                           href='https://trustseal.enamad.ir/?id=528665&Code=wPw86Ztxuygks40orN77AIHRYS8ypr0P'><img
                            referrerPolicy='origin'
                            src='https://trustseal.enamad.ir/logo.aspx?id=528665&Code=wPw86Ztxuygks40orN77AIHRYS8ypr0P'
                            alt='enamad logo'
                            style={{cursor: "pointer"}} code='wPw86Ztxuygks40orN77AIHRYS8ypr0P'/></a>
                    </div>

                </div>

                <div className="text-sm text-gray-300 w-full text-center pt-10 border-t border-red-500 border-opacity-10">
                    <p>
                        کلیه حقوق این وبسایت محفوظ است
                    </p>
                </div>
            </footer>

        </UserProvider>
        </body>

        </html>
    );
}

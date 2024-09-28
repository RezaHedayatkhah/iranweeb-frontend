import Link from "next/link";
import "@/app/globals.css";
import {UserProvider} from "@/context/UserContext";
import {Toaster} from 'react-hot-toast';
import Navbar from "@/app/_components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";
import Script from "next/script";

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
        <body className="bg-[#131720] text-white min-h-screen flex flex-col antialiased ">
        <UserProvider>
            <Toaster/>
            <Navbar/>

            <main>
                {children}
            </main>

            <Link href="https://t.me/IranWeeb_ir"
                  className="z-50 fixed w-fit h-fit cursor-pointer hover:text-blue-500 flex items-center justify-center mr-2 md:mr-5 md:mb-5 text-blue-400 bg-white rounded-full bottom-16 md:bottom-0 right-0">
                <FontAwesomeIcon icon={faTelegram} className={"text-5xl"}/>
            </Link>

            <footer
                className="flex w-full bg-[#151f30] items-center justify-center h-44 md:h-32 mt-20">
                <div className={"flex justify-between  items-center w-full px-5 md:px-0 md:w-9/12"}>
                    <a referrerPolicy='origin' target='_blank'
                       href='https://trustseal.enamad.ir/?id=528665&Code=wPw86Ztxuygks40orN77AIHRYS8ypr0P'><img
                        referrerPolicy='origin'
                        src='https://trustseal.enamad.ir/logo.aspx?id=528665&Code=wPw86Ztxuygks40orN77AIHRYS8ypr0P'
                        alt=''
                        style={{cursor: "pointer"}} code='wPw86Ztxuygks40orN77AIHRYS8ypr0P'/></a>
                    <div className="footer-sec1">
                        <p>
                            کلیه حقوق این وبسایت محفوظ است
                        </p>
                    </div>
                    <a href="https://bitpay.ir/certificate-480482-iranweeb.ir" target="_blank"><img
                        src="https://bitpay.ir/theme/public/images/trusted-logo.svg"/></a>
                </div>
            </footer>

        </UserProvider>
        </body>

        </html>
    );
}

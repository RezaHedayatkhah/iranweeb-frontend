import { NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';  // Import qs for querystring-style serialization

export async function POST(req) {
    const { amountInRials, factorId } = await req.json(); // Parse request body

    console.log(amountInRials)
    try {
        // Prepare the request payload for Bitpay
        const payload = {
            api: process.env.BITPAY_API,
            amount: amountInRials, // Send rials to Bitpay
            redirect: encodeURIComponent(process.env.BITPAY_REDIRECT),
            factorId: factorId,
            name: "",
            email: "",
            description: ""
        };

        // Get the client's IP address
        const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('host');

        // Send the request to Bitpay
        const response = await axios.post(
            `${process.env.BITPAY_PORTAL_URL}/gateway-send`,
            qs.stringify(payload), // Serialize payload into x-www-form-urlencoded format
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Forwarded-For': clientIp, // Pass on client's IP address
                    'Origin': 'https://iranweeb2.liara.run', // Set the expected Origin
                }
            }
        );

        const data = response.data;
        console.log('Bitpay Response:', data); // Log response for debugging

        // Handle Bitpay response codes
        switch (data) {
            case -1:
                return NextResponse.json({ message: 'خطا: API ارسالی صحیح نیست!' }, { status: 400 });
            case -2:
                return NextResponse.json({ message: 'خطا: مقدار amount داده عددی نمی‌باشد یا کمتر از 1000 ریال می‌باشد.' }, { status: 400 });
            case -3:
                return NextResponse.json({ message: 'خطا: مقدار redirect رشته null است.' }, { status: 400 });
            case -4:
                return NextResponse.json({ message: 'خطا: درگاهی با اطلاعات ارسالی شما وجود ندارد و یا در حالت انتظار می‌باشد.' }, { status: 400 });
            case -5:
                return NextResponse.json({ message: 'خطا: خطا در اتصال به درگاه، لطفا مجددا تلاش کنید.' }, { status: 400 });
            default:
                if (typeof data === 'number' && data > 0) {
                    // If the response is a positive number, assume it's the bank portal URL id
                    return NextResponse.json({ url: `${process.env.BITPAY_PORTAL_URL}/gateway-${data}-get` }, { status: 200 });
                } else {
                    return NextResponse.json({ message: 'خطا: پاسخ نامعتبر از بیت‌پی دریافت شد.' }, { status: 400 });
                }
        }
    } catch (error) {
        console.error('خطا در پرداخت:', error);

        if (error.response) {
            // Axios error handling
            return NextResponse.json({ message: error.response.data.message || 'خطا در پرداخت.' }, { status: error.response.status });
        }

        // General error handling
        return NextResponse.json({ message: 'خطای سرور. لطفا بعداً دوباره تلاش کنید.' }, { status: 500 });
    }
}

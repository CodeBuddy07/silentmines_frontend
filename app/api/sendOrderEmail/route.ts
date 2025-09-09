import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
    name: string;
    weight: string;
    quantity: number;
    price: number;
}

interface OrderData {
    orderId: string;
    total: number;
    pickupTime: string;
    phoneNumber: string;
    orderNotes: string;
    cartItems: CartItem[];
}


export async function POST(req: NextRequest) {

    const { orderData }: { orderData: OrderData } = await req.json();

    // Create a Nodemailer transporter using Resend SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com', // Resend SMTP server
        port: 587, // SMTP port
        secure: false, // use TLS
        auth: {
            user: 'resend', // Replace with your Resend email address
            pass: 're_Ei1Uav8U_2naL4MZeBMQFv3iSDY88EBhY', // Replace with your Resend SMTP API key
        },
    });

    const emailContent = `
            <h1>New Order Details</h1>
            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
            <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
            <p><strong>Pickup Time:</strong> ${orderData.pickupTime}</p>
            <p><strong>Phone Number:</strong> ${orderData.phoneNumber}</p>
            <p><strong>Order Notes:</strong> ${orderData.orderNotes}</p>
            <h2>Cart Items</h2>
            <ul>
                ${orderData.cartItems
            .map(
                (item: CartItem) => `
                    <li>${item.name} (${item.weight}) × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
            )
            .join('')}
            </ul>
        `;

    const mailOptions = {
        from: 'orders@greenlove.fun', // Replace with your Resend email address
        to: 'laxdrgreenthumb@proton.me', // Admin's email
        subject: `New Order: ${orderData.orderId}`,
        html: emailContent,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Order email sent to admin' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email with Nodemailer:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}

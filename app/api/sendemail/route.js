import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: process.env.NEXT_SERVICE,
      auth: {
        user: process.env.NEXT_GMAIL_USER,
        pass: process.env.NEXT_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_GMAIL_USER,
      to: process.env.NEXT_REDIRECT_EMAIL,
      subject: `New Inquiry Message from ${name}`,
      html: `
        <h2>You have received a new inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: 'Your message send successfully'});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send inquiry'});
  }
};
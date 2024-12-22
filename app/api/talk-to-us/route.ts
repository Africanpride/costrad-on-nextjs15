import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    // console.log(formData);

    // return NextResponse.json({status: 200});

    const { REAL_EMAIL_PASSWORD, NEXT_PUBLIC_FROM_EMAIL } = process.env;
    if (!REAL_EMAIL_PASSWORD || !NEXT_PUBLIC_FROM_EMAIL) {
      return NextResponse.json(
        { error: 'Environment variables are not set' },
        { status: 500 }
      );
    }

    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: 'abakoconsult@gmail.com',
        pass: process.env.REAL_EMAIL_PASSWORD,
      },
    });

    // Configure email
    const mailOptions = {
      from: `"The Strategic Voter Contact Form." <abakoconsult@gmail.com>`,
      replyTo: formData.email,
      to: `"The Strategic Voter." <abakoconsult@gmail.com>`,
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Message: ${formData.message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Message:</strong> <br /> ${formData.message}</p>
      `,
    };

    // Send email

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return NextResponse.json(
        { message: 'Email sent successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error:', error);
      throw error; // This will be caught by the outer try-catch
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

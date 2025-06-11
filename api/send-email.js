// Serverless function to handle email sending
// This file would be deployed to a serverless platform like Vercel or Netlify

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get email data from request body
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'لطفا همه فیلدها را پر کنید' });
  }

  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || 'pyrotech.dev@proton.me',
      subject: `پیام جدید از سایت موج پیام: ${subject}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>پیام جدید از فرم تماس سایت موج پیام</h2>
          <p><strong>نام:</strong> ${name}</p>
          <p><strong>ایمیل:</strong> ${email}</p>
          <p><strong>موضوع:</strong> ${subject}</p>
          <p><strong>پیام:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p>این ایمیل به صورت خودکار از سایت موج پیام ارسال شده است.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'پیام شما با موفقیت ارسال شد' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ message: 'خطا در ارسال ایمیل، لطفا دوباره تلاش کنید' });
  }
}

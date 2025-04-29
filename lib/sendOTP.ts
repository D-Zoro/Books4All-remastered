import nodemailer from 'nodemailer';

export async function sendOTP(email: string, otp: string) {
  try {
    // Create reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email template remains the same
    const htmlContent = `
      <div style="background-color: #0d1117; color: white; font-family: Arial, sans-serif; padding: 20px; text-align: center; border-radius: 10px;">
        <h1 style="font-size: 36px; background: linear-gradient(to right, #36d7b7, #2ecc71); -webkit-background-clip: text; color: transparent; margin-bottom: 20px;">
          Your OTP is Here!
        </h1>
        <p style="font-size: 18px; color: #c9d1d9; margin-bottom: 30px;">
          Use the OTP below to complete your verification for Books4All.
        </p>
        <div style="font-size: 24px; font-weight: bold; color: #36d7b7; background: #161b22; padding: 15px; border-radius: 5px; display: inline-block; margin-bottom: 30px;">
          ${otp}
        </div>
        <p style="font-size: 16px; color: #8b949e;">
          If you did not request this, please ignore this email.
        </p>
        <div style="margin-top: 20px;">
          <a href="https://books4all.com" style="text-decoration: none; color: #36d7b7; font-weight: bold;">
            Visit Books4All
          </a>
        </div>
      </div>
    `;

    // Create mail options
    const mailOptions = {
      from: `"Books4All" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Verification Code for Books4All',
      html: htmlContent,
      text: `Your OTP code is: ${otp}. Use this to verify your Books4All account.`, // Plain text alternative
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`OTP email sent successfully to ${email}. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
    
  } catch (err: any) {
    console.error("Error in sendOTP function:", err);
    
    // Enhanced error logging with common SMTP issues
    if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT') {
      console.error("Connection to mail server failed. Check your SMTP settings and network connectivity.");
    } else if (err.code === 'EAUTH') {
      console.error("Authentication failed. Check your SMTP username and password.");
    } else if (err.responseCode === 550) {
      console.error("Email address rejected by server. Check if the address exists.");
    } else if (err.responseCode >= 500 && err.responseCode < 600) {
      console.error("SMTP server error:", err.response);
    }
    
    throw new Error(`Failed to send OTP: ${err.message}`);
  }
}
import { Resend } from 'resend';
import { getOTPEmailTemplate } from './emailTemplates';

export async function sendOTP(email: string, otp: string) {
  try {
    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get email template from separate file
    const htmlContent = getOTPEmailTemplate(otp);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Books4All <no-reply@books4all.me>',
      to: email,
      subject: 'Your Verification Code for Books4All',
      html: htmlContent,
      text: `Your OTP code is: ${otp}. Use this to verify your Books4All account.`, // Plain text alternative
    });
    
    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }
    
    console.log(`OTP email sent successfully to ${email}. ID: ${data?.id}`);
    return { success: true, messageId: data?.id };
    
  } catch (err: any) {
    console.error("Error in sendOTP function:", err);
    
    // Enhanced error logging with Resend-specific issues
    if (err.statusCode === 401) {
      console.error("Authentication failed. Check your Resend API key.");
    } else if (err.statusCode === 403) {
      console.error("Permission error. Your API key may not have permission to send emails.");
    } else if (err.statusCode === 422) {
      console.error("Invalid request data. Check email addresses and content format.");
    } else if (err.statusCode === 429) {
      console.error("Rate limit exceeded. You're sending too many emails too quickly.");
    } else if (err.statusCode >= 500) {
      console.error("Resend server error, try again later.");
    }
    
    throw new Error(`Failed to send OTP: ${err.message}`);
  }
}
export function getOTPEmailTemplate(otp: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Books4All Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0d1117;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0d1117">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); overflow: hidden;">
          <!-- Header with gradient -->
          <tr>
            <td height="8" style="background: linear-gradient(90deg, #36d7b7, #2ecc71);"></td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td bgcolor="#1a2a3a" style="padding: 40px 30px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
              <!-- Logo -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 700; letter-spacing: -1px;">Books<span style="color: #36d7b7;">4</span>All</h1>
                  </td>
                </tr>
              </table>
              
              <!-- Heading -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <h2 style="margin: 0 0 20px; font-size: 32px; color: #36d7b7; font-weight: 700;">Verification Code</h2>
                    <p style="margin: 0 0 30px; font-size: 18px; line-height: 24px; color: #c9d1d9;">Use this code to complete your registration</p>
                  </td>
                </tr>
              </table>
              
              <!-- OTP code -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #161b22, #1a2a3a); border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); border-left: 4px solid #36d7b7;">
                      <tr>
                        <td align="center" style="padding: 25px 40px;">
                          <span style="font-size: 38px; letter-spacing: 6px; font-weight: 700; color: #36d7b7; font-family: monospace;">${otp}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <div style="height: 1px; width: 80%; background: linear-gradient(90deg, rgba(54, 215, 183, 0), rgba(54, 215, 183, 0.5), rgba(54, 215, 183, 0)); margin: 20px 0;"></div>
                  </td>
                </tr>
              </table>
              
              <!-- Additional info -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 24px; font-size: 15px; color: #8b949e; line-height: 24px;">This code will expire in 10 minutes.<br>If you didn't request this code, please ignore this email.</p>
                  </td>
                </tr>
              </table>
              
              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <a href="https://books4all.com" style="display: inline-block; padding: 10px 24px; background: linear-gradient(90deg, #36d7b7, #2ecc71); color: #0d1117; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 6px;">Visit Books4All</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Bottom border -->
          <tr>
            <td height="8" style="background: linear-gradient(90deg, #2ecc71, #36d7b7);"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
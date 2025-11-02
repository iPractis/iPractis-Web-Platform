import nodemailer from "nodemailer";

export async function sendOtpEmail(to, otp) {
  try {
    // transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "smtp"
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password (not your Gmail password!)
      },
    });

    const mailOptions = {
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Verification Code</h2>
          <p>Here is your one-time password (OTP):</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in <b>10 minutes</b>.</p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `,
    };

    // send mail
    const info = await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}

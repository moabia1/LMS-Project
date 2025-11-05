import nodemailer from "nodemailer"
import config from "./config.js"

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // true for 465, false for other ports
  auth: {
    type: "OAuth2",
    user: config.EMAIL_USER,
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    refreshToken: config.REFRESH_TOKEN
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Skill Nest" <${config.EMAIL_USER}>`, // sender address
      to:to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password Reset is <b>${otp}</b>. It expires in 5 minutes`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default sendEmail
import nodemailer from "nodemailer";
import process from "process";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async ({ to, name, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Useval" <no-reply@useval.com>`,
      to: `${name} <${to}>`,
      subject,
      html,
      replyTo: "no-reply@useval.com",
    });
  } catch (error) {
    console.error("Email send failed");
    console.error(error.message);
  }
};

export default sendEmail;
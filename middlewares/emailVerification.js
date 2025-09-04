import SibApiV3Sdk from "@sendinblue/client";
import dotenv from "dotenv";
dotenv.config();

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);
const baseUrl = process.env.BASE_URL;
export const sendVerificationEmail = async (toEmail, token) => {
  const verificationLink = `${baseUrl}/api/users/verify?token=${token}`;
  try {
    return await client.sendTransacEmail({
      sender: {
        email: "mennaelgharabawii@gmail.com",
        name: 'Menna from "exclusive ✨"',
      },
      to: [{ email: toEmail }],
      subject: "Verify your email",
      htmlContent: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
    console.error("Brevo email error:", error.response?.body || error.message);
    throw error;
  }
};

export const sendNotificationEmail = async (toEmail, message) => {
  await client.sendTransacEmail({
    sender: {
      email: "mennaelgharabawii@gmail.com",
      name: 'Menna from "exclusive ✨"',
    },
    to: [{ toEmail }],
    subject: "Profile Update Notification",
    htmlContent: `<p>${message}</p>`,
  });
};

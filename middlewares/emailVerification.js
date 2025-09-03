import SibApiV3Sdk from "@sendinblue/client";

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);



export const sendVerificationEmail = async (toEmail, token) => {

  const verificationLink = `http://localhost:${process.env.PORT}/api/users/verify?token=${token}`;

  try {
   return response = await client.sendTransacEmail({
      sender: { email: "mennaelgharabawii@gmail.com", name: "Menna from \"exclusive ✨\"" },
      to:  {toEmail},
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
    sender: { email: "mennaelgharabawii@gmail.com", name: "Menna from \"exclusive ✨\"" },
    to: [{toEmail }],
    subject: "Profile Update Notification",
    htmlContent: `<p>${message}</p>`,
  });
};

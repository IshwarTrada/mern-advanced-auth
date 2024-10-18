import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

const sendVerificationEmail = async (email, verificationCode) => {
  const recipients = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error to send verification email : ${error}`);
    throw new Error(`Failed to send verification email : ${error}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipients = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipients,
      template_uuid: "16e89a2d-82b0-4699-b4d9-6b68f3eb1178",
      template_variables: {
        company_info_name: "Auth App",
        name: name,
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error(`Error to send welcome email : ${error}`);
    throw new Error(`Failed to send welcome email : ${error}`);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error to send password reset email : ${error}`);
    throw new Error(`Failed to send password reset email : ${error}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Success",
    });
    console.log("Password Reset Success Email sent successfully", response);
  } catch (error) {
    console.error(`Error to send password reset success email : ${error}`);
    throw new Error(`Failed to send password reset success email : ${error}`);
  }
};

export { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail,sendResetSuccessEmail };

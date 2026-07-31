"use server";

import mailchimpTx from "@mailchimp/mailchimp_transactional";
import { render } from "@react-email/components";
import { WelcomeEmail } from "@/app/emails/WelcomeEmail";
import React from "react";

const mailchimp = mailchimpTx(process.env.MAILCHIMP_API_KEY as string);

export async function sendWelcomeEmailMailchimp(userEmail: string, userName: string) {
  try {
  
    const emailHtml = await render(
      React.createElement(WelcomeEmail, { userFirstName: userName })
    );

  
    const response = await mailchimp.messages.send({
      message: {
        from_email: "onboarding@yoursite.com",
        from_name: "Obsidian Base",
        subject: "Welcome to Obsidian Base! 🚀",
        html: emailHtml,
        to: [
          {
            email: userEmail,
            name: userName,
            type: "to"
          }
        ]
      }
    });

    return { success: true, data: response };
  } catch (error: any) {
    console.error("Error sending email via Mailchimp:", error);
    return { success: false, error: error.message };
  }
}
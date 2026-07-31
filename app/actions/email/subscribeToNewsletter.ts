"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, 
});

export async function subscribeToNewsletter(email: string) {
  const listId = process.env.MAILCHIMP_LIST_ID as string;

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });
    
    return { success: true, data: response };
  } catch (error: any) {
    if (error.response?.body?.title === "Member Exists") {
      return { success: true, message: "Você já está na nossa lista!" };
    }
    return { success: false, error: "Erro ao cadastrar na newsletter." };
  }
}
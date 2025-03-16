import { API_ENDPOINTS } from "@/config/api";
import { logger } from "./logger";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ASSISTANT_ID = "asst_H6bV1Mn6VCb2OuplombtzW58";

interface AssistantMessage {
  role: "assistant";
  content: Array<{
    type: "text";
    text: {
      value: string;
    };
  }>;
}

interface MessagesResponse {
  data: AssistantMessage[];
}

const parseResponse = (text: string): string => {
  // Remove citations
  text = text.replace(/【[^】]*】/g, "");
  return text;
};

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(API_ENDPOINTS.CHAT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error("Chat request failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Failed to get response: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    logger.error("Error sending message to chat service:", error);
    return "I apologize, but I'm having trouble connecting to the chat service right now. Please try again later.";
  }
};

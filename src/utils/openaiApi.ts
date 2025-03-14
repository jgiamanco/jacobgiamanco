import { devError } from "./logger";

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
    // Create a thread
    const threadResponse = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({
        metadata: {},
      }),
    });

    if (!threadResponse.ok) {
      const errorData = await threadResponse.json().catch(() => ({}));
      devError("Thread creation failed:", {
        status: threadResponse.status,
        statusText: threadResponse.statusText,
        error: errorData,
        requestBody: {
          metadata: {},
        },
      });
      throw new Error(`Failed to create thread: ${threadResponse.status}`);
    }

    const thread = await threadResponse.json();
    devError("Thread created successfully:", thread);

    // Add the user's message to the thread
    const messageResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread.id}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({
          role: "user",
          content: message,
        }),
      }
    );

    if (!messageResponse.ok) {
      const errorData = await messageResponse.json().catch(() => ({}));
      devError("Message creation failed:", {
        status: messageResponse.status,
        statusText: messageResponse.statusText,
        error: errorData,
        threadId: thread.id,
      });
      throw new Error(`Failed to add message: ${messageResponse.status}`);
    }

    const messageData = await messageResponse.json();
    devError("Message added successfully:", messageData);

    // Run the assistant
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread.id}/runs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID,
          model: "gpt-4-turbo-preview",
          instructions: `You are a helpful AI assistant that provides information about Jacob's skills, experience, and projects. Format your responses in a clear, visually appealing way using markdown.`,
        }),
      }
    );

    if (!runResponse.ok) {
      const errorData = await runResponse.json().catch(() => ({}));
      devError("Run creation failed:", {
        status: runResponse.status,
        statusText: runResponse.statusText,
        error: errorData,
        threadId: thread.id,
        assistantId: ASSISTANT_ID,
        requestBody: {
          assistant_id: ASSISTANT_ID,
          model: "gpt-4-turbo-preview",
          instructions: `You are a helpful AI assistant that provides information about Jacob's skills, experience, and projects. Format your responses in a clear, visually appealing way using markdown.`,
        },
      });
      throw new Error(`Failed to create run: ${runResponse.status}`);
    }

    const run = await runResponse.json();
    devError("Run created successfully:", run);

    // Poll for run completion
    let runStatus = run.status;
    while (runStatus === "in_progress" || runStatus === "queued") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const statusResponse = await fetch(
        `https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      devError("Run status:", runStatus);
    }

    if (runStatus !== "completed") {
      throw new Error(`Run failed with status: ${runStatus}`);
    }

    // Get the assistant's response
    const messagesResponse = await fetch(
      `https://api.openai.com/v1/threads/${thread.id}/messages`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
      }
    );

    if (!messagesResponse.ok) {
      const errorData = await messagesResponse.json().catch(() => ({}));
      devError("Message retrieval failed:", {
        status: messagesResponse.status,
        statusText: messagesResponse.statusText,
        error: errorData,
        threadId: thread.id,
      });
      throw new Error(`Failed to get messages: ${messagesResponse.status}`);
    }

    const messagesData: MessagesResponse = await messagesResponse.json();
    const assistantMessage = messagesData.data.find(
      (msg) => msg.role === "assistant"
    );

    if (!assistantMessage) {
      throw new Error("No assistant message found");
    }

    return parseResponse(assistantMessage.content[0].text.value);
  } catch (error) {
    devError("Error sending message to OpenAI:", error);
    return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};

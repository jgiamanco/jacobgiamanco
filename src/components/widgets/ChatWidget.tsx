import React, { useState } from "react";
import { Widget } from "./Widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send, Bot, User } from "lucide-react";
import { sendMessage } from "@/utils/openaiApi";
import { logger } from "@/utils/logger";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

// Initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Jacob's AI assistant. Ask me anything about his skills, experience, or projects.",
    isBot: true,
  },
];

export const ChatWidget = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get response from OpenAI
      const response = await sendMessage(input);

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      logger.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I encountered an error. Please try again later.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Widget title="AI Assistant" className="h-full">
      <div className="flex flex-col h-[280px] md:h-[320px]">
        <div className="flex-1 overflow-y-auto space-y-3 p-2 md:p-3 scrollbar-thin">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2 max-w-[85%] animate-fade-in",
                message.isBot ? "" : "ml-auto"
              )}
            >
              {message.isBot && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  "p-2.5 rounded-lg text-xs md:text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none",
                  message.isBot
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mt-6 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc space-y-1 my-2">{children}</ul>
                    ),
                    li: ({ children }) => <li className="ml-4">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-secondary px-1 rounded">
                        {children}
                      </code>
                    ),
                    p: ({ children }) => <p className="my-2">{children}</p>,
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
              {!message.isBot && (
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-2 max-w-[85%] animate-pulse">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="h-8 w-28 bg-secondary rounded-lg"></div>
            </div>
          )}
        </div>

        <div className="border-t border-border/50 p-2 mt-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Jacob's experience..."
              className="flex-1 text-xs md:text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="h-8 w-8"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </Widget>
  );
};

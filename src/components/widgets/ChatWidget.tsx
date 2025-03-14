import React, { useState } from 'react';
import { Widget } from './Widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatWidgetProps {
  id?: string;
}

// Initial messages
const initialMessages: Message[] = [
  { id: 1, text: "Hello! I'm John's AI assistant. Ask me anything about his skills, experience, or projects.", isBot: true },
];

export const ChatWidget: React.FC<ChatWidgetProps> = ({ id }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'm a demo AI that would be trained on John's professional information in a real implementation.",
        "John has 5 years of experience with React and TypeScript.",
        "John is passionate about creating beautiful, functional user interfaces.",
        "You can check out John's projects in the portfolio section.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Widget title="AI Assistant" className="md:col-span-2 md:row-span-2" id={id}>
      <div className="flex flex-col h-[300px]">
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex items-start space-x-2 max-w-[80%] animate-fade-in",
                message.isBot ? "" : "ml-auto"
              )}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div 
                className={cn(
                  "p-3 rounded-lg text-sm",
                  message.isBot 
                    ? "bg-secondary text-secondary-foreground" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.text}
              </div>
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-2 max-w-[80%] animate-pulse">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="h-10 w-32 bg-secondary rounded-lg"></div>
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
              placeholder="Ask about John's experience..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Widget>
  );
};

"use client";

import * as React from "react";
import { Send, X } from "lucide-react";
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import chatbot from "@/asset/chatbot.svg";

// import { ScrollArea } from '@/components/ui/scroll-area';
import Image from "next/image";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const securityQuestions = [
  "Which of these is the strongest password?",
  "What is two-factor authentication (2FA)?",
  "What does phishing refer to in cybersecurity?",
];

interface ChatbotProps {
  handleChatbot: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Chatbot({ handleChatbot }: ChatbotProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    { text: "Hello there! It’s nice to meet you.", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  // const [isOpen, setIsOpen] = React.useState(true);

  // Reference for auto-scrolling
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
    setInputValue("");
  };

  const handleQuestionClick = (question: string) => {
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);
  };

  // if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-full max-w-[400px] shadow-xl z-[200] bg-[#FFFFFF] rounded-[12px]">
      {/* Header Section */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-20 md:h-20 md:flex  items-center justify-center p-5 bg-[#090043] rounded-full">
            <Image src={chatbot} alt="BotAvatar" />
          </div>
          <div>
            <div className="font-semibold">ChatBot</div>
            <div className="text-sm text-green-600">Online</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleChatbot}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </CardHeader>

      {/* Main Chat Section */}
      <div className="h-[400px] md:h-[500px] overflow-y-auto">
        <CardContent className="p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {/* Invisible div for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Section */}
          <div className="mt-4 space-y-2">
            {securityQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto whitespace-normal"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </div>

      {/* Footer Section */}
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            placeholder="Type your message here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
      <div className="text-center pb-2 text-sm text-muted-foreground border-t pt-2">
        Powered by <span className="text-blue-600 font-medium">Chatbot</span>
      </div>
    </Card>
  );
}

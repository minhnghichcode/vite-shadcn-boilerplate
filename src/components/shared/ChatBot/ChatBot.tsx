import React, { useState, useRef, useEffect } from 'react';
import { Stethoscope, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Mock response (echoing the user's message back)
    setTimeout(() => {
      const botMessage: Message = {
        role: 'assistant',
        content: inputValue, // Echo the user's message as requested
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className="bg-primary text-white h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Stethoscope className="h-5 w-5" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className={cn(
          "mt-4 flex flex-col w-[350px] shadow-xl transition-all duration-300 overflow-hidden",
          isMinimized ? "h-[60px]" : "h-[500px]"
        )}>
          {/* Chat header */}
          <div className="p-3 bg-primary text-primary-foreground flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
                <AvatarFallback className="bg-primary-foreground text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-primary-foreground hover:bg-primary/90" 
                onClick={toggleMinimize}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Messages area */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={cn(
                        "max-w-[70%] px-4 py-2 rounded-xl text-sm",
                        message.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-muted rounded-tl-none"
                      )}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs opacity-70 block mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <Avatar className="h-8 w-8 ml-2 mt-1">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-3 border-t">
                <form onSubmit={sendMessage} className="flex items-center">
                  <Input
                    placeholder="Gõ tin nhắn của bạn..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={inputValue.trim() === ''}
                    className="ml-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
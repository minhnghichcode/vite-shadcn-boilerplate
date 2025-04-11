import React, { useState, useRef, useEffect } from 'react';
import { Stethoscope, X, Send, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface StreamingMessage {
  role: 'assistant';
  content: string;
}

interface DashboardChatBotProps {
  sleepAlert: string | null;
  isMockingPaused: boolean;
  onResetMocking: () => void;
}

export function DashboardChatBot({ sleepAlert, isMockingPaused, onResetMocking }: DashboardChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là COPDSense-Bot của bạn. Tôi sẽ thông báo cho bạn nếu có chỉ số sức khỏe bất thường.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<StreamingMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const streamAlert = async (alertText: string) => {
    setIsStreaming(true);
    setStreamingMessage({ role: 'assistant', content: '' });

    const words = alertText.split(' ');
    let currentText = '';
    
    // Show words rapidly for alert
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20)); // Super fast for alerts
      currentText = currentText + (i === 0 ? '' : ' ') + words[i];
      setStreamingMessage({
        role: 'assistant',
        content: currentText
      });
    }

    setMessages(messages => [...messages, {
      role: 'system',
      content: alertText,
      timestamp: new Date()
    }]);
    
    setIsStreaming(false);
    setStreamingMessage(null);
  };

  useEffect(() => {
    if (sleepAlert && isMockingPaused) {
      const alertExists = messages.some(msg => 
        msg.role === 'system' && 
        msg.content.includes('Thời gian ngủ')
      );
      
      if (!alertExists) {
        const alertText = `⚠️ ${sleepAlert} Bạn cần nghỉ ngơi nhiều hơn!`;
        streamAlert(alertText);
        setIsOpen(true);
        setIsMinimized(false);
      }
    }
  }, [sleepAlert, isMockingPaused, messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const streamResponse = async (response: string) => {
    setIsStreaming(true);
    setStreamingMessage({ role: 'assistant', content: '' });

    const words = response.split(' ');
    let currentText = '';
    
    // Show 2-3 words at a time
    for (let i = 0; i < words.length; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 150)); // Slightly faster response streaming
      const newWords = words.slice(i, i + 2).join(' ');
      currentText = currentText + (i === 0 ? '' : ' ') + newWords;
      setStreamingMessage({ // Removed unused 'prev'
        role: 'assistant',
        content: currentText
      });
    }

    setMessages(messages => [...messages, { // Removed unused 'prev'
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }]);
    
    setIsStreaming(false);
    setStreamingMessage(null);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isStreaming) return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    let botResponse = "Tôi không hiểu yêu cầu của bạn. Bạn có thể nói rõ hơn không?";
    
    const input = inputValue.toLowerCase();
    if (input.includes('reset') || input.includes('tiếp tục') || input.includes('khởi động lại')) {
      botResponse = "Tôi sẽ tiếp tục theo dõi dữ liệu cho bạn.";
      onResetMocking();
    } else if (input.includes('ngủ') || input.includes('sleep')) {
      botResponse = "Bạn nên ngủ ít nhất 7 giờ mỗi ngày để đảm bảo sức khỏe tốt.";
    } else if (input.includes('xin chào') || input.includes('hello') || input.includes('hi')) {
      botResponse = "Xin chào! Tôi đang theo dõi sức khỏe của bạn. Có gì tôi có thể giúp bạn không?";
    }
    
    await streamResponse(botResponse);
  };

  const handleResetMocking = () => {
    onResetMocking();
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: 'Đã tiếp tục theo dõi dữ liệu. Tôi sẽ thông báo nếu có chỉ số bất thường.',
        timestamp: new Date()
      }
    ]);
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Notification dot for alerts */}
      {sleepAlert && !isOpen && (
        <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
      )}
      
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        size="icon"
        className={cn(
          "bg-primary text-white h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          sleepAlert && !isOpen ? "ring-2 ring-red-500 ring-opacity-75" : ""
        )}
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
                <AvatarImage src="/src/assets/bot_logo.png" alt="AI Assistant" />
                <AvatarFallback className="bg-primary-foreground text-primary">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">COPDSense-Bot</h3>
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
                    className={`flex mb-4 ${
                      message.role === 'user' ? 'justify-end' : 
                      message.role === 'system' ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="/src/assets/bot_logo.png" alt="AI Assistant" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div 
                      className={cn(
                        "max-w-[80%] px-4 py-2 rounded-xl text-sm",
                        message.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : message.role === 'system'
                            ? "bg-red-100 text-red-700 border border-red-200"
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
                {streamingMessage && (
                  <div className="flex mb-4 justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1">

                    <AvatarImage src="/src/assets/bot_logo.png" alt="AI Assistant" />
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] px-4 py-2 rounded-xl text-sm bg-muted rounded-tl-none animate-in fade-in slide-in-from-left-2">
                      <p>{streamingMessage.content}</p>
                      <span className="text-xs opacity-70 block mt-1 text-right">
                        {formatTime(new Date())}
                      </span>
                    </div>
                  </div>
                )}
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
                    disabled={inputValue.trim() === '' || isStreaming}
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

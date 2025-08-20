'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useChatService } from '@/lib/chat-service'; // Decomentează pentru versiunea cu WebSocket
import { 
  MessageCircle, 
  Send, 
  X, 
  Clock, 
  CheckCircle2, 
  User,
  Minimize2,
  Maximize2,
  AlertCircle
} from 'lucide-react';

enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  READ = 'read'
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'support';
  timestamp: Date;
  status?: MessageStatus;
  senderName?: string;
  senderAvatar?: string;
}

interface ChatLiveProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function ChatLive({ isOpen, onClose, isMinimized = false, onToggleMinimize }: ChatLiveProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'waiting' | 'disconnected'>('connecting');
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulare conexiune și queue
  useEffect(() => {
    if (isOpen) {
      // Simulare conectare
      setConnectionStatus('connecting');
      
      setTimeout(() => {
        // Verifică dacă sunt agenți disponibili
        const agentsAvailable = Math.random() > 0.3; // 70% șanse să fie agenți disponibili
        
        if (agentsAvailable) {
          setConnectionStatus('connected');
          setIsOnline(true);
          
          // Mesaj de întâmpinare de la agent
          const welcomeMessage: Message = {
            id: '1',
            content: 'Bună ziua! Sunt Andreea din echipa de suport Mesteras.ro. Cu ce vă pot ajuta astăzi?',
            sender: 'support',
            timestamp: new Date(),
            senderName: 'Andreea - Suport',
            senderAvatar: '/api/placeholder/32/32'
          };
          setMessages([welcomeMessage]);
        } else {
          setConnectionStatus('waiting');
          setQueuePosition(Math.floor(Math.random() * 5) + 1);
          setIsOnline(false);
          
          // Mesaj automat pentru queue
          const queueMessage: Message = {
            id: '1',
            content: 'În acest moment toți agenții noștri sunt ocupați. Vă rugăm să așteptați, veți fi conectat în curând cu primul agent disponibil.',
            sender: 'support',
            timestamp: new Date(),
            senderName: 'Sistem',
            senderAvatar: '/api/placeholder/32/32'
          };
          setMessages([queueMessage]);
          
          // Simulare actualizare poziție în coadă
          const updateQueue = () => {
            setQueuePosition(prev => {
              if (prev && prev > 1) {
                const newPos = prev - 1;
                if (newPos === 0) {
                  // Conectare la agent
                  setTimeout(() => {
                    setConnectionStatus('connected');
                    setIsOnline(true);
                    
                    const welcomeMessage: Message = {
                      id: '2',
                      content: 'Vă mulțumesc pentru răbdare! Sunt Maria din echipa de suport. Cu ce vă pot ajuta?',
                      sender: 'support',
                      timestamp: new Date(),
                      senderName: 'Maria - Suport',
                      senderAvatar: '/api/placeholder/32/32'
                    };
                    setMessages(prev => [...prev, welcomeMessage]);
                  }, 2000);
                }
                return newPos;
              }
              return prev;
            });
          };

          // Actualizează poziția la fiecare 3-5 secunde
          const queueInterval = setInterval(() => {
            updateQueue();
          }, Math.random() * 2000 + 3000);

          // Cleanup interval
          setTimeout(() => {
            clearInterval(queueInterval);
          }, 15000);
        }
      }, 2000);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || connectionStatus !== 'connected') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: MessageStatus.SENDING
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulare răspuns automat după 2-3 secunde
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Înțeleg problema dvs. Vă voi ajuta imediat să o rezolvăm.',
        'Mulțumesc pentru informații. Să verific în sistem și revin cu o soluție.',
        'Este o întrebare foarte bună. Să vă explic pas cu pas cum procedați.',
        'Am găsit soluția pentru problema dvs. Iată ce trebuie să faceți:',
        'Această problemă poate fi rezolvată rapid. Vă voi ghida prin proces.'
      ];

      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'support',
        timestamp: new Date(),
        senderName: 'Andreea - Suport',
        senderAvatar: '/api/placeholder/32/32'
      };

      setMessages(prev => {
        const updatedMessages = prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: MessageStatus.READ } 
            : msg
        );
        return [...updatedMessages, supportMessage];
      });
    }, Math.random() * 2000 + 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ro-RO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 h-[600px] flex flex-col">
        {/* Chat Header */}
        <DialogHeader className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                  connectionStatus === 'connected' ? 'bg-green-500' : 
                  connectionStatus === 'waiting' ? 'bg-yellow-500' : 
                  connectionStatus === 'connecting' ? 'bg-blue-500' : 
                  'bg-red-500'
                }`} />
              </div>
              <div>
                <DialogTitle className="text-white">Chat Live</DialogTitle>
                <div className="flex items-center text-sm text-blue-100">
                  <Clock className="h-3 w-3 mr-1" />
                  {connectionStatus === 'connected' && 'Agent conectat'}
                  {connectionStatus === 'waiting' && `În așteptare${queuePosition ? ` (poziția ${queuePosition})` : ''}`}
                  {connectionStatus === 'connecting' && 'Se conectează...'}
                  {connectionStatus === 'disconnected' && 'Deconectat'}
                  {isTyping && connectionStatus === 'connected' && (
                    <span className="flex items-center gap-1 ml-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      scrie...
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {onToggleMinimize && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMinimize}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'support' && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`rounded-lg px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white ml-2' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.sender === 'support' && (
                      <div className="text-xs text-gray-500 mb-1">
                        {message.senderName}
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <div className="text-xs">
                          {message.status === MessageStatus.SENDING && <Clock className="h-3 w-3" />}
                          {message.status === MessageStatus.SENT && <CheckCircle2 className="h-3 w-3" />}
                          {message.status === MessageStatus.READ && <CheckCircle2 className="h-3 w-3 text-blue-300" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-4 border-t bg-gray-50">
          {isOnline ? (
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Scrie mesajul tău..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : connectionStatus === 'waiting' ? (
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                <AlertCircle className="h-4 w-4" />
                În așteptare la coadă...
              </div>
              <p className="text-xs text-gray-500">
                Poziția în coadă: {queuePosition || 'Se calculează...'}
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: queuePosition ? `${Math.max(10, 100 - (queuePosition * 20))}%` : '10%' }}
                ></div>
              </div>
            </div>
          ) : connectionStatus === 'connecting' ? (
            <div className="text-center p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Se conectează...
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-red-600 mb-2">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                Conexiune întreruptă
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setConnectionStatus('connecting')}
                className="text-xs"
              >
                Reconectează-te
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Răspuns în ~30 secunde</span>
            <Badge variant="secondary" className="text-xs">
              Luni-Vineri, 9:00-18:00
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

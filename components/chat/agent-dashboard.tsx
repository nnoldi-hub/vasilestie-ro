'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Send, 
  Clock, 
  Users, 
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  Settings,
  LogOut
} from 'lucide-react';

interface ChatSession {
  id: string;
  clientName: string;
  clientEmail: string;
  startTime: Date;
  lastActivity: Date;
  status: 'waiting' | 'active' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  messages: Message[];
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'client' | 'agent';
  timestamp: Date;
  agentName?: string;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  activeChats: number;
  maxChats: number;
}

export function AgentDashboard() {
  const [currentAgent, setCurrentAgent] = useState<Agent>({
    id: '1',
    name: 'Andreea Popescu',
    email: 'andreea@mesteras.ro',
    status: 'online',
    activeChats: 2,
    maxChats: 5
  });

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      clientName: 'Ion Marinescu',
      clientEmail: 'ion@example.com',
      startTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
      lastActivity: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      status: 'active',
      priority: 'high',
      unreadCount: 2,
      messages: [
        {
          id: '1',
          content: 'Salut! Am o problemă cu profilul meu de meseriași.',
          sender: 'client',
          timestamp: new Date(Date.now() - 10 * 60000)
        },
        {
          id: '2',
          content: 'Bună ziua! Cu ce vă pot ajuta?',
          sender: 'agent',
          timestamp: new Date(Date.now() - 8 * 60000),
          agentName: 'Andreea'
        },
        {
          id: '3',
          content: 'Nu pot să îmi actualizez serviciile în profil.',
          sender: 'client',
          timestamp: new Date(Date.now() - 2 * 60000)
        }
      ]
    },
    {
      id: '2',
      clientName: 'Maria Ionescu',
      clientEmail: 'maria@example.com',
      startTime: new Date(Date.now() - 5 * 60000),
      lastActivity: new Date(Date.now() - 1 * 60000),
      status: 'waiting',
      priority: 'medium',
      unreadCount: 1,
      messages: [
        {
          id: '1',
          content: 'Cum pot să îmi verific contul?',
          sender: 'client',
          timestamp: new Date(Date.now() - 5 * 60000)
        }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  const activeChat = chatSessions.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: 'agent',
      timestamp: new Date(),
      agentName: currentAgent.name
    };

    setChatSessions(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? {
            ...chat,
            messages: [...chat.messages, message],
            lastActivity: new Date(),
            status: 'active' as const
          }
        : chat
    ));

    setNewMessage('');
  };

  const handleStatusChange = (newStatus: Agent['status']) => {
    setCurrentAgent(prev => ({ ...prev, status: newStatus }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ro-RO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (startTime: Date) => {
    const duration = Math.floor((Date.now() - startTime.getTime()) / 60000);
    return `${duration} min`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar - Chat Sessions */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Agent Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentAgent.avatar} />
                <AvatarFallback>{currentAgent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(currentAgent.status)}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium">{currentAgent.name}</p>
              <p className="text-sm text-gray-500">Agent Support</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select 
              value={currentAgent.status} 
              onChange={(e) => handleStatusChange(e.target.value as Agent['status'])}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="online">Online</option>
              <option value="busy">Ocupat</option>
              <option value="away">Plecat</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            <span>Chat-uri active: {currentAgent.activeChats}/{currentAgent.maxChats}</span>
          </div>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Conversații Active</h3>
              <Badge variant="secondary">{chatSessions.length}</Badge>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="px-4 space-y-2">
              {chatSessions.map((chat) => (
                <Card 
                  key={chat.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedChat === chat.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{chat.clientName}</p>
                          <Badge className={`text-xs ${getPriorityColor(chat.priority)}`}>
                            {chat.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{chat.clientEmail}</p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(chat.startTime)}
                      </span>
                      <span>{formatTime(chat.lastActivity)}</span>
                    </div>
                    
                    <div className="mt-2">
                      <Badge 
                        variant="outline" 
                        className={chat.status === 'waiting' ? 'border-red-500 text-red-700' : ''}
                      >
                        {chat.status === 'waiting' ? 'Așteaptă răspuns' : 
                         chat.status === 'active' ? 'Activ' : 'Rezolvat'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{activeChat.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeChat.clientName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-3 w-3" />
                      <span>{activeChat.clientEmail}</span>
                      <span>•</span>
                      <span>Conversație începută {formatTime(activeChat.startTime)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Apel
                  </Button>
                  <Button variant="outline" size="sm">
                    Transfer
                  </Button>
                  <Button variant="outline" size="sm">
                    Închide
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'agent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.sender === 'agent' && message.agentName && (
                        <div className="text-xs opacity-75 mb-1">
                          {message.agentName}
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'agent' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Scrie un răspuns..."
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
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Enter pentru a trimite</span>
                <span>Ultima activitate: {formatTime(activeChat.lastActivity)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selectează o conversație
              </h3>
              <p className="text-gray-500">
                Alege o conversație din lista de pe stânga pentru a începe să răspunzi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// chat-service.ts - Service pentru gestionarea chat-ului în timp real
import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  sender: 'client' | 'agent';
  senderName: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatSession {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  agentId?: string;
  agentName?: string;
  status: 'waiting' | 'connected' | 'ended';
  priority: 'low' | 'medium' | 'high';
  startTime: Date;
  endTime?: Date;
  messages: ChatMessage[];
  metadata: {
    userAgent?: string;
    currentPage?: string;
    referrer?: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  maxConcurrentChats: number;
  currentChatCount: number;
  skills: string[];
  lastActivity: Date;
}

export class ChatService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Event listeners
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private statusHandlers: ((status: string) => void)[] = [];
  private sessionHandlers: ((session: ChatSession) => void)[] = [];

  constructor(private userId: string, private userType: 'client' | 'agent') {
    this.connect();
  }

  private connect() {
    try {
      // În producție ar fi wss://your-domain.com/ws
      const wsUrl = `ws://localhost:3001/ws?userId=${this.userId}&userType=${this.userType}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.notifyStatusHandlers('connected');
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.notifyStatusHandlers('disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyStatusHandlers('error');
      };

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  private handleMessage(data: any) {
    switch (data.type) {
      case 'new_message':
        this.notifyMessageHandlers(data.message);
        break;
      case 'session_update':
        this.notifySessionHandlers(data.session);
        break;
      case 'agent_assigned':
        this.notifySessionHandlers(data.session);
        break;
      case 'typing_indicator':
        // Handle typing indicator
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, delay);
  }

  // Public methods
  public sendMessage(sessionId: string, content: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        resolve(false);
        return;
      }

      const message = {
        type: 'send_message',
        sessionId,
        content,
        sender: this.userType,
        timestamp: new Date().toISOString()
      };

      this.ws.send(JSON.stringify(message));
      resolve(true);
    });
  }

  public createSession(clientData: Partial<ChatSession>): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not connected'));
        return;
      }

      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const sessionData = {
        type: 'create_session',
        sessionId,
        clientData: {
          ...clientData,
          id: sessionId,
          startTime: new Date().toISOString(),
          status: 'waiting'
        }
      };

      this.ws.send(JSON.stringify(sessionData));
      resolve(sessionId);
    });
  }

  public setTyping(sessionId: string, isTyping: boolean) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      type: 'typing_indicator',
      sessionId,
      isTyping,
      sender: this.userType
    };

    this.ws.send(JSON.stringify(message));
  }

  public assignAgent(sessionId: string, agentId: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      type: 'assign_agent',
      sessionId,
      agentId
    };

    this.ws.send(JSON.stringify(message));
  }

  public endSession(sessionId: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const message = {
      type: 'end_session',
      sessionId
    };

    this.ws.send(JSON.stringify(message));
  }

  // Event subscription methods
  public onMessage(handler: (message: ChatMessage) => void) {
    this.messageHandlers.push(handler);
  }

  public onStatus(handler: (status: string) => void) {
    this.statusHandlers.push(handler);
  }

  public onSession(handler: (session: ChatSession) => void) {
    this.sessionHandlers.push(handler);
  }

  private notifyMessageHandlers(message: ChatMessage) {
    this.messageHandlers.forEach(handler => handler(message));
  }

  private notifyStatusHandlers(status: string) {
    this.statusHandlers.forEach(handler => handler(status));
  }

  private notifySessionHandlers(session: ChatSession) {
    this.sessionHandlers.forEach(handler => handler(session));
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Hook pentru folosirea serviciului de chat în React
export function useChatService(userId: string, userType: 'client' | 'agent') {
  const [chatService, setChatService] = useState<ChatService | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('connecting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const service = new ChatService(userId, userType);
    
    service.onStatus((status) => {
      setConnectionStatus(status);
    });

    service.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    service.onSession((session) => {
      setSessions(prev => {
        const existingIndex = prev.findIndex(s => s.id === session.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = session;
          return updated;
        }
        return [...prev, session];
      });
    });

    setChatService(service);

    return () => {
      service.disconnect();
    };
  }, [userId, userType]);

  return {
    chatService,
    connectionStatus,
    messages,
    sessions,
    sendMessage: (sessionId: string, content: string) => chatService?.sendMessage(sessionId, content),
    createSession: (clientData: Partial<ChatSession>) => chatService?.createSession(clientData),
    setTyping: (sessionId: string, isTyping: boolean) => chatService?.setTyping(sessionId, isTyping),
  };
}

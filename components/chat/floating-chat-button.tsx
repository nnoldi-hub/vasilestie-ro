'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X } from 'lucide-react';
import { ChatLive } from './chat-live';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  // Simulare notificare pentru mesaje noi
  const handleOpenChat = () => {
    setIsOpen(true);
    setHasNewMessages(false);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={handleOpenChat}
            className="relative rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            {hasNewMessages && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 p-0 text-xs animate-pulse">
                !
              </Badge>
            )}
          </Button>
          
          {/* Tooltip/Preview */}
          <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-white rounded-lg shadow-lg p-3 max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center space-x-2 mb-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-sm">Chat Live</span>
              <Badge className="text-xs bg-green-100 text-green-700">Online</Badge>
            </div>
            <p className="text-xs text-gray-600">
              Ai o întrebare? Vorbește cu echipa noastră de suport!
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Răspuns în ~30 secunde
            </p>
          </div>
        </div>
      )}

      <ChatLive
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}


import React, { useState, useEffect } from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { MessageSquare, Users, Hash, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscordMember {
  id: string;
  username: string;
  avatar: string;
  status: string;
  avatar_url: string;
}

interface DiscordServer {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: DiscordMember[];
}

export const DiscordWidget = () => {
  const [server, setServer] = useState<DiscordServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Discord server ID - replace with your server ID if needed
  const serverId = '1094020686399356938'; // Example Discord server ID

  useEffect(() => {
    const fetchDiscordData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Discord server data');
        }
        
        const data = await response.json();
        setServer(data);
      } catch (error) {
        console.error('Error fetching Discord data:', error);
        toast({
          title: "Discord widget error",
          description: "Could not fetch Discord server data",
          variant: "destructive",
        });
        
        // Fallback to mock data
        setServer({
          id: "123456789",
          name: "Jacob's Coding Community",
          instant_invite: "https://discord.gg/example",
          presence_count: 24,
          members: [
            {
              id: "1",
              username: "jacob_dev",
              avatar: "default",
              status: "online",
              avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            {
              id: "2",
              username: "react_enthusiast",
              avatar: "default",
              status: "idle",
              avatar_url: "https://cdn.discordapp.com/embed/avatars/1.png"
            },
            {
              id: "3",
              username: "typescript_guru",
              avatar: "default",
              status: "online",
              avatar_url: "https://cdn.discordapp.com/embed/avatars/2.png"
            },
            {
              id: "4",
              username: "design_ninja",
              avatar: "default",
              status: "dnd",
              avatar_url: "https://cdn.discordapp.com/embed/avatars/3.png"
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscordData();
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-400';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const handleJoinServer = () => {
    if (server?.instant_invite) {
      window.open(server.instant_invite, '_blank');
      toast({
        title: "Opening Discord invite",
        description: "Redirecting you to the Discord server invite"
      });
    } else {
      toast({
        title: "Invite unavailable",
        description: "Could not find a valid invite link",
        variant: "destructive"
      });
    }
  };

  return (
    <Widget 
      title="Discord Community" 
      isLoading={isLoading} 
      className="md:col-span-2 md:row-span-2"
      headerContent={
        server && (
          <div className="flex items-center space-x-1">
            <div className={cn("w-2 h-2 rounded-full bg-green-500")} />
            <span className="text-xs text-muted-foreground">{server.presence_count} online</span>
          </div>
        )
      }
    >
      {server && (
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-border/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Hash className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <h3 className="font-medium">{server.name}</h3>
              <p className="text-sm text-muted-foreground">Connect with developers and share ideas</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Online Members</h4>
              </div>
              
              <div className="space-y-2 overflow-y-auto max-h-[180px] pr-2">
                {server.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={member.avatar_url} 
                        alt={member.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-widget", getStatusColor(member.status))} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.username}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Channels</h4>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/30">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">general</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">react-help</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">portfolio-showcase</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                  <Radio className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">coding-lounge</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleJoinServer}
            className="mt-4 w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md font-medium transition-colors"
          >
            Join Server
          </button>
        </div>
      )}
    </Widget>
  );
};

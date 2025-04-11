import React, { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreHorizontal, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useChatbots } from "@/hooks/useChatbots";
import { formatDate } from "@/utils/dateFormatter";
import { Chatbot } from "@/types/chatbot";
import { PaginationControls } from "@/components/shared/pagination/PaginationControls";

const ChatbotsPage: React.FC = () => {
  const { 
    chatbots, 
    isLoading, 
    error, 
    pagination, 
    setPage, 
    setPageSize 
  } = useChatbots();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredChatbots = chatbots.filter(chatbot =>
    chatbot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chatbot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <PageHeader
        title="Chatbots"
        breadcrumbs={[{ title: "Platform", href: "/" }, { title: "Chatbots" }]}
      />
      <main className="flex-1 p-6">
        <PageActions />
        <SearchAndFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onClearSearch={handleClearSearch} 
        />
        <ChatbotsContent 
          isLoading={isLoading} 
          error={error} 
          filteredChatbots={filteredChatbots} 
        />
        
        {!isLoading && !error && filteredChatbots.length > 0 && (
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
            pageSize={pagination.pageSize}
            onPageSizeChange={setPageSize}
          />
        )}
      </main>
    </div>
  );
};

const PageActions: React.FC = () => (
  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">Chatbots</h1>
    <Button>
      <Plus className="mr-2 h-4 w-4" /> New Chatbot
    </Button>
  </div>
);

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearSearch: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onClearSearch
}) => (
  <div className="mt-6 flex items-center gap-4">
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search chatbots..." 
        className="w-full pl-8" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0" 
          onClick={onClearSearch}
        >
          <span className="sr-only">Clear search</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Button>
      )}
    </div>
    <Button variant="outline">Filter</Button>
  </div>
);

interface ChatbotsContentProps {
  isLoading: boolean;
  error: string | null;
  filteredChatbots: Chatbot[];
}

const ChatbotsContent: React.FC<ChatbotsContentProps> = ({ isLoading, error, filteredChatbots }) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredChatbots.length === 0 ? (
        <EmptyState />
      ) : (
        filteredChatbots.map((chatbot) => (
          <ChatbotCard key={chatbot.id} chatbot={chatbot} />
        ))
      )}
    </div>
  );
};

const LoadingState: React.FC = () => (
  <div className="mt-6 flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-lg">Loading chatbots...</span>
  </div>
);

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-md">
    <p className="font-medium">Error loading chatbots</p>
    <p className="text-sm">{error}</p>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="col-span-full text-center p-8 border rounded-md bg-muted/20">
    <p className="text-lg font-medium">No chatbots found</p>
    <p className="text-muted-foreground">Try adjusting your search or create a new chatbot.</p>
  </div>
);

interface ChatbotCardProps {
  chatbot: Chatbot;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({ chatbot }) => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between space-y-0">
      <div>
        <CardTitle className="flex items-center">
          {chatbot.name}
          <Badge
            variant={chatbot.is_active ? "default" : "secondary"}
            className="ml-2"
          >
            {chatbot.is_active ? "active" : "inactive"}
          </Badge>
        </CardTitle>
        <CardDescription className="mt-1.5">{chatbot.description || "No description"}</CardDescription>
      </div>
      <ChatbotCardMenu />
    </CardHeader>
    <CardContent>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Temperature:</span>
          <span className="font-medium">{chatbot.temperature}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last updated:</span>
          <span>{formatDate(chatbot.updated_at)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Data sources:</span>
          <span>{chatbot.datasources.length}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm">
        View Details
      </Button>
      <Button size="sm">Test Chat</Button>
    </CardFooter>
  </Card>
);

const ChatbotCardMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuItem>Test</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ChatbotsPage;

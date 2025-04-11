import { useState, useEffect, useCallback } from 'react';
import { fetchChatbots, PaginationParams } from '@/services/chatbotService';
import { Chatbot } from '@/types/chatbot';

interface UseChatbotsResult {
  chatbots: Chatbot[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useChatbots = (): UseChatbotsResult => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9); // Default to 9 for a 3x3 grid
  const [totalItems, setTotalItems] = useState<number>(0);

  const getChatbots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const paginationParams: PaginationParams = {
        page,
        pageSize
      };
      
      const result = await fetchChatbots(paginationParams);
      setChatbots(result.data);
      setTotalItems(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching chatbots:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    getChatbots();
  }, [getChatbots]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Ensure page is within valid range
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  return {
    chatbots,
    isLoading,
    error,
    pagination: {
      page,
      pageSize,
      totalItems,
      totalPages,
    },
    setPage,
    setPageSize,
  };
};

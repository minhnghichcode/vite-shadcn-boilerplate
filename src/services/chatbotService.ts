import { Chatbot } from "@/types/chatbot";

interface FetchChatbotsResponse {
  data: Chatbot[];
  total: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export const fetchChatbots = async (
  pagination: PaginationParams = { page: 1, pageSize: 10 }
): Promise<FetchChatbotsResponse> => {
  const authToken = localStorage.getItem('auth_token');
  if (!authToken) {
    throw new Error('No auth token found in local storage');
  }
  
  const skip = (pagination.page - 1) * pagination.pageSize;
  
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/chatbots/?skip=${skip}&limit=${pagination.pageSize}`,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // API doesn't provide total count, so we'll estimate it based on results
  // In a real app, the API should ideally return total count
  const total = data.length < pagination.pageSize ? 
    skip + data.length : 
    skip + data.length + 1; // +1 to indicate there might be more
  
  return {
    data,
    total
  };
};

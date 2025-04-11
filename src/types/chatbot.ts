export interface Datasource {
  id: string;
  name: string;
  description: string;
}

export interface Chatbot {
  id: string;
  name: string;
  description: string;
  department_id: string;
  is_active: boolean;
  temperature: number;
  created_at: string;
  updated_at: string;
  datasources: Datasource[];
}

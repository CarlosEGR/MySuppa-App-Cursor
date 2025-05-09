export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          key: string;
          usage: number;
        };
        Insert: {
          name: string;
          key: string;
          usage?: number;
        };
        Update: {
          name?: string;
          key?: string;
          usage?: number;
        };
      };
    };
  };
}; 
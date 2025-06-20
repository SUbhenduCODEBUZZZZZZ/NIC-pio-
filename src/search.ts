export interface SearchResult {
  id: string;
  registrationNumber: string;
  applicantName: string;
  applicationDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  type: string;
  lastUpdated: string;
}

export type SearchType = 'registration' | 'name' | 'date' | 'status';

export interface SearchFilters {
  type: SearchType;
  value: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}
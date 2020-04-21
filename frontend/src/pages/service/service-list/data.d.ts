export interface Service {
  id: string;
  name: string;
  nodes: Service[];
  endpoints: Endpoint[];
  version: string;
  metadata: string;
  address: string;
}

export interface Endpoint {}

export interface Pagination {
  service: Service;
  total: number;
  pageSize: number;
  current: number;
}

export interface PageData {
  data: Service[];
  pagination: Partial<Pagination>;
}

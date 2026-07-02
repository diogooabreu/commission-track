export const Role = {
  ARTIST: 'ARTIST',
  CLIENT: 'CLIENT',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export const CommissionStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_PAYMENT: 'WAITING_PAYMENT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

export type CommissionStatus = (typeof CommissionStatus)[keyof typeof CommissionStatus]

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt?: string;
}

export interface Commission {
  id: string;
  title: string;
  description: string;
  price: number;
  status: CommissionStatus;
  deadline: string | null;
  clientId: string;
  artistId: string;
  createdAt?: string;
  updatedAt?: string;
  client?: User;
  artist?: User;
}

export interface CreateCommissionRequest {
  title: string;
  description: string;
  price: number;
  deadline?: string;
  clientId?: string;
  artistId?: string;
}

export interface UpdateCommissionRequest {
  title?: string;
  description?: string;
  price?: number;
  deadline?: string;
}

export interface UpdateCommissionStatusRequest {
  status: CommissionStatus;
}

export interface Delivery {
  id: string;
  fileUrl: string;
  notes: string | null;
  commissionId: string;
  createdAt: string;
}

export interface CreateDeliveryRequest {
  fileUrl: string;
  notes?: string;
  commissionId: string;
}

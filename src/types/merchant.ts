

export interface Merchant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  businessType?: string;
  isActive: boolean;
  accessToken: string;
  refreshToken: string;
  provider?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  role?: 'Admin' | 'Merchant';
  passwordChanged: boolean;
  createdAt:string

}


export type SortField = 'name' | 'businessType' | 'isActive' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
export interface RedInvoice {
  name: string;
  address: string;
  district: string;
  city: string;
  taxCode: string;
}

export interface Store {
  id?: string;
  logoUrl?: string;
  name?: string;
  address?: string;
  district?: string;
  city?: string;
  phone?: string;
  redInvoice?: RedInvoice
}
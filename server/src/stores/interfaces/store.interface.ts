import RedInvoice from "./redInvoice.interface";

export default interface IStore {
  id: string;
  logoUrl: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  redInvoice: RedInvoice;
}
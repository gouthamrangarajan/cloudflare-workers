export type cacheKVType<T> = {
  [key: string]: cacheValueType<T>;
};

type cacheValueType<T> = {
  results: T;
  expiry: Date;
};

export interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  date: Date | undefined;
}
export interface postType {
  id: number;
  userId: number;
  title: string;
  body: string;
  user: userType | undefined;
  date: Date | undefined;
}
export interface jsonPlaceholderUserType {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  date: Date | undefined;
  address: jsonPlaceholderAddressType;
  company: jsonPlaceholderCompanyType;
}
interface jsonPlaceholderAddressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
interface jsonPlaceholderCompanyType {
  name: string;
  catchPhrase: string;
  bs: string;
}

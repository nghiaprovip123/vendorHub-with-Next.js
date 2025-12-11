export type Product = {
  id: string; // MongoDB _id
  pid: string; // Unique Category ID field
  title: string;
  image: string;
  price: number;
  cid: string;
};

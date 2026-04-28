export class CreateOrderDto {
  fullName!: string;
  email!: string;
  phone!: string;
  address!: string;
  city!: string;
  zipCode!: string;
  total!: number;
  items!: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}

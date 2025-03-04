export interface IProduct {
  id: number;
  productName: string;
  productCategory: string;
  productPriceExp: number;
  productPrice: number;
  productAmount: number; // float в C#, но в TS можно использовать number
  productType: string;
  productImage: string; // В C# это byte[], возможно, тебе нужно передавать base64 строку
  smth: string;
}

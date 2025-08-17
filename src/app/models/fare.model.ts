export interface Fare {
  id?: number;
  flightNumber: string;
  ticketType: 'ECONOMY' | 'BUSINESS' | 'FIRST';  // ← added "FIRST"
  price: number;
}

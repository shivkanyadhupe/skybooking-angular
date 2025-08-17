export interface Flight {
  id?: number;
  flightNumber: string;
  airline: string;
  source: string;
  destination: string;
  departureTime: string;  // ISO format
  arrivalTime: string;    // ISO format
  totalSeats: number;
  availableSeats: number;
  fare: number;
}

export interface FlightSearchRequest {
  source: string;
  destination: string;
  departureDate: string;
}

export const baseUrl = "http://127.0.0.1:8000";
// export const baseUrl = "";

export interface Wind {
    speed: number;
    deg: number;
}
  
export interface Weather {
    status: string;
    wind: Wind;
    humidity: number;
    temp: number;
    clouds: number;
}
  
export interface ReverseGeo {
    formattedLocation: string;
}
  
export interface Location {
    latitude: number;
    longitude: number;
    speed: number;
    reverseGeo: ReverseGeo;
}
  
export interface Truck {
    id: number;
    name: string;
    location: Location;
    weather: Weather;
}
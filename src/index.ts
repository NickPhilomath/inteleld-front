export const baseUrl = "http://127.0.0.1:8000";
// export const baseUrl = "";


export interface Auth {
    refresh: string;
    access: string;
}
  
export interface Location {
    latitude: number;
    longitude: number;
    speed: number;
}
  
export interface Truck {
    id: number;
    name: string;
    location: Location;
}

export interface User {
    id: number
    first_name: string
    last_name: string
    last_login: string
    username: string
    email: string
    is_active: boolean
    date_joined: string
}

export interface Driver {
    id: number
    user: User
    cdl_number: string
    cdl_state: string
    phone: string
    address: string
    app_version: string
    notes: string
    is_active: boolean
    truck: number
    co_driver: number
}
            
export interface Alias {
    alias: string;
    title: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Location {
    address1: String;
    address2: String | null;
    address3: String | null;
    city: String;
    country: String;
    display_address: string[];
    state: String;
    zip_code: String;
}

export interface Business {
    alias: String;
    categories: Alias[];
    coordinates: Coordinates;
    display_phone: String;
    distance: number;
    id: String;
    image_url: string;
    is_closed: boolean;
    location: Location;
    name: String;
    phone: String;
    price: String;
    rating: Number;
    review_count: number;
    transactions: String[];
    url: String;
}
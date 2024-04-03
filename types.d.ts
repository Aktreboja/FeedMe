import { SetStateAction, SyntheticEvent } from "react";

export interface SearchObject {
    term: string;
    location: string;
}

export interface GoogleCoordinates {
  lat: number;
  lng: number;
}

export interface NavbarHandlers {
    searchHandler: (event: SyntheticEvent) => Promise<void>;
}
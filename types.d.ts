import { SetStateAction, SyntheticEvent } from "react";

export interface SearchObject {
    term: string;
    location: string;
  }
  
export interface NavbarHandlers {
    setTerm: React.Dispatch<SetStateAction<string>>;
    setLocation: React.Dispatch<SetStateAction<string>>; 
    searchHandler: (event: SyntheticEvent) => Promise<void>;
}
import { createContext, useContext } from "react";
import { LocationContextType, defaultLocation } from "@/types";

export const LocationContext = createContext<LocationContextType>({
  location: defaultLocation,
  setLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

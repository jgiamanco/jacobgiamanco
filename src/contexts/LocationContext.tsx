import React, { createContext, useContext, useState } from "react";
import { LocationData, LocationContextType, defaultLocation } from "@/types";

const LocationContext = createContext<LocationContextType>({
  location: defaultLocation,
  setLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<LocationData>(defaultLocation);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

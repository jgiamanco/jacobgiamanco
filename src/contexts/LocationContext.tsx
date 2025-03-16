import React, { createContext, useContext, useState } from "react";

interface LocationData {
  lat: number;
  lon: number;
  name: string;
  timezone: number; // timezone offset in seconds
}

interface LocationContextType {
  location: LocationData;
  setLocation: (location: LocationData) => void;
}

export const defaultLocation: LocationData = {
  lat: 32.7153,
  lon: -117.1573,
  name: "San Diego",
  timezone: -25200, // -7 hours in seconds (PST)
};

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

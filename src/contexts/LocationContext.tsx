import React, { useState } from "react";
import { LocationData, defaultLocation } from "@/types";
import { LocationContext } from "./location";

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

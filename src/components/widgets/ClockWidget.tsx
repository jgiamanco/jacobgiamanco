import React, { useEffect, useState } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import { useLocation } from "@/contexts/LocationContext";

export const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const { location } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Convert to local time of the selected location using timezone offset
  const getLocalTime = () => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    return new Date(utc + location.timezone * 1000);
  };

  const localTime = getLocalTime();
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  // Format hours for 12-hour clock
  const hours12 = hours % 12 || 12;
  const amPm = hours >= 12 ? "PM" : "AM";

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  // Get timezone abbreviation based on offset
  const getTimezoneAbbr = () => {
    const offset = location.timezone / 3600; // Convert seconds to hours
    const sign = offset >= 0 ? "+" : "";
    return `GMT${sign}${offset}`;
  };

  return (
    <Widget title="Clock" className="md:row-span-1">
      <div className="flex flex-col items-center justify-center h-full py-4">
        <div className="text-4xl font-light tracking-tight mb-2">
          {formatTime(hours12)}:<span>{formatTime(minutes)}</span>
          <span className="text-muted-foreground">:{formatTime(seconds)}</span>
          <span className="text-sm ml-2">{amPm}</span>
          <span className="text-xs ml-2 text-muted-foreground">
            {getTimezoneAbbr()}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {localTime.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="mt-6 relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-border/30" />
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-px h-8 bg-primary origin-bottom"
            )}
            style={{
              transform: `translate(-50%, -100%) rotate(${
                hours * 30 + minutes * 0.5
              }deg)`,
            }}
          />
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-px h-10 bg-primary/80 origin-bottom"
            )}
            style={{
              transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)`,
            }}
          />
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-0.5 h-10 bg-primary/60 origin-bottom"
            )}
            style={{
              transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)`,
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </Widget>
  );
};

import React, { useEffect, useState } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import { useLocation } from "@/contexts/location";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface ClockWidgetProps {
  className?: string;
}

export const ClockWidget = ({ className }: ClockWidgetProps) => {
  const [time, setTime] = useState(new Date());
  const { location } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const utcDate = new Date();
      // Convert timezone offset from seconds to hours for date-fns-tz
      const timezoneOffset = location.timezone / 3600;
      const timeZone = `Etc/GMT${timezoneOffset >= 0 ? "-" : "+"}${Math.abs(
        timezoneOffset
      )}`;
      const zonedDate = toZonedTime(utcDate, timeZone);
      setTime(zonedDate);
    }, 1000);

    return () => clearInterval(timer);
  }, [location.timezone]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

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
    <Widget title="Clock" className={`md:row-span-1 ${className || ""}`}>
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
          {format(time, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="text-xs text-gray-400">{location.name}</div>
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

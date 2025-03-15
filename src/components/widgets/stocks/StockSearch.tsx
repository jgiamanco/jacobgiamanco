import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { debounce } from "@/utils/debounce";

interface StockSearchProps {
  onAddStock: (symbol: string) => void;
}

export const StockSearch: React.FC<StockSearchProps> = ({ onAddStock }) => {
  const [symbol, setSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedAddStock = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        onAddStock(value.trim().toUpperCase());
        setSymbol("");
      }
    }, 500),
    [onAddStock]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) {
      setIsLoading(true);
      debouncedAddStock(symbol);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter stock symbol..."
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!symbol.trim() || isLoading}
        className="shrink-0"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

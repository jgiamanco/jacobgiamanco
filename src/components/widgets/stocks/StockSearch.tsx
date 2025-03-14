
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface StockSearchProps {
  onAddStock: (symbol: string) => void;
}

export const StockSearch: React.FC<StockSearchProps> = ({ onAddStock }) => {
  const [newStockSymbol, setNewStockSymbol] = useState('');

  const handleSubmit = () => {
    if (!newStockSymbol.trim()) return;
    onAddStock(newStockSymbol.toUpperCase());
    setNewStockSymbol('');
  };

  return (
    <div className="flex gap-2">
      <Input 
        placeholder="Add stock symbol (e.g. GOOG)" 
        value={newStockSymbol}
        onChange={(e) => setNewStockSymbol(e.target.value)}
        className="text-xs"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <Button onClick={handleSubmit} size="sm">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

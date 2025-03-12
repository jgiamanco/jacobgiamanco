
import React from 'react';
import { Widget } from './Widget';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export const ResumeWidget = () => {
  const handleDownload = () => {
    // In a real implementation, this would download an actual resume file
    alert('Resume download functionality would go here');
  };

  return (
    <Widget title="Resume" className="md:row-span-1">
      <div className="flex flex-col items-center justify-center space-y-4 py-4">
        <div className="h-20 w-16 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-lg rotate-3 transform-gpu" />
          <div className="absolute inset-0 bg-primary/10 rounded-lg -rotate-3 transform-gpu" />
          <div className="absolute inset-0 bg-widget border border-border/50 rounded-lg flex items-center justify-center shadow-sm">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-medium">My Resume</h3>
          <p className="text-sm text-muted-foreground mb-4">Download my full resume</p>
          
          <Button onClick={handleDownload} className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </Widget>
  );
};

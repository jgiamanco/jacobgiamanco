
import React from 'react';
import { Widget } from './Widget';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ResumeWidget = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // URL to your resume PDF file hosted in the public directory
    const resumeUrl = '/resume.pdf'; 
    
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Jacob_Giamanco_Resume.pdf';
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    
    // Try to download the file
    try {
      link.click();
      toast({
        title: "Download started",
        description: "Your resume download has started",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Please try again later or contact me directly for a copy",
        variant: "destructive",
      });
    } finally {
      document.body.removeChild(link);
    }
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

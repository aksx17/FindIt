
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { scraperSources, ScraperSource } from "@/utils/scraper";
import { EventsApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { ScraperApi } from "@/services/api";
const ScrapeManager = () => {
  const { toast } = useToast();
  const [sources, setSources] = useState<ScraperSource[]>(scraperSources);
  const [isLoading, setIsLoading] = useState(false);
  const [lastScraped, setLastScraped] = useState<string | null>(null);

  const handleToggleSource = (index: number) => {
    setSources(prevSources => {
      const updatedSources = [...prevSources];
      updatedSources[index] = {
        ...updatedSources[index],
        isEnabled: !updatedSources[index].isEnabled,
      };
      return updatedSources;
    });
  };

  const handleScrape = async () => {
    setIsLoading(true);
    try {
      // Get enabled source names
      const enabledSources = sources
        .filter(source => source.isEnabled)
        .map(source => source.name);
      
      if (enabledSources.length === 0) {
        toast({
          title: "Error",
          description: "Please enable at least one source to scrape",
          variant: "destructive",
        });
        return;
      }
      
      const response = await ScraperApi.scrapeSources(enabledSources);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setLastScraped(new Date().toLocaleString());
      toast({
        title: "Success",
        description: "Event scraping completed successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: `Failed to scrape events: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-6 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Scrape Manager</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Configure and manage event scraping from various sources
            </p>
            {lastScraped && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last scraped: {lastScraped}
              </p>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container px-6 mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Scraper Sources</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sources.map((source, index) => (
                    <TableRow key={source.name}>
                      <TableCell>
                        <div className={`w-3 h-3 rounded-full ${source.isEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {source.logo && (
                            <img 
                              src={source.logo} 
                              alt={`${source.name} logo`} 
                              className="w-5 h-5 object-contain" 
                            />
                          )}
                          {source.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {source.url}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <ButtonCustom
                          size="sm"
                          variant={source.isEnabled ? "outline" : "primary"}
                          onClick={() => handleToggleSource(index)}
                        >
                          {source.isEnabled ? 'Disable' : 'Enable'}
                        </ButtonCustom>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 flex justify-end">
                <ButtonCustom 
                  variant="primary"
                  className="flex items-center gap-2"
                  isLoading={isLoading}
                  onClick={handleScrape}
                >
                  {!isLoading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="1 4 1 10 7 10"></polyline>
                      <polyline points="23 20 23 14 17 14"></polyline>
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                  )}
                  <span>Start Scraping</span>
                </ButtonCustom>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ScrapeManager;

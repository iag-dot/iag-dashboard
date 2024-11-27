import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Settings,  Menu, X } from "lucide-react";
import rocket from "../assets/icons/icons8-rocket.svg";
import open from "../assets/icons/icons8-open-50.svg";
import click from "../assets/icons/icons8-webpage-click.svg";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";


export interface CampaignData {
  Campaign: string;
  Deployed: number;
  Opens: number;
  Clicks: number;
  "Open Rate": number;
  "Click Rate": number;
}

export interface ChartData {
  name: string;
  rate: number;
}

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const EnhancedDashboard: React.FC = () => {
  const [csvData, setCsvData] = useState<CampaignData[]>([]);
  const [clickRateData, setClickRateData] = useState<ChartData[]>([]);
  const [openRateData, setOpenRateData] = useState<ChartData[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYrj2z57Srvn2alEy2K9o1hlUisNZH-AKD4uUeRJtzMNxJ5mEsup1nkYN_1nfnj1FasmzVrXAgJrbQ/pub?output=csv";

  const parseCSV = (csvText: string): CampaignData[] => {
    // Split the CSV text into lines and remove any empty lines
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      // Split by comma but preserve commas within quotes
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const rowData: Partial<CampaignData> = {};
      
      headers.forEach((header, index) => {
        let value = values[index]?.replace(/"/g, '').trim() || '';
        
        switch (header) {
          case 'Deployed':
          case 'Opens':
          case 'Clicks':
            // Remove commas from numbers and convert to integer
            rowData[header as keyof Pick<CampaignData, 'Deployed' | 'Opens' | 'Clicks'>] = 
              parseInt(value.replace(/,/g, '')) || 0;
            break;
          case 'Open Rate':
          case 'Click Rate':
            // Convert percentage string to number (e.g., "48.2%" -> 48.2)
            rowData[header as keyof Pick<CampaignData, 'Open Rate' | 'Click Rate'>] = 
              parseFloat(value.replace(/%/g, '')) || 0;
            break;
          case 'Campaign':
            rowData.Campaign = value;
            break;
        }
      });
      return rowData as CampaignData;
    });
  };

  useEffect(() => {
    axios
      .get(csvUrl)
      .then((response) => {
        const parsedData = parseCSV(response.data);
        setCsvData(parsedData);
      })
      .catch((error) => console.error("Error fetching CSV data:", error));
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      // Get the last 6 months data (most recent first)
      const recentData = csvData.slice(0, 6);
      
      const clickRates: ChartData[] = recentData.map((item) => ({
        name: new Date(item.Campaign).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: item["Click Rate"]
      }));

      const openRates: ChartData[] = recentData.map((item) => ({
        name: new Date(item.Campaign).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: item["Open Rate"]
      }));

      setClickRateData(clickRates);
      setOpenRateData(openRates);
    }
  }, [csvData]);

  const calculateTopStats = () => {
    if (csvData.length === 0) return { 
      deployCount: 0, 
      openRate: 0, 
      clickRate: 0, 
      clicks: 0 
    };
    
    // Get the most recent data (first row)
    const latestData = csvData[0];
    
    return {
      deployCount: latestData.Deployed,
      openRate: latestData["Open Rate"],
      clickRate: latestData["Click Rate"],
      clicks: latestData.Clicks
    };
  };

  const topStats = calculateTopStats();

  const statCards: StatCard[] = [
    {
      title: "Deploy Count",
      value: topStats.deployCount.toLocaleString(),
      icon: rocket,
      color: "indigo",
    },
    {
      title: "Open Rate",
      value: `${topStats.openRate}%`,
      icon: open,
      color: "green",
    },
    {
      title: "Click Rate",
      value: `${topStats.clickRate}%`,
      icon: click,
      color: "blue",
    },
    {
      title: "Clicks",
      value: topStats.clicks.toLocaleString(),
      icon: click,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white shadow-sm mb-8 rounded-lg">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">
            Inagiffy Dashboard
          </h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-500" />
            ) : (
              <Menu className="h-6 w-6 text-gray-500" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="whitespace-nowrap">
              <a 
                href="https://docs.google.com/spreadsheets/d/1lDVbLYXPc6FKLq1eo46XPFlbirfECD6hsbi6A7ZmxWU/edit?gid=1791494283#gid=1791494283" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Spreadsheet
              </a>
            </Button>
            <Bell size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <Settings size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <UserButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Button variant="outline" className="w-full justify-center">
              <a 
                href="https://docs.google.com/spreadsheets/d/1lDVbLYXPc6FKLq1eo46XPFlbirfECD6hsbi6A7ZmxWU/edit?gid=1791494283#gid=1791494283" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
              >
                Spreadsheet
              </a>
            </Button>
            <div className="flex justify-center space-x-6">
              <Bell size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              <Settings size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Top Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between p-6">
                <div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg font-medium text-gray-600">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                  </CardContent>
                </div>
                <img src={stat.icon} alt={`${stat.title} icon`} className="w-12 h-12 opacity-70" />
              </div>
            </Card>
          ))}
        </section>

        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => navigate('/analytics', { state: { csvData } })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            View Full Analytics
          </Button>
        </div>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
            {
            title: "Click Rate Analysis",
            data: clickRateData,
            dataKey: "rate",
            color: "#8884d8",
            yAxisDomain: [0, 15], // Adjust the domain for Click Rate Analysis
            },
            {
            title: "Open Rate Analysis",
            data: openRateData,
            dataKey: "rate",
            color: "#82ca9d",
            yAxisDomain: [0, 100], // Keep the domain for Open Rate Analysis unchanged
            },
        ].map((chart, idx) => (
            <Card key={idx} className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">{chart.title}</h3>
                <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Last 6 Months" />
                </SelectTrigger>
                <SelectContent>
                    {["Last 6 Months", "Last 3 Months", "Last Year"].map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chart.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis
                    domain={chart.yAxisDomain} // Use the chart-specific domain
                    tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                    formatter={(value) => [`${value}%`]}
                    labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                    type="monotone"
                    dataKey={chart.dataKey}
                    stroke={chart.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
                </LineChart>
            </ResponsiveContainer>
            </Card>
        ))}
        </section>
      </main>
    </div>
  );
};

export default EnhancedDashboard;
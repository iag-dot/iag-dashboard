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
import { Bell, Settings } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import rocket from "./assets/icons/icons8-rocket.svg";
import open from "./assets/icons/icons8-open-50.svg";
import click from "./assets/icons/icons8-webpage-click.svg";

const EnhancedDashboard = () => {
  const [csvData, setCsvData] = useState([]);
  const [clickRateData, setClickRateData] = useState([]);
  const [openRateData, setOpenRateData] = useState([]);

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYrj2z57Srvn2alEy2K9o1hlUisNZH-AKD4uUeRJtzMNxJ5mEsup1nkYN_1nfnj1FasmzVrXAgJrbQ/pub?output=csv";

  const parseCSV = (csvText) => {
    // Split the CSV text into lines and remove any empty lines
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      // Split by comma but preserve commas within quotes
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const rowData = {};
      
      headers.forEach((header, index) => {
        let value = values[index]?.replace(/"/g, '').trim() || '';
        
        switch (header) {
          case 'Deployed':
          case 'Opens':
          case 'Clicks':
            // Remove commas from numbers and convert to integer
            rowData[header] = parseInt(value.replace(/,/g, '')) || 0;
            break;
          case 'Open Rate':
          case 'Click Rate':
            // Convert percentage string to number (e.g., "48.2%" -> 48.2)
            rowData[header] = parseFloat(value.replace(/%/g, '')) || 0;
            break;
          default:
            rowData[header] = value;
        }
      });
      return rowData;
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
      
      const clickRates = recentData.map((item) => ({
        name: new Date(item.Campaign).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: item["Click Rate"]
      }));

      const openRates = recentData.map((item) => ({
        name: new Date(item.Campaign).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: item["Open Rate"]
      }));

      setClickRateData(clickRates);
      setOpenRateData(openRates);
    }
  }, [csvData]);

  const calculateTopStats = () => {
    if (csvData.length === 0) return { deployCount: 0, openRate: 0, clickRate: 0, clicks: 0 };
    
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="bg-white shadow-sm mb-8 rounded-lg">
        <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-indigo-600">Inagiffy Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <Settings size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Top Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
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
          ].map((stat, idx) => (
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

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Click Rate Analysis",
              data: clickRateData,
              dataKey: "rate",
              color: "#8884d8",
            },
            {
              title: "Open Rate Analysis",
              data: openRateData,
              dataKey: "rate",
              color: "#82ca9d",
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
                    domain={[0, 100]}
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
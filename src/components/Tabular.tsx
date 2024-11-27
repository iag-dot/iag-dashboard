import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useLocation } from 'react-router-dom';

// Define the structure of the data
interface CampaignRow {
  Campaign: string; // Assuming Campaign is a date in string format
  Deployed: number; // Deployed count
  Opens: number;    // Opens count
  "Open Rate": number; // Open rate as a percentage
  Clicks: number;    // Clicks count
  "Click Rate": number; // Click rate as a percentage
}

const Tabular: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve data from location state with typing
  const campaignData: CampaignRow[] = location.state?.csvData || [];

  return (
    <>
      <div className="mb-6 pt-6">
        <Button 
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="flex items-center gap-2"
        >
          <span>←</span> Back to Dashboard
        </Button>
      </div>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Campaign Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Campaign Date</TableHead>
                  <TableHead className="text-right">Deployed</TableHead>
                  <TableHead className="text-right">Opens</TableHead>
                  <TableHead className="text-right">Open Rate</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">Click Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(row.Campaign).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.Deployed.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.Opens.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {row["Open Rate"].toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right">
                      {row.Clicks.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {row["Click Rate"].toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Tabular;

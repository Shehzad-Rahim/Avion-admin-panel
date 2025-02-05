"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12.3%",
    trend: "up",
    icon: Users,
    color: "chart-1"
  },
  {
    title: "Total Orders",
    value: "456",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "chart-2"
  },
  {
    title: "Revenue",
    value: "$12,345",
    change: "-2.1%",
    trend: "down",
    icon: DollarSign,
    color: "chart-3"
  },
  {
    title: "Growth",
    value: "+23.4%",
    change: "+4.3%",
    trend: "up",
    icon: TrendingUp,
    color: "chart-4"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`rounded-full p-2 bg-${stat.color}/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={`ml-1 text-sm ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Sales Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Search } from "@/components/search"
import StoreSwitcher from "@/components/store-switcher"
import { UserNav } from "@/components/user-nav"
import { OverviewTab } from "@/components/tab/overview";
import { AnalyticsTab } from "@/components/tab/analytics";
import { ReportsTab } from "@/components/tab/reports";
import { NotificationsTab } from "@/components/tab/notifications";

export default function DashboardPage() {

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/triad.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/triad.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <StoreSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger
                value="overview"
                onClick={() => setActiveTab("overview")}
                className={activeTab === "overview" ? "active" : ""}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                onClick={() => setActiveTab("analytics")}
                className={activeTab === "analytics" ? "active" : ""}
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                onClick={() => setActiveTab("reports")}
                className={activeTab === "reports" ? "active" : ""}
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                onClick={() => setActiveTab("notifications")}
                className={activeTab === "notifications" ? "active" : ""}
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Dynamically rendering content based on active tab */}
            <TabsContent value="overview">
              {activeTab === "overview" && <OverviewTab />}
            </TabsContent>
            <TabsContent value="analytics">
              {activeTab === "analytics" && <AnalyticsTab />}
            </TabsContent>
            <TabsContent value="reports">
              {activeTab === "reports" && <ReportsTab />}
            </TabsContent>
            <TabsContent value="notifications">
              {activeTab === "notifications" && <NotificationsTab />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
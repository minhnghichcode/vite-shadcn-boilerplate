import * as React from "react"
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/shared/AppSidebar/AppSidebar"

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="container">
            <SidebarTrigger className="mb-6" />
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

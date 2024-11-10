import { Home, Dumbbell, Apple, MessageSquareMore, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/clienthome",
    icon: Home,
  },
  {
    title: "Fitness Tracker",
    url: "/clientfitnesstracker",
    icon: Dumbbell,
  },
  {
    title: "Nutrition Tracker",
    url: "/clientnutritiontracker",
    icon: Apple,
  },
  {
    title: "Chat Rooms",
    url: "/clientchatroom",
    icon: MessageSquareMore,
  },
  {
    title: "Profile",
    url: "/clientprofile",
    icon: User,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>The Pack • Client</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
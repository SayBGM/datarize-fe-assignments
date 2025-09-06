import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { HomeIcon, UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const ITEMS = [
  {
    title: '대시보드',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: '고객 목록',
    url: '/customers',
    icon: UsersIcon,
  },
]

export const AppSidebar = () => {
  return (
    <Sidebar className="z-20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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

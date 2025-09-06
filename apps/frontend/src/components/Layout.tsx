import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />

        <main className="flex-1 relative">
          <header className="sticky top-0 z-10 bg-white flex shrink-0 items-center gap-2 border-b pt-4 mb-4">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 pb-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

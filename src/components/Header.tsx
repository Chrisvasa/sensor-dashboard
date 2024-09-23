import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MoonIcon, MenuIcon } from "lucide-react"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: "/sensors", label: "Sensor Data" },
    { to: "/stats", label: "Stats" },
  ]

  return (
    <>
      {/* Desktop header */}
      <header className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border hidden md:block">
        <nav className="container mx-auto p-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              Sensor Chadboard
            </Link>
          </div>
          
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <Button variant="outline" size="icon">
            <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </header>

      {/* Mobile bottom header */}
      <header className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-t border-border md:hidden">
        <nav className="container mx-auto p-4 flex items-center justify-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-[20px]">
              <div className="flex flex-col items-center justify-center h-full">
                <Link to="/" className="text-2xl font-bold text-primary mb-8" onClick={() => setIsOpen(false)}>
                  Sensor Chadboard
                </Link>
                <nav className="flex flex-col items-center gap-6">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-xl text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="outline" size="icon" className="mt-4">
                    <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  )
}
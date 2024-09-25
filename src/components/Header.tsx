import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MoonIcon, MenuIcon } from "lucide-react"

interface LandingPageProps {
  scrollToSection: (index: number) => void;
}

export default function Header({scrollToSection}: LandingPageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: "Status" },
    { label: "Dashboard" },
    { label: "About us" },
  ]

  return (
    <>
      {/* Desktop header */}
      <header className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-primary-300 border-opacity-50 hidden md:block">
        <nav className="container mx-auto p-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link to="" onClick={() => scrollToSection(0)} className="text-main hover:text-custom-title/80 transition-colors">
              Sensor Chadboard
            </Link>
          </div>
          
          <ul className="flex space-x-4">
            {links.map((link, index) => (
              <li key={link.label}>
                <Link
                  to=""
                  onClick={() => scrollToSection(index + 1)}
                  className="text-title hover:text-main transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <Button className="border-primary-300 border-opacity-50" variant="outline" size="icon">
            <MoonIcon className="h-[1.2rem] w-[1.2rem] text-primary-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </header>

      {/* Mobile bottom header */}
      <header className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-t border-border md:hidden">
        <nav className="container mx-auto p-4 flex items-center justify-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-primary-100 border-opacity-40">
                <MenuIcon className="h-[1.2rem] w-[1.2rem] text-primary-300 text-opacity-69" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-[20px]">
              <div className="flex flex-col items-center justify-center h-full">
                <Link to="/" className="text-2xl font-bold text-main mb-8" onClick={() => setIsOpen(false)}>
                  Sensor Chadboard
                </Link>
                <nav className="flex flex-col items-center gap-6">
                  {links.map((link, index) => (
                    <Link
                      key={link.label}
                      to=""
                      className="text-xl text-title hover:text-main transition-colors"
                      onClick={() => 
                        {
                          setIsOpen(false)
                          scrollToSection(index + 1)
                        }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button variant="outline" size="icon" className="mt-4 border-primary-300 border-opacity-50">
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] text-primary-100" />
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
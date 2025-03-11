import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader } from './Loader'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Library, List, LogOut } from "lucide-react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import Alert  from './Alert'

const NavBar = ({ userData }) => {
  const navigate = useNavigate();
  const [isLoggingOut, setLoggingOut] = useState(false);

  
  const handleLogout = async () => {
    console.log("Logging out...")
    setLoggingOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <nav className="border-b relative">
      {isLoggingOut && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50"> 
          <Loader />
        </div>
      )}
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex flex-nowrap items-center  gap-1 justify-start">
          trackz
          <span className="w-2.5 h-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-md"></span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none flex items-center gap-2">
            <div className="text-sm mr-2">
              {userData?.name}
            </div>
            <Avatar className="h-8 w-8 hover:ring-2 hover:ring-primary/50 transition">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{userData?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to={`/${userData?.name}`} className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/collections" className="flex items-center cursor-pointer">
                <Library className="mr-2 h-4 w-4" />
                <span>My Collections</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/watchlist" className="flex items-center cursor-pointer">
                <List className="mr-2 h-4 w-4" />
                <span>Watchlist</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <Alert 
              text="Log out" 
              onConfirm={handleLogout}
            />
        
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default NavBar
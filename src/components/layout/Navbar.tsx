import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import { NotificationPopover } from '../notifications/NotificationPopover'
import { cn } from '../../lib/utils/cn'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const navLinks = [
    { to: '/projects', label: 'Projects' },
    { to: '/trades', label: 'Find Trades' },
    user && { to: `/profile/${user.id}`, label: 'Profile' },
  ].filter(Boolean)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            TradesPro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => link && (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            
            {user && <NotificationPopover />}
            
            {user ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-16 bg-white border-b md:hidden transition-all duration-200 ease-in-out",
            isOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map(link => link && (
              <Link
                key={link.to}
                to={link.to}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {user && (
              <div className="py-2">
                <NotificationPopover />
              </div>
            )}
            
            {user ? (
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
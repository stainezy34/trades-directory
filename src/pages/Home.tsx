import { Link } from 'react-router-dom'
import { Briefcase, Users, Star, Shield } from 'lucide-react'
import { ProjectSearch } from '../components/projects/ProjectSearch'

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Connect with Skilled Tradespeople for Your Projects
            </h1>
            <p className="text-xl mb-8">
              Find reliable professionals or showcase your trade skills to potential clients.
            </p>

            {/* Search Section */}
            <div className="mb-12">
              <ProjectSearch />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Need a Professional */}
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h2 className="text-xl font-semibold mb-4">Need a Professional?</h2>
                <p className="mb-4">Browse skilled tradespeople or post your project.</p>
                <div className="flex gap-3">
                  <Link
                    to="/trades"
                    className="flex-1 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Find Trades
                  </Link>
                  <Link
                    to="/projects/new"
                    className="flex-1 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Post Project
                  </Link>
                </div>
              </div>

              {/* Looking for Work */}
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h2 className="text-xl font-semibold mb-4">Looking for Work?</h2>
                <p className="mb-4">Find projects that match your skills.</p>
                <div className="flex gap-3">
                  <Link
                    to="/projects"
                    className="flex-1 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Browse Projects
                  </Link>
                  <Link
                    to="/signup?type=tradesperson"
                    className="flex-1 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Join as Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Projects</h3>
              <p className="text-gray-600">
                Easily post your projects and receive competitive bids
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Professionals</h3>
              <p className="text-gray-600">
                Connect with skilled tradespeople in your area
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from real clients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Work with confidence on our secure platform
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
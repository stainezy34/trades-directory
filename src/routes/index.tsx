import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { Home } from '../pages/Home'
import { PrivateRoute } from '../components/auth/PrivateRoute'

// Lazy loaded components
const Projects = lazy(() => import('../pages/Projects'))
const NewProject = lazy(() => import('../pages/Projects/NewProject'))
const ProjectDetails = lazy(() => import('../pages/Projects/ProjectDetails'))
const Trades = lazy(() => import('../pages/Trades'))
const Profile = lazy(() => import('../pages/Profile'))
const Messages = lazy(() => import('../pages/Messages'))
const SignIn = lazy(() => import('../pages/auth/SignIn'))
const SignUp = lazy(() => import('../pages/auth/SignUp'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/messages/:id?" element={<Messages />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
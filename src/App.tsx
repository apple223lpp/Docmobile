import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { lazy, Suspense } from 'react'

const DevPreviewPage = lazy(() => import('./pages/DevPreviewPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {import.meta.env.DEV && (
          <Route
            path="/dev"
            element={
              <Suspense fallback={<div className="min-h-[100dvh] bg-[#f7f7f7]" />}>
                <DevPreviewPage />
              </Suspense>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  )
}

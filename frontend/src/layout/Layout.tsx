import { Outlet } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="bg-base-100 flex max-h-[calc(100vh-96px)] grow justify-center overflow-y-auto p-8">
        <div className="flex h-full w-4/5 max-w-[1200px] flex-col justify-between">
          {/* <h2 className="text-base-content mb-6 text-2xl">Dashboard</h2> */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

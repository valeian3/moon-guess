import { Outlet } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="dark:bg-base-100 flex max-h-[calc(100vh-96px)] grow justify-center overflow-y-auto bg-white p-8">
        <div className="flex h-full w-4/5 max-w-[1200px] flex-col justify-between">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout

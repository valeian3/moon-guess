import { Outlet } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex max-h-[calc(100vh-96px)] flex-grow flex-col justify-between overflow-y-auto bg-white p-8 dark:bg-slate-800">
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}

export default Layout

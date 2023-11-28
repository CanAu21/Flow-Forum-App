import { Outlet } from "react-router-dom"
import Header from "../Header"

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
    <Header/>

    <main className="grid grid-cols-4">
      <section className=" hidden md:block">ekran1</section>

      <section className="col-span-4 md:col-span-2 p-4">
        <Outlet/>
      </section>
      <section className=" hidden md:block">
        ekran3
      </section>
    </main>
  </div>
  )
}

export default Layout
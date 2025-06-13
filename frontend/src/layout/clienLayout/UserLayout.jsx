import Navbar from "@/components/Navbar"

export default function UserLayout({children}) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

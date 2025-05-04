import AdminPage from "@/app/components/AdminPage";

export const metadata = {
  title: "Admin Panel - My Personal Portfolio", 
  description: "Manage user data, modify account information, and access administrative settings for your portfolio's users.",
  keywords: "admin panel, user management, modify user data, admin settings, user accounts",
  author: "Hruday Kumar", 
  robots: "index, follow",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/administration`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

const page = async() => {
  
  return (
    <>
        <AdminPage  />
    </>
  )
}

export default page
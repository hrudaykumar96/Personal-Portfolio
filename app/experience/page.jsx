import ExperiencePage from "../components/ExperiencePage";

export const metadata = {
  title: "Work Experience - My Personal Portfolio",
  description: "Explore my professional experience, roles, projects, and contributions as a web developer and software engineer.", 
  keywords: "work experience, professional experience,  software engineer, frontend, backend, projects, web developer, personal portfolio, developer portfolio, Hruday Kumar Portfolio, React developer, Next.js developer, MERN stack developer, frontend developer, backend developer, JavaScript developer, Python developer, Django developer, Node.js developer, Hruday Kumar, React web developer, full-stack developer portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer, Hruday Kumar Work Experience, Hruday Kumar journey",
  author: "Hruday Kumar",
  robots: "index, follow",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/experience`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};


const Page = () => {
  return (
    <>
        <ExperiencePage/>
    </>
  )
}

export default Page
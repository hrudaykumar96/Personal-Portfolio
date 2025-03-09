import AboutPage from "../components/AboutPage";

export const metadata = {
  title: "About Me - My Personal Portfolio",
  description: "Learn more about me, my background, skills, and experience as a web developer.",
  keywords: "about me, web developer, software engineer, frontend developer, Next.js, React, web developer, personal portfolio, developer portfolio, Hruday Kumar Portfolio, React developer, Next.js developer, MERN stack developer, frontend developer, backend developer, JavaScript developer, Python developer, Django developer, Node.js developer, Hruday Kumar, React web developer, full-stack developer portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer, Hruday Kumar journey, Hruday Kumar skills, skills",
  author: "Hruday Kumar",
  robots: "index, follow",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/about`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

const page = () => {
  return (
    <div className="min-h-screen w-full">
        <AboutPage/>
    </div>
  )
}

export default page
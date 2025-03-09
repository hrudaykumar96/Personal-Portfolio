import QualificationPage from "../components/QualificationPage"

export const metadata = {
  title: "Education - My Personal Portfolio", 
  description: "Learn about my educational background, degrees, certifications, and academic achievements.",
  keywords: "education, degrees, certifications, web developer, personal portfolio, developer portfolio, Hruday Kumar Portfolio, React developer, Next.js developer, MERN stack developer, frontend developer, backend developer, JavaScript developer, Python developer, Django developer, Node.js developer, Hruday Kumar, React web developer, full-stack developer portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer, Hruday Kumar Education, Hruday Kumar Qualification, Hruday Kumar Journey, Hruday Kumar Certification, Hruday Kumar skills",
  author: "Hruday Kumar",
  robots: "index, follow",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/qualification`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

const page = () => {
  return (
    <>
        <QualificationPage/>
    </>
  )
}

export default page
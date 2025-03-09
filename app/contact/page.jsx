import ContactForm from "../forms/ContactForm";

export const metadata = {
  title: "Contact Me - My Personal Portfolio",
  description: "Get in touch with me! Use the contact form to reach out for inquiries, project collaborations, or just to say hello.",
  keywords: "contact me, web developer, portfolio, get in touch, inquiries, collaborations, web developer, personal portfolio, developer portfolio, Hruday Kumar Portfolio, React developer, Next.js developer, MERN stack developer, frontend developer, backend developer, JavaScript developer, Python developer, Django developer, Node.js developer, Hruday Kumar, React web developer, full-stack developer portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer, Hruday Kumar contact",
  author: "Hruday Kumar",
  robots: "index, follow",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/contact`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

const page = () => {
  return (
    <>
        <ContactForm/>
    </>
  )
}

export default page
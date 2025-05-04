import HomePage from "../components/HomePage";


export const metadata = {
  title: "Personal Portfolio | Home",
  description: "Welcome to my personal portfolio, I'm Hruday Kumar a passionate Full Stack Developer where I showcase my skills, projects, and experience as a web developer. Full Stack Developer | MERN Stack &amp; Django | Skilled in React &amp; Node.js for Scalable Web Solutions · Enthusiastic Full Stack Developer skilled in both frontend and backend technologies, including HTML, CSS, JavaScript, React, Node.js, Express.js, and Django. With a strong foundation in web development, I am passionate about building dynamic and user-friendly applications. I am committed to continuous learning and delivering high-quality results, eager to contribute to innovative projects that enhance user experiences.",
  keywords: "web developer, personal portfolio, developer portfolio, Hruday Kumar Portfolio, React developer, Next.js developer, MERN stack developer, frontend developer, backend developer, JavaScript developer, Python developer, Django developer, Node.js developer, Hruday Kumar, React web developer, full-stack developer portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer",
  author: "Hruday Kumar",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

const page = () => {

  return (
    <>
      <HomePage/>
    </>
  );
};

export default page;

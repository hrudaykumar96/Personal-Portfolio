import { Geist, Geist_Mono, Poppins  } from "next/font/google";
import "../globals.css";
import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
});


export const metadata = {
  title: "Hruday Kumar - Full Stack Developer | Personal Portfolio",
  description: "Welcome to my personal portfolio! I am Hruday Kumar, a passionate Full Stack Developer with expertise in building modern web applications. Explore my projects, skills, and experience with technologies like React, Next.js, MERN stack, Node.js, Django, Python, JavaScript, and more. Full Stack Developer | MERN Stack &amp; Django | Skilled in React &amp; Node.js for Scalable Web Solutions · Enthusiastic Full Stack Developer skilled in both frontend and backend technologies, including HTML, CSS, JavaScript, React, Node.js, Express.js, and Django. With a strong foundation in web development, I am passionate about building dynamic and user-friendly applications. I am committed to continuous learning and delivering high-quality results, eager to contribute to innovative projects that enhance user experiences.",
  keywords: "web developer, full stack developer, personal portfolio, React developer, Next.js developer, MERN stack, frontend developer, backend developer, JavaScript, Python developer, Django, Node.js, software engineer, React portfolio, Next.js portfolio, Hruday Kumar, web development, front-end development, back-end development, full-stack web applications, developer portfolio, professional portfolio, coding, programming, web design, web applications, full stack developer portfolio, software development, JavaScript developer, HTML, CSS, API development, database, MongoDB, Express.js, Node.js development, responsive web design, UI/UX design, tech portfolio, Hruday Kumar Personal Portfolio, Hruday Kumar Full Stack Developer, Hruday Kumar Journey, Hruday Kumar skills",
  author: "Hruday Kumar",
  canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`),
  openGraph: {
    images: '/logo.webp',
  },
};

export default function AdminLayout({ children }) {

  return (
      <div
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ToastContainer position="top-center" theme="colored" transition={Zoom} />
          {children}
      </div>
  );
}

export const PHOTO_URL = `${import.meta.env.BASE_URL}ProfilePic.jpeg`;

export const BIO = [
  {
    title: "About Me",
    content:
      "I’m a software developer with a focus on Unity (in my free time) and backend development, working mainly with C# and .NET." +
      "I enjoy designing and building systems that are clean, scalable, and well-structured, especially when it " +
      "comes to system architecture and backend-driven applications. During my studies, I developed a strong " +
      "interest in backend development and system design, particularly through research on efficient data " +
      "loading from Azure and improving Unity performance. I also enjoy working on game systems and mechanics, " +
      "where I can bring both structure and interactivity together. One of the things I’m most proud of is my " +
      "graduation internship, where I graduated with an outstanding (10), as well as my 7th semester project. " +
      "For that project, I chose to develop my own idea instead of working on a predefined company assignment. " +
      "After getting it approved, it’s now being used to showcase XR design at Fontys, which makes it especially rewarding.",
  },
  {
    title: "Beyond Coding",
    content:
      "Outside of development, I like to stay active through freerunning and longboarding, and I spend a lot of time listening to music, watching anime, and gaming.",
  },
];

export const SKILLS = ["C#", ".NET", "Azure", "TypeScript", "Git"];

export interface Internship {
  company: string;
  project: string;
  duration: string;
  description: string;
  stack: string[];
}

export const INTERNSHIPS: Internship[] = [
  {
    company: "Stofloos",
    project: "UI For Datapanel Configurations",
    duration: "March 2023 – Sep 2023",
    description:
      "A short description of what you built, what problem it solved, " +
      "and what your role was. Keep it to 2–3 sentences.",
    stack: ["TypeScript", "LitElements", "PostgreSQL", "Postman"],
  },
  {
    company: "ICT Group (ICT Netherlands)",
    project: "ICTTK Dynamic Loading",
    duration: "Feb 2025 – June 2025",
    description:
      "A short description of what you built, what problem it solved, " +
      "and what your role was. Keep it to 2–3 sentences.",
    stack: ["C#", ".NET", "Azure", "Unity", "gltf"],
  },
];

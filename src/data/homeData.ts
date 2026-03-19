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
      "During this internship, I worked on improving the process of creating Datapanel configurations within the Stofware ecosystem. " +
      `Previously, configurations were manually written in JSON, which was time-consuming and error-prone. 
      I developed a user-friendly interface using Lit Components that allows users to create and edit pages, subpages, and sections through a structured UI. ` +
      `The system automatically generates the underlying JSON, streamlining the workflow and improving both efficiency and accuracy. 
      The solution is designed to be extensible, making it easy to support new section types and future developments.`,
    stack: ["TypeScript", "LitElements", "PostgreSQL", "Postman"],
  },
  {
    company: "ICT Group (ICT Netherlands)",
    project: "ICTTK Dynamic Loading",
    duration: "Feb 2025 – June 2025",
    description:
      `During this internship, I designed and developed a system for optimizing the dynamic loading of complex 3D models in the GLB format. ` +
      `The focus was on efficient management of materials and split model structures to ensure fast and smooth loading across multiple platforms, ` +
      `including PC and XR devices. The pipeline allows users to upload a 3D model, which is then converted into the GLB format. After conversion, ` +
      `the model is automatically split into smaller components, grouped, and prepared for efficient rendering. These models are then visualized in a ` +
      `dedicated viewing application, enabling performant inspection and interaction. 
      The system is primarily used for complex industrial models, such as factory robots and production lines.`,
    stack: ["C#", ".NET", "Azure", "Unity", "gltf"],
  },
];

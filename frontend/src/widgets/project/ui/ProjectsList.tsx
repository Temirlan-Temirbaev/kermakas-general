import { IProject, ProjectCard } from "@/entities/project"
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
export const ProjectsList = ({projects} : {projects : IProject[]}) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      gsap.fromTo(
        container.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: container.current,
            // start: "top 80%",
            toggleActions: "play none none reverse",
            start : "top center",
            end : "bottom center"
          },
        }
      );
    }
  }, []);
  return <div className="w-full" ref={container}>
    <div className="w-full max-w-[1200px] mx-auto p-5">
      <div className="w-full flex flex-row gap-5 flex-wrap justify-center">
        {projects.map(project => {
          return <ProjectCard {...project} key={`project-card-${project.id}`} />
        })}
      </div>
    </div>
  </div>
}
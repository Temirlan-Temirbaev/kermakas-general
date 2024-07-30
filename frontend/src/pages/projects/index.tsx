import { IProject, getProjects } from "@/entities/project";
import { BannerProps } from "@/shared/ui/layout/Banner";
import withLayout from "@/shared/ui/layout/withLayout";
import { Calculator } from "@/widgets/calculator";
import { ProjectsList } from "@/widgets/project";

export const getServerSideProps = async () => {
  let projectsData;
  try {
    projectsData = await getProjects()
  } catch (error) {
    return {
      redirect: {
        destination: '/no-data',
        permanent: false,
      },
    };  
  }

  return {
    props: {
      projects: projectsData
    },
  };
};

const Projects = ({projects} : {projects: IProject[]}) => {
  return <>
    <ProjectsList projects={projects}/>
    <Calculator />
  </>
}

const bannerOptions: BannerProps = {
  title : "ЗАВОД ПО ПРОИЗВОДСТВУ СЭНДВИЧ-ПАНЕЛЕЙ KERMAKAS",
  subTitle : "Наше портфолио, в котором вы можете увидеть реализованные проекты, отражающие наши компетенции и уникальный подход к каждой задаче.",
  button : "Заказать проект"
  
}
// @ts-ignore
export default withLayout(Projects, bannerOptions)
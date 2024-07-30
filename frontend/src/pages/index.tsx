import { getProducts, IProduct } from "@/entities/product";
import { IProductionProcess, getProductionProcesses } from "@/entities/production-process";
import { IProject, getProjects } from "@/entities/project";
import { BannerProps } from "@/shared/ui/layout/Banner";
import withLayout from "@/shared/ui/layout/withLayout";
import { Calculator } from "@/widgets/calculator";
import { OurAdvantages, OurProducts, OurProjects, ProductionProcess } from "@/widgets/home";
export const getServerSideProps = async () => {
  const productionProcessData = await getProductionProcesses()
  const projectsData = await getProjects()
  const products = await getProducts(3)
  if (!productionProcessData || projectsData || products) {
    return {
      redirect: {
        destination: '/no-data',
        permanent: false,
      },
    };
  }
  return {
    props: {
      processData: productionProcessData,
      projects: projectsData,
      products
    },
  };
};
function Home({processData, projects, products} : {processData: IProductionProcess[], projects: IProject[], products: IProduct[]}) {
  return (
    <div className="w-full">
      <OurProducts initialData={products} />
      <ProductionProcess initialData={processData} />
      <Calculator />
      <OurAdvantages />
      <OurProjects initialData={projects} />
    </div>
  );
}

const bannerOptions: BannerProps = {
  title : "ЗАВОД ПО ПРОИЗВОДСТВУ СЭНДВИЧ-ПАНЕЛЕЙ KERMAKAS",
  subTitle : "Завод «KERMAKAS» находится в Алматинской области и специализируется на производстве сэндвич-панелей с 2009 года. Мы используем передовое оборудование и технологии, включая надежную систему замка Z-LOCK, для производства стеновых и кровельных панелей высокого качества.",
  button : "Заказать проект"
}
// @ts-ignore
export default withLayout(Home, bannerOptions)

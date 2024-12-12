import { getSectionById } from "@/seccion/actions/getSectionById";
import { UpdateSection } from "@/seccion/componentes/UpdateSection";


interface Props {
  params: {
    id: string;
  };
}

export default async function SectionIdPage({ params }: Props) {
  const section = await getSectionById(params.id);

  return (
    <div>
      <UpdateSection section={section} />
    </div>
  );
}

import { useParams } from "react-router-dom";

const EfficiencyDetails = () => {
  const { id } = useParams();
  return <h1> DETALHES DO RELATÓRIO: {id}</h1>;
};

export default EfficiencyDetails;

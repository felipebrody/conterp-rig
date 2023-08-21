import {useNavigate} from "react-router-dom";
import {useFormatDate} from "../../hooks/useFormatDate";
import {useGetEfficienciesById} from "../../hooks/useGetEfficienciesById";
import {useDataGrid} from "./components/DataGrid/useDataGrid";
import toast from "../../utils/toast";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {AxiosEfficienciesServices} from "../../services/AxiosEfficienciesServices";

export const useEfficiencyDetails = (id) => {
  const {
    efficiency,
    isFetching,
    isInitialLoading,
    isLoading: isLoadingEfficiency,
    refetch,
  } = useGetEfficienciesById(id);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPeriodDetailsModalVisible, setIsPeriodDetailsModalVisible] =
    useState(false);

  const [periodModalDescription, setPeriodModalDescription] = useState("");

  const {mutateAsync, isLoading: isLoadingRemove} = useMutation(
    AxiosEfficienciesServices.remove
  );

  useEffect(() => {
    refetch();
  }, [id]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);

      toast({
        type: "sucess",
        text: "Registro deletado com sucesso!",
      });

      navigate(`/user/home`);
    } catch (error) {
      console.log(error);
      toast({
        type: "error",
        text: "Ocorreu um erro ao deletar o registro!",
      });
    }

    setIsDeleteModalVisible((prevState) => !prevState);
  };

  const handleDeleteModalVisibility = () => {
    setIsDeleteModalVisible((prevState) => !prevState);
  };

  const handlePeriodModalVisibility = (description) => {
    setIsPeriodDetailsModalVisible((prevState) => !prevState);
    setPeriodModalDescription(description);
  };

  const date = useFormatDate(efficiency?.date);

  return {
    date,
    efficiency,
    handleDelete,
    handleDeleteModalVisibility,
    isDeleteModalVisible,
    isLoadingRemove,
    isPeriodDetailsModalVisible,
    handlePeriodModalVisibility,
    periodModalDescription,
  };
};

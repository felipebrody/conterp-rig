export const useFormatDate = (date) => {
  const dateObj = new Date(date);
  dateObj.setHours(dateObj.getHours() + 12);

  console.log("Efficiencies ======>", date);

  if (!date) {
    return "";
  }
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} de ${month} ${year}`;
};

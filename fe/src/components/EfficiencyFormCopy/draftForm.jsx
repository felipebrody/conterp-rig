import { Formik, FieldArray } from "formik";

const initialValues = {
  periods: [
    { startHour: "", endHour: "", description: "", classification: "" },
  ],
};

const MyForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ periods }) => {
        // Lógica para lidar com os valores submetidos
        console.log(periods);
      }}
    >
      {({ handleSubmit, values, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="periods">
            {({ push, remove }) => (
              <div>
                {values.periods.map((period, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`periods[${index}].startHour`}
                      value={period.startHour}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={`periods[${index}].endHour`}
                      value={period.endHour}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={`periods[${index}].description`}
                      value={period.description}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={`periods[${index}].classification`}
                      value={period.classification}
                      onChange={handleChange}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      startHour: "",
                      endHour: "",
                      description: "",
                      classification: "",
                    })
                  }
                >
                  Adicionar
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Enviar</button>
        </form>
      )}
    </Formik>
  );
};

export default MyForm;

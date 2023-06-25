import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.number(),
  nombre: yup.string().required("El nombre es obligatorio"),
  lugar: yup.string().required("El Lugar es obligatorio"),
  fecha: yup.date().required("La fecha es obligatoria"),
  organizador: yup.string().required("El organizador es obligatorio"),
  contacto: yup
    .string()
    .required("El contacto es obligatorio")
    .email("Email incorrecto"),
});

const App = () => {
  const [formData, setFormData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const enviar = (data) => {
    const formIndex = formData.findIndex((item) => item.id === data.id);
    if (formIndex !== -1) {
      const newFormData = [...formData];
      newFormData[formIndex] = data;
      setFormData(newFormData);
    } else {
      data.id = nextId;
      setNextId(nextId + 1);
      setFormData([...formData, data]);
      reset();
    }
  };
  const handleBorrar = (formIndex) => {
    const newFormData = formData.filter(
      (formItem) => formItem.id === formIndex
    );
    setFormData(newFormData);
  };
  const handleEditar = (formItem) => {
    setValue("id", formItem.id);
    setValue("nombre", formItem.nombre);
    setValue("lugar", formItem.lugar);
    setValue("fecha", formItem.fecha);
    setValue("organizador", formItem.organizador);
    setValue("contacto", formItem.contacto);
  };

  return (
    <>
      <form onSubmit={handleSubmit(enviar)}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            defaultValue="Juan Perez"
            {...register("nombre")}
            className={"form-control"}
          />
          {errors.nombre && (
            <small className={"text-danger"}>{errors.nombre.message}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lugar">Lugar:</label>
          <input {...register("lugar")} className={"form-control"} />
          {errors.lugar && (
            <small className={"text-danger"}>{errors.lugar.message}</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            {...register("fecha")}
            className={"form-control"}
            type="date"
          />
          {errors.fecha && (
            <small className={"text-danger"}>{errors.fecha.message}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="organizador">Organizador:</label>
          <input {...register("organizador")} className={"form-control"} />
          {errors.organizador && (
            <small className={"text-danger"}>
              {errors.organizador.message}
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contacto">Contacto:</label>
          <input {...register("contacto")} className={"form-control"} />
          {errors.contacto && (
            <small className={"text-danger"}>{errors.contacto.message}</small>
          )}
        </div>
        <button type="submit" className={"btn btn-primary"}>
          Enviar
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              ID
            </th>
            <th scope="col" className="text-center">
              Nombre
            </th>
            <th scope="col" className="text-center">
              Lugar
            </th>
            <th scope="col" className="text-center">
              Fecha
            </th>
            <th scope="col" className="text-center">
              Organizador
            </th>
            <th scope="col" className="text-center">
              Contacto
            </th>
          </tr>
        </thead>
        <tbody>
          {formData?.map((formItem, index) => (
            <tr key={index}>
              <td className="text-center">{formItem.id}</td>
              <td className="text-center">{formItem.nombre}</td>
              <td className="text-center">{formItem.lugar}</td>
              <td className="text-center">
                {formItem.fecha.toLocaleDateString()} -
                {formItem.fecha.toLocaleTimeString().substr(0, 5)}hs.
              </td>
              <td className="text-center">{formItem.organizador}</td>
              <td className="text-center">{formItem.contacto}</td>
              <td className="text-center text-nowrap">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditar(formItem)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="ms-1 btn btn-sm btn-danger"
                  onClick={() => handleBorrar(formItem.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;

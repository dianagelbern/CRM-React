import React from "react";
import { IClient } from "../interfaces/IClient";
import { Form, useNavigate, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action(params:any) {
  await eliminarCliente(params.params.clienteId)
  return redirect("/")
}

const Cliente: React.FC<{ cliente: IClient }> = (props) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{props.cliente.nombre}</p>
        <p className="">{props.cliente.empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {props.cliente.email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {props.cliente.telefono}
        </p>
      </td>
      <td className="p-6  flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${props.cliente.id}/editar`)}
        >
          Editar
        </button>
        <Form
        method="post"
        action={`/clientes/${props.cliente.id}/eliminar`}
        onSubmit={(e) => {
          if(!confirm("¿Deseas eliminar este registro?")){
            e.preventDefault();
          };
        }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;

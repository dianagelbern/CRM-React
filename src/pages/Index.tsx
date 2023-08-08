import { useLoaderData } from "react-router-dom";
import { IClient } from "../interfaces/IClient";
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader() {
   const clientes = obtenerClientes();
   return clientes;
}

const Index = () => {
  const clientes = useLoaderData() as IClient[];

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clientes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Cliente</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <Cliente cliente={c} key={c.id}/>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-18">No hay Clientes aún</p>
      )}
    </>
  );
};

export default Index;

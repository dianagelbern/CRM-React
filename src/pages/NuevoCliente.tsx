import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarcliente } from "../data/clientes";
import { IClient } from "../interfaces/IClient";

export async function action(request: any) {
  const formData = await request.request.formData();
  const datos = Object.fromEntries(formData) as IClient;
  const email = formData.get("email");

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const errores = [];

  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  if (!regex.test(email)) {
    errores.push("El email no es válido");
  }

  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarcliente(datos);

  return redirect('/');
}

const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData() as Object[];
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo Cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800  text-white px-3 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error mensaje={error} key={i} />)}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;

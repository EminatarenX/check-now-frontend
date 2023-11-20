import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  DocumentIcon
} from "@heroicons/react/20/solid";
import {formatearFecha} from '../../helpers/index'
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerCategoriasAction,
  obtenerEmpleadosAction,
  generarNominaAction,
  obtenerNominasAction
} from "../../actions/empresasAction";

export default function Nominas() {
  const dispatch = useDispatch();
  const { nominas, loadingNomina, mensaje, loading, departamentos, categorias, empleados } =
    useSelector((state) => state.empresa);

  const [filtro, setFiltro] = useState({departamento: "todos",categoria: "",empleado: "",});
  const [filtrados, setFiltrados] = useState([]);

  const filtrarYOrdenarTrabajadores = () => {
    let empleadosFiltrados = [...empleados];

    if (filtro.departamento && filtro.departamento !== "todos") {
      empleadosFiltrados = empleadosFiltrados.filter(
        (empleado) =>
          empleado.plaza.categoria.departamento._id === filtro.departamento
      );
    }

    if (filtro.categoria && filtro.categoria !== "todos") {
      empleadosFiltrados = empleadosFiltrados.filter(
        (empleado) => empleado.plaza.categoria._id === filtro.categoria
      );
    }

    if (filtro.empleado) {
      empleadosFiltrados = empleadosFiltrados.filter((empleado) =>
        empleado.usuario.nombre
          .toLowerCase()
          .includes(filtro.empleado.toLowerCase())
      );
    }

    if (filtro.departamento === "todos") {
      empleadosFiltrados = [];
    }

    empleadosFiltrados.sort((a, b) =>
      a.usuario.nombre.localeCompare(b.usuario.nombre)
    );
    setFiltrados(empleadosFiltrados);
  };


  const generarNomina = async (empleado) => {

    const result = await Swal.fire({
      title: "Aviso",
      html: `
      <div id="modal" style="text-align: left;font-size: 13px;">
      <h2 style="font-weight: 700;">Generando tu recibo de nómina</h2>
      <p>
          Estamos calculando tu sueldo y las deducciones correspondientes de acuerdo a varios parámetros y 
          regulaciones fiscales. Puedes estar seguro de que estamos haciendo los cálculos correctos ya que 
          estamos al tanto de las leyes fiscales y del trabajador.
      </p>
      <p>
          Esto incluye, pero no se limita a, lo siguiente:
      </p>
      <br>
      <ul style="list-style-type: disc; padding-left: 40px;">
          <li>Aplicación de las tablas del Anexo 8 para el cálculo del subsidio.</li>
          <li>Cálculo de las cuotas obrero-patronales.</li>
          <li>Determinación de tu sueldo de acuerdo al factor de integración.</li>
      </ul>
      <br>
      <p>
          Apreciamos tu colaboración mientras trabajamos para proporcionarte un recibo de nómina preciso y detallado.
      </p>
  </div>
  

      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    const generar =  await Swal.fire({
      title: "Generar recibo de nómina",
      html:
        `
        <div style="text-align: center;">
        <p style="font-size: 14px">Nombre del empleado: <span>${empleado.usuario.nombre} ${empleado.usuario.apellidos}</span></p>
        <p style="font-size: 14px">Plaza: <span>${empleado.plaza.nombre}</span></p>
        </div>

        `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Generar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#EF4444",
      confirmButtonColor: "#10B981",

    });

    if(!generar.isConfirmed) return

    const nomina = {
      empleado: empleado._id,
    }

    const data = await dispatch(generarNominaAction(nomina));
    
    if(data) {
      Swal.fire({
        title: data.msg,
        text: "Se ha enviado un correo al empleado con su recibo de nómina.",
        icon: "success",
        confirmButtonColor: "#10B981",
        confirmButtonText: "Aceptar",
      });
    }

  };


  useEffect(() => {
    filtrarYOrdenarTrabajadores();

    if (filtro.departamento !== "todos")
      dispatch(obtenerCategoriasAction(filtro.departamento));
  }, [filtro]);

  useEffect(() => {
    dispatch(obtenerNominasAction());
    dispatch(obtenerEmpleadosAction());
  }, []);

  return (
    <>
    
    <main className="bg-emerald-950">
      <section className="bg-white min-h-[500px] rounded-tl-[100px]  p-14 lg:p-20">
        <h1 className="text-emerald-900 text-4xl font-semibold">Recibos</h1>
        <p className="text-lg text-emerald-600 mt-2">
          Genera recibos de nómina para tus empleados.
        </p>

        <div className="mt-10">
          <nav className="flex items-center mt-10">
            <ul className={`flex gap-5 w-full lg:flex-row flex-col`}>
              <select
                name="filtro"
                onChange={(e) =>
                  setFiltro({ ...filtro, departamento: e.target.value })
                }
                className="bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none"
              >
                <option value="todos">DEPARTAMENTO </option>

                {departamentos.length === 0
                  ? null
                  : departamentos.map((departamento) => (
                      <option
                        key={departamento._id}
                        className="uppercase"
                        value={departamento._id}
                      >
                        {departamento.nombre.replace(/-/g, " ").toUpperCase()}
                      </option>
                    ))}
              </select>
              <select
                name="categoria"
                onChange={(e) =>
                  setFiltro({ ...filtro, categoria: e.target.value })
                }
                className="bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none"
              >
                <option className="uppercase" value="todos">
                  CATEGORIA / EQUIPO{" "}
                </option>
                {categorias.length === 0
                  ? null
                  : categorias.map((categoria) => (
                      <option
                        key={categoria._id}
                        className="uppercase"
                        value={categoria._id}
                      >
                        {categoria.nombre.replace(/-/g, " ").toUpperCase()}
                      </option>
                    ))}
              </select>
              <input
                type="text"
                placeholder="Buscar nombre"
                className="placeholder:text-neutral-400 bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none"
                onChange={(e) =>
                  setFiltro({ ...filtro, empleado: e.target.value })
                }
              />
            </ul>
          </nav>
          <div className="overflow-x-scroll overflow-y-scroll lg:overflow-x-hidden min-h-[200px] max-h-[400px]">
            <table className="table-auto bg-white p-2 rounded min-w-[800px] gap-1 mt-5 w-full">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                    Nombre
                  </th>
                  <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                    Apellidos
                  </th>
                  <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                    Correo
                  </th>
                  <th className="py-2 text-left border-b border-gray-400 text-emerald-900">
                    Teléfono
                  </th>
                  <th className="border-b border-gray-400 text-emerald-900"></th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-emerald-600 text-center p-4"
                    >
                      No hay trabajadores
                    </td>
                  </tr>
                ) : (
                  filtrados.map((empleado, i) => (
                    <tr
                      key={empleado._id}
                      className={`${
                        (i + 1) % 2 === 0 ? "bg-white" : "bg-neutral-100"
                      } rounded w-full shadow animate-entrada border-b`}
                    >
                      <td className="text-emerald-950 text-sm capitalize py-1">
                        {empleado.usuario.nombre}
                      </td>
                      <td className="text-emerald-950 text-sm capitalize">
                        {empleado.usuario.apellidos}
                      </td>
                      <td className="text-emerald-950 text-sm ">
                        {empleado.usuario.correo}
                      </td>
                      <td className="text-emerald-950 text-sm ">
                        {empleado.usuario.telefono}
                      </td>
                      <td className="text-emerald-700 cursor-pointer text-sm">
                        <button
                          type="button"
                          onClick={() => generarNomina(empleado)}
                        >
                          Generar nomina
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <h2 className="text-emerald-900 text-4xl font-semibold mt-10">
            Recibos generados
          </h2>
          {
            nominas.length === 0 ? <p className="text-neutral-600 mt-5">{mensaje}</p> : 
            loadingNomina ? <p className="text-neutral-600 mt-5 text-center">cargando</p> :(
             
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-10 gap-2">
                    {
                      nominas.map( nomina => (
                        <button key={nomina._id} className="flex flex-col items-center animate-entrada"
                          onClick={() => window.open(nomina.url)}
                          type="button"
                        >
                          <DocumentIcon className="text-red-500 h-20"/>
                          <p className="text-emerald-900 text-center text-sm">{nomina.empleado.usuario.nombre} {nomina.empleado.usuario.apellidos}</p>
                          <p className="text-emerald-900 text-center text-xs">{formatearFecha(nomina.fecha_emision)}</p>
                        </button>
                      ))
                    }
                </div>
            

            )
          }

        </div>
      </section>
      
    </main>
    </>
  );
}

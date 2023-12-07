import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerCategoriasAction,
  obtenerEmpleadosAction,
  generarNominaAction,
  obtenerNominasAction,
} from "../../actions/empresasAction";
import Nomina from "../../components/admin/Nomina";

export default function Nominas() {
  const dispatch = useDispatch();
  const {
    nominas,
    loadingNomina,
    mensaje,
    loading,
    departamentos,
    categorias,
    empleados,
  } = useSelector((state) => state.empresa);

  const [filtro, setFiltro] = useState({
    departamento: "todos",
    categoria: "",
    empleado: "",
  });
  const [filtrados, setFiltrados] = useState([]);
  const [nominaCustom, setNominaCustom] = useState({
    empleado: "",
    nombre: "",
    percepciones: [
      {
        name: "",
        value: "",
      },
    ],
    deducciones: [
      {
        name: "",
        value: "",
      },
    ],
    formulario: false,
  });

  const handlePercepcionChange = (e, index) => {
    const newPercepciones = [...nominaCustom.percepciones];
    newPercepciones[index] = {
      ...newPercepciones[index],
      [e.target.name]: e.target.value,
    };
    setNominaCustom({ ...nominaCustom, percepciones: newPercepciones });
  };

  const addPercepcion = () => {
    if(nominaCustom.percepciones[nominaCustom.percepciones.length - 1].name === "" || nominaCustom.percepciones[nominaCustom.percepciones.length - 1].value === "") {
      return Swal.fire({
        title: "Error",
        text: "Debes llenar los campos de la percepcion anterior",
        icon: "error",
        confirmButtonColor: "#10B981",
        confirmButtonText: "Aceptar",
      });
    }
    setNominaCustom({
      ...nominaCustom,
      percepciones: [...nominaCustom.percepciones, { name: "", value: "" }],
    });
  };
  // deducciones
  const handleDeduccionChange = (e, index) => {
    const newDeducciones = [...nominaCustom.deducciones];
    newDeducciones[index] = {
      ...newDeducciones[index],
      [e.target.name]: e.target.value,
    };
    setNominaCustom({ ...nominaCustom, deducciones: newDeducciones });
  };

  const addDeduccion = () => {
    if(nominaCustom.deducciones[nominaCustom.deducciones.length - 1].name === "" || nominaCustom.deducciones[nominaCustom.deducciones.length - 1].value === "") {
      return Swal.fire({
        title: "Error",
        text: "Debes llenar los campos de la percepcion anterior",
        icon: "error",
        confirmButtonColor: "#10B981",
        confirmButtonText: "Aceptar",
      });
    }
    setNominaCustom({
      ...nominaCustom,
      deducciones: [...nominaCustom.deducciones, { name: "", value: "" }],
    });
  };

  const crearNominaCustom = (e) => {
    e.preventDefault()
    if(nominaCustom.empleado === "" || nominaCustom.nombre === "") {
      return Swal.fire({
        title: "Ups...",
        text: "Debes llenar todos los campos",
        icon: "warning",
        confirmButtonColor: "#10B981",
        confirmButtonText: "Aceptar",
      });
      
    }
    console.log(nominaCustom)
  }

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

    const generar = await Swal.fire({
      title: "Generar recibo de nómina",
      html: `
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

    if (!generar.isConfirmed) return;

    const nomina = {
      empleado: empleado._id,
    };

    const data = await dispatch(generarNominaAction(nomina));

    if (data) {
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
  }, [filtro.departamento, filtro.categoria]);

  useEffect(() => {
    dispatch(obtenerNominasAction());
    dispatch(obtenerEmpleadosAction());
  }, []);

  return (
    <>
      <main className="bg-emerald-950">
        <section className="bg-white min-h-[500px] rounded-tl-[100px] p-14 lg:p-20">
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
                  className="text-sm bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none"
                >
                  <option value="todos">
                    -- Seleccione un departamento --
                  </option>

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
                  className="text-sm bg-transparent border-b-2 border-emerald-800 text-emerald-800 outline-none"
                >
                  <option className="uppercase" value="todos">
                    -- Seleccione una categoria --
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
            <div className="overflow-x-scroll overflow-y-scroll lg:overflow-x-hidden min-h-[100px] max-h-[400px]">
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
                        className="text-emerald-800 text-center p-4"
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-10 gap-4 min-h-[100px] mb-20">
              {nominas.length === 0 ? (
                <p className="text-emerald-800 col-span-2">{mensaje}</p>
              ) : loadingNomina ? (
                <p className="text-emerald-800 text-center">cargando</p>
              ) : (
                nominas.map((nomina) => (
                  <Nomina key={nomina._id} nomina={nomina} />
                ))
              )}
            </div>

            <h2 className="text-emerald-900 text-center text-4xl font-semibold mt-10">
              Genera recibos de nomina que se ajusten a cada empleado
            </h2>
            <div className="flex justify-center mt-5">
              <button
                className="p-4 bg-emerald-700 text-white rounded"
                type="button"
                onClick={() =>
                  setNominaCustom({
                    ...nominaCustom,
                    formulario: !nominaCustom.formulario,
                  })
                }
              >
                {nominaCustom.formulario
                  ? "Cerrar formulario"
                  : "Expander formulario"}
              </button>
            </div>

            {nominaCustom.formulario && (
              <form className="animate-entrada" onSubmit={crearNominaCustom}>
                <div className="flex flex-col mt-5">
                  <label htmlFor="empleado">Empleado</label>
                  <select
                    className="bg-slate-200 p-2 rounded"
                    name="empleado"
                    id="empleado"
                    onChange={(e) =>
                      setNominaCustom({
                        ...nominaCustom,
                        empleado: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Seleccione un empleado --</option>
                    {empleados.map((empleado) => (
                      <option key={empleado._id} value={empleado._id}>
                        {empleado.usuario.nombre} {empleado.usuario.apellidos}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col mt-5">
                  <label htmlFor="nombre">Nombre de esta nomina</label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="bg-slate-200 p-2 rounded"
                    onChange={(e) =>
                      setNominaCustom({
                        ...nominaCustom,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <label htmlFor="percepciones">Percepciones</label>
                  {nominaCustom.percepciones.map((percepcion, i) => (
                    <div key={i} className="flex w-full gap-5 mt-2 relative">
                      <input
                        className="w-full bg-slate-200 p-2 rounded"
                        type="text"
                        placeholder="Nombre de la percepcion"
                        name="name"
                        value={percepcion.name}
                        onChange={(e) => handlePercepcionChange(e, i)}
                      />
                      <input
                        className="w-full bg-slate-200 p-2 rounded"
                        type="number"
                        name="value"
                        placeholder="Valor o monto de la percepcion"
                        value={percepcion.value}
                        onChange={(e) => handlePercepcionChange(e, i)}
                      />
                      {i === nominaCustom.percepciones.length - 1 && (
                        <button
                          className="bg-emerald-700 text-white text-2xl font-bold rounded px-2 py-1 absolute -right-10 top-0"
                          type="button"
                          onClick={addPercepcion}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col mt-5">
                  <label htmlFor="deducciones">Deducciones</label>
                  {nominaCustom.deducciones.map((deduccion, i) => (
                    <div key={i} className="flex w-full gap-5 mt-2 relative">
                      <input
                        className="w-full bg-slate-200 p-2 rounded"
                        type="text"
                        placeholder="Nombre de la deduccion"
                        name="name"
                        value={deduccion.name}
                        onChange={(e) => handleDeduccionChange(e, i)}
                      />
                      <input
                        className="w-full bg-slate-200 p-2 rounded"
                        type="number"
                        name="value"
                        placeholder="Valor o monto de la deduccion"
                        value={deduccion.value}
                        onChange={(e) => handleDeduccionChange(e, i)}
                      />
                      {i === nominaCustom.deducciones.length - 1 && (
                        <button
                          className="bg-emerald-700 text-white text-2xl font-bold rounded px-2 py-1 absolute -right-10 top-0"
                          type="button"
                          onClick={addDeduccion}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <input
                  type="submit"
                  value={"Guardar"}
                  className="text-white bg-emerald-700 rounded p-3 w-full font-semibold mt-5"
                />
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

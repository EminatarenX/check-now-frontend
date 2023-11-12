import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatearDinero } from "../../helpers";
import Regresar from "../../components/admin/Regresar";
import QRCode from "react-qr-code";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerPlazaAction } from "../../actions/empresasAction";
import { obtenerEmpleadosEnPlazaAction } from "../../actions/helperAction";

export default function Plaza() {
  const { plazaActual: plaza, loading } = useSelector((state) => state.empresa);
  const { empleado } = useSelector((state) => state.helper);
  const { plaza: id_plaza } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerPlazaAction(id_plaza));
    dispatch(obtenerEmpleadosEnPlazaAction(id_plaza));
  }, []);
  return (
    <main className="bg-emerald-950">
      <section className="bg-white rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20 ">
        {loading || !plaza ? null : (
          <h1 className="text-4xl text-emerald-950 font-semibold">
            {plaza.nombre}
          </h1>
        )}
        <Regresar />
        <div className="flex justify-between mt-5 gap-5 lg:w-1/2">
          <button className="p-2 rounded bg-slate-100 text-cyan-700 shadow font-semibold w-full lg:w-1/3">
            Editar
          </button>
          <button className="p-2 rounded bg-slate-100 text-red-700 shadow font-semibold w-full lg:w-1/3">
            Eliminar
          </button>
        </div>
        {loading || !plaza ? (
          <p>Cargando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
              <article className="flex flex-col bg-slate-200 shadow-lg p-5 rounded">
                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Descripcion
                  </h2>
                  <p className="text-emerald-900 text-lg">
                    {plaza.descripcion}
                  </p>
                </div>

                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Requisitos
                  </h2>
                  <p className="text-emerald-900 text-lg">
                    {plaza.habilidades}
                  </p>
                </div>

                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Salario
                  </h2>
                  <p className="text-emerald-900 text-lg">
                    {formatearDinero(plaza.salario)}
                  </p>
                </div>

                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Horario de entrada
                  </h2>
                  <p className="text-emerald-900 text-lg">
                    {plaza.horario_entrada}
                  </p>
                </div>

                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Horario de salida
                  </h2>
                  <p className="text-emerald-900 text-lg">
                    {plaza.horario_salida}
                  </p>
                </div>

                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Categoria
                  </h2>
                  <p className="text-emerald-900 text-lg uppercase">
                    {plaza.categoria.nombre}
                  </p>
                </div>
                <div className="">
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5 ">
                    Empresa
                  </h2>
                  <p className="text-emerald-900 text-lg ">
                    {plaza.categoria.departamento.empresa.nombre}
                  </p>
                </div>
                <div>
                  <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Departamento
                  </h2>
                  <p className="uppercase text-emerald-900 text-lg">
                    {plaza.categoria.departamento.nombre}
                  </p>
                </div>
              </article>
              <article
                className={`${plaza.empreado ? "bg-white rounded p-5" : ""}`}
              >
                <h2 className="text-emerald-900 text-2xl font-semibold mt-5 text-center">
                  Empleado
                </h2>
                {!empleado ? (
                  <div>
                    <p className="text-center text-xl mt-2">No hay empleado</p>
                    <p className="text-center mt-2">
                      Comparte este codigo con un trabajador para que pueda
                      acceder a la plaza
                    </p>
                    <div className="flex justify-center mt-2">
                      <QRCode value={plaza._id} />
                    </div>
                  </div>
                ) : (
                  // componente para ver datos del empleado
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-emerald-900 text-xl font-semibold">
                          Nombre
                        </h3>
                        <p className="text-emerald-900 text-lg">
                          {empleado.usuario.nombre}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-emerald-900 text-xl font-semibold">
                          Apellido
                        </h3>
                        <p className="text-emerald-900 text-lg">
                          {empleado.usuario.apellidos}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-emerald-900 text-xl font-semibold">
                          Correo
                        </h3>
                        <p className="text-emerald-900 text-xl">
                          {empleado.usuario.correo}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-emerald-900 text-xl font-semibold">
                          Telefono
                        </h3>
                        <p className="text-emerald-900 text-lg">
                          {empleado.usuario.telefono}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
               
                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5 text-center">
                          Plaza
                        </h2>
                       
                          <h3 className="text-emerald-900 text-xl font-semibold">
                            Nombre
                          </h3>
                          <p className="text-emerald-900 text-lg">
                            {empleado.plaza.nombre}
                          </p>
                            <h3 className="text-emerald-900 text-xl font-semibold">
                                Descripcion
                            </h3>
                        <p className="text-emerald-900 text-lg">
                            {empleado.plaza.descripcion}
                            </p>    

                    
                   
                    </div>
                  </div>
                )}
              </article>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EmpleadoInfo from "../../components/admin/EmpleadoInfo";
import TablaEmpleado from "./TablaEmpleado";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getEmpleadoAction } from "../../actions/empresasAction";

export default function Empleado() {
  const { empleado } = useParams();
  const dispatch = useDispatch();
  const { loading, empleadoActual } = useSelector((state) => state.empresa);

  useEffect(() => {
    dispatch(getEmpleadoAction(empleado));
  }, []);

  return (
    <main className="bg-emerald-950">
      <section className="bg-white rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20 ">
        {loading && !empleadoActual ? (
          <div className="flex justify-center">
            <div className="rounded-full h-40 w-40 border-b border-l border-r border-emerald-900 animate-spin relative"></div>
          </div>
        ) : (
          empleadoActual && (
            <>
              <EmpleadoInfo empleado={empleadoActual} />
                <h2 className="text-emerald-900 text-2xl font-semibold mt-5">
                    Historial de entradas y salidas
                </h2>
                <TablaEmpleado empleadoActual={empleadoActual} />   
              {/* <pre className="text-sm text-emerald-950 font-semibold">
                {JSON.stringify(empleadoActual, null, 2)}
              </pre> */}
            </>
          )
        )}
      </section>
    </main>
  );
}

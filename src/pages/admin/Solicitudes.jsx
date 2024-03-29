import { useState, useEffect } from "react";
import { formatearFecha, formatearDinero } from "../../helpers";
import Loader from "../../components/loaders/loader";
import { io } from "socket.io-client";
let socket

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerSolicitudesAction,
  rechazarSolicitudAction,
  aceptarSolicitudAction,
  nuevaSolicitudSocketAction,
} from "../../actions/empresasAction";

export default function Solicitudes() {
  const { solicitudes, loading } = useSelector((state) => state.empresa);
  const { _id: empresaId } = useSelector((state) => state.empresa.datos);
  const [solicitud, setSolicitud] = useState([]);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const rechazar = () => {
    dispatch(rechazarSolicitudAction(solicitud._id));
    setSolicitud({});
    setModal(false);
  };

  const aceptar = () => {
    dispatch(
      aceptarSolicitudAction({
        solicitud: solicitud._id,
        plaza: solicitud.plaza._id,
        empleado: solicitud.empleado._id,
      })
    );
    setSolicitud({});
    setModal(false);
  };

  useEffect(() => {
    dispatch(obtenerSolicitudesAction());
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("solicitudes", empresaId);

  }, []);

  useEffect(()=> {
    socket.on("solicitud recibida", (solicitud) => {
     
      dispatch(nuevaSolicitudSocketAction(solicitud));
    });
  })

  return (
    <>
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-emerald-900 bg-opacity-80 flex justify-center items-center z-10">
          <div className="bg-white rounded p-5">
            <h1 className="text-emerald-900 text-2xl font-semibold">
              Solicitud de:{" "}
            </h1>
            <p className="text-emerald-600">
              Nombre: {solicitud.empleado.usuario.nombre}
            </p>
            <p className="text-emerald-600">
              Apellido: {solicitud.empleado.usuario.apellidos}{" "}
            </p>
            <p className="text-emerald-600">
              Correo: {solicitud.empleado.usuario.correo}{" "}
            </p>
            <p className="text-emerald-600">
              Telefono: {solicitud.empleado.usuario.telefono}{" "}
            </p>
            <p className="text-emerald-600">
              Dirección: {solicitud.empleado.usuario.direccion}{" "}
            </p>
            <p className="text-emerald-600">Plaza: {solicitud.plaza.nombre}</p>
            <p className="text-emerald-600">
              Salario: {formatearDinero(solicitud.plaza.salario)}
            </p>
            <div className="grid grid-cols-2 justify-end gap-5">
              <button
                className="border border-emerald-700 rounded p-2 hover:bg-emerald-100"
                type="button"
                onClick={aceptar}
              >
                Aceptar
              </button>
              <button
                className="border border-red-700 rounded p-2 hover:bg-red-100"
                type="button"
                onClick={rechazar}
              >
                Rechazar
              </button>
              <button
                className="border border-emerald-700 rounded p-2 col-span-2 hover:bg-slate-300"
                onClick={() => {
                  setModal(false);
                  setSolicitud({});
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
      <main className="bg-emerald-950">
        <section className="bg-white min-h-[500px] rounded-tl-[100px] p-14 lg:p-20">
          <h1 className="text-emerald-900 text-4xl font-semibold">
            Solicitudes de trabajadores
          </h1>
          <p className="text-lg text-emerald-600 mt-2">
            Aqui podras ver todas las solicitudes entrantes para ocupar tus
            plazas
          </p>
          {solicitudes.length === 0 && !loading ? (
            <p className="text-lg bg-slate-300 rounded p-5 text-emerald-600 mt-2">
              No hay solicitudes
            </p>
          ) : solicitudes.length === 0 && loading ? (
            <p className="text-lg bg-slate-300 rounded p-5 text-emerald-600 mt-2">
              Cargando
            </p>
          ) : (
            <article className="rounded text-emerald-100 mt-2 flex flex-col gap-2">
              {solicitudes.map((solicitud) => (
                <div
                  className="bg-emerald-900 shadow-xl p-2 rounded flex justify-between items-end gap-5 hover:-translate-y-2 hover:cursor-pointer transition-all animate-entrada"
                  key={solicitud._id}
                  onClick={() => {
                    setSolicitud(solicitud);
                    setModal(true);
                  }}
                >
                  
                    <div className="flex flex-col justify-between gap-2">
                      <p>
                        {solicitud.empleado.usuario.nombre +
                          " " +
                          solicitud.empleado.usuario.apellidos}
                      </p>
                      <p>{solicitud.plaza.nombre}</p>
                    </div>
              
                    <p className="text-sm text-end">
                      {formatearFecha(solicitud.created_at)}
                    </p>
                </div>
              ))}
            </article>
          )}
        </section>
      </main>
    </>
  );
}

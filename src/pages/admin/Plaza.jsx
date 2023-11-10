import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { formatearDinero } from "../../helpers"
import Regresar from "../../components/admin/Regresar"
import QRCode from "react-qr-code"
// Redux
import { useSelector, useDispatch } from "react-redux"
import { obtenerPlazaAction } from "../../actions/empresasAction"

export default function Plaza() {
    const { plazaActual: plaza, loading } = useSelector(state => state.empresa)
    const { plaza: id_plaza } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(obtenerPlazaAction(id_plaza))

    }, [])
    return (
        <main className="bg-emerald-950">
            <section className="bg-white rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20 ">

                {
                    loading || !plaza ? null : (<h1 className="text-4xl text-emerald-950 font-semibold">{plaza.nombre}</h1>)
                }
               <Regresar/>
                <div className="flex justify-between mt-5 gap-5 lg:w-1/2">
                    <button className="p-2 rounded bg-slate-100 text-cyan-700 shadow font-semibold w-full lg:w-1/3">
                        Editar
                    </button>
                    <button className="p-2 rounded bg-slate-100 text-red-700 shadow font-semibold w-full lg:w-1/3">
                       Eliminar
                    </button>
                </div>
                {
                    loading || !plaza ? <p>Cargando...</p> : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

                                <article className="flex flex-col bg-slate-200 shadow-lg p-5 rounded">
                                   
                                    

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Descripcion</h2>
                                        <p className="text-emerald-900 text-lg">{plaza.descripcion}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Requisitos</h2>
                                        <p className="text-emerald-900 text-lg">{plaza.habilidades}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Salario</h2>
                                        <p className="text-emerald-900 text-lg">{formatearDinero(plaza.salario)}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Horario de entrada</h2>
                                        <p className="text-emerald-900 text-lg">{plaza.horario_entrada}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Horario de salida</h2>
                                        <p className="text-emerald-900 text-lg">{plaza.horario_salida}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Categoria</h2>
                                        <p className="text-emerald-900 text-lg uppercase">{plaza.categoria.nombre}</p>
                                    </div>
                                    <div className="">
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5 ">Empresa</h2>
                                        <p className="text-emerald-900 text-lg ">{plaza.categoria.departamento.empresa.nombre}</p>
                                    </div>
                                    <div>
                                        <h2 className="text-emerald-900 text-2xl font-semibold mt-5">Departamento</h2>
                                        <p className="uppercase text-emerald-900 text-lg">{plaza.categoria.departamento.nombre}</p>
                                    </div>



                                </article>
                                <article className={`${plaza.empreado ? 'bg-white rounded p-5' : ''}`}>
                                    <h2 className="text-emerald-900 text-2xl font-semibold mt-5 text-center">Empleado</h2>
                                    {
                                        !plaza.empleado ? (
                                            <div>
                                                <p className="text-center text-xl mt-2">No hay empleado</p>
                                                <p className="text-center mt-2">Comparte este codigo con un
                                                    trabajador para que pueda acceder a la plaza
                                                </p>
                                                <div className="flex justify-center mt-2">
                                                    <QRCode value={plaza._id} />

                                                </div>
                                            </div>

                                        ) : (
                                            <p>Hay empreado</p>
                                            
                                        )
                                    }
                                </article>
                            </div>




                        </>
                    )
                }
            </section>

        </main>

    )
}

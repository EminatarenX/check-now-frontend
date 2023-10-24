import { useParams } from "react-router-dom"
import { useEffect } from "react"
// Redux
import { useSelector } from "react-redux"
import { useState } from "react"

export default function Plaza() {
    const { plazas } = useSelector(state => state.empresa)
    const { departamento, plaza: id_plaza } = useParams()
    const [plaza, setPlaza] = useState({})
    console.log(departamento, id_plaza)
    
    useEffect(() => {
        let plazaSeleccionada = []
        if (plazas.length > 0) {
            plazaSeleccionada = plazas.find(plaza => plaza._id === id_plaza)
        }
        setPlaza(plazaSeleccionada)
    }, [])
    return (
        <main className="bg-emerald-950">
            <section className="bg-emerald-200 rounded-tl-[100px] rounded-br-[100px] p-14 lg:p-20">
                <h1 className="text-emerald-900 text-4xl font-semibold">{plaza.nombre}</h1>


            </section>
        </main>

    )
}

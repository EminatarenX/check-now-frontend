import { iconosDepartamentos } from "../../helpers"
import { formatearDinero } from "../../helpers"
import { Link, useParams } from "react-router-dom"


export default function Plaza({ plaza }) {
    const { nombre, salario, _id } = plaza
    const { departamento } = useParams()
    
    return (
        <Link to={`/admin/departamentos/${departamento}/${_id}`} className='bg-emerald-900 rounded-lg gap-3 departamento relative animate-entrada flex items-center p-2'>
            {iconosDepartamentos[0].icon()}
            <div>
                <p className="font-semibold text-white">{nombre}</p>
                <p className="text-sm text-emerald-100">{formatearDinero(salario) }</p>
            </div>

        </Link>
    )
}

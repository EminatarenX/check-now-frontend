import { Link } from "react-router-dom"

export default function AccionDashboard({parametros}) {

    const { accion, classes, icon, path } = parametros
  return (
    <div className={`rounded-xl h-60 font-bold w-full p-4 shadow ${classes}`}>
        <p className="text-emerald-100 text-lg font-semibold">
            {accion}
        </p>
        <Link to={path}>
        <div className="flex justify-center mt-2 hover:scale-110 hover:cursor-pointer transition-all">
        {icon && icon()}
        </div>

        </Link>
    </div>
  )
}

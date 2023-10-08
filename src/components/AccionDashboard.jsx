import { Link } from "react-router-dom"

export default function AccionDashboard({ parametros }) {

  const { accion, classes, icon, path } = parametros
  return (
    <div
      className={`
      ${path === '/admin/entradas-salidas' && 'flex flex-col md:items-center justify-center gap-5'} 
      rounded-xl h-60 md:h-full xl:h-60 font-bold w-full p-4 shadow ${classes}`}>

      <Link to={path}>
        <p className="text-emerald-100 text-lg font-semibold">
          {accion}
        </p>
        <div className="flex justify-center mt-2 hover:scale-110 hover:cursor-pointer transition-all">
          {icon && icon()}
        </div>

      </Link>
    </div>
  )
}

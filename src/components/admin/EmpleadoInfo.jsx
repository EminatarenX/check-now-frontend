import { iconosDepartamentos, checks, basicBarOptions } from "../../helpers"
import React from "react"
import RoundChart from "../charts/RoudChart"
import { formatearDinero } from "../../helpers"


export default function EmpleadoInfo({empleado}) {

    const diasTrabajados = (checks) => {
        if(checks.length === 0) return 0
        const checksDelMes = checks.filter(check => {
            const fecha = new Date(check.fecha_entrada)
            const fechaActual = new Date()

            return fecha.getMonth() === fechaActual.getMonth()
        })

        return checksDelMes.length
        
    }

    const optionsCircle = [
        {value: diasTrabajados(empleado.checks),name: 'Dias trabajados',itemStyle: {color: 'rgb(5 150 105/ .70'}}, 
        {value: 26,name: 'Dias del mes',itemStyle: {color: `rgb(239 68 68 / .80`} }
    ]
    const optionsBar = [
        {value: diasTrabajados(empleado.checks),name: 'Dias trabajados'}, 
        {value: 26,name: 'Dias del mes'}
    ]

    const icono = (iconos) => {
        const icono = iconos.find(icono => icono.nombre === empleado.plaza.categoria.departamento.icon)
        return React.cloneElement(icono.icon(), {stroke: 'rgb(5 150 105/ .70)', className: 'h-20 w-20'})
    }

  return (
    <article>
        <h2 className="text-emerald-900 text-4xl font-semibold mt-5 text-center capitalize">
            {empleado.usuario.nombre} {empleado.usuario.apellidos}
        </h2>

        <div className="bg-slate-100 rounded-lg p-2 flex flex-col lg:flex-row mt-5 ">
            <div className="flex flex-col lg:w-1/3 gap-4">
                <div className="flex items-center justify-between gap-5 text-emerald-900">
                    <h2 className="text-2xl">{empleado.plaza.nombre}</h2>
                    {
                        icono(iconosDepartamentos)
                    }
                </div>
                <p className="text-emerald-900">
                    <span className="font-semibold">Numero telefónico: </span>+52 {empleado.usuario.telefono}
                </p>
                <p className="text-emerald-900">
                    <span className="font-semibold">Descripción:</span> {empleado.plaza.descripcion}
                </p>
                <p className="text-emerald-900">
                    <span className="font-semibold">Sueldo quincenal <span className="text-xs">( sin deducciones )</span>:<br/></span> {formatearDinero(empleado.plaza.salario)}
                </p>
                <p className="text-emerald-900">
                    <span className="font-semibold">Sueldo por días laborados <span className="text-xs">( sin deducciones )</span>:<br/></span> {empleado.plaza.salario.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </p>
                <p className="text-emerald-900">
                    <span className="font-semibold">Habilidades:</span> {empleado.plaza.habilidades}
                </p>
            </div>
            
            <div className="w-full flex flex-col items-center">
                {/* <BasicBar 
                    height={"300px"}
                    width={"100%"}
                    option={basicBarOptions(optionsBar)}
                /> */}
                <RoundChart height={"300px"} width={"100%"} option={checks(optionsCircle)} />
                <p className="text-emerald-900 text-2xl font-semibold mt-5 mr-2">
                <span className="font-semibold">Dias de vacaciones anuales:</span> {empleado.dias_vacaciones}
                </p>
                <p className="text-emerald-900 text-2xl font-semibold mt-5 mr-2">
                <span className="font-semibold">Dias de aginaldo:</span> {empleado.dias_aguinaldo}
                </p>

                    
            </div>
        </div>

</article>
  )
}

import { useState } from "react"
import { useSelector } from "react-redux"
import RoudChart from "../../components/charts/RoudChart"
import { checks, basicBarOptions } from "../../helpers"
import RoundChart from "../../components/charts/RoudChart"
import BasicBar from "../../components/charts/BasicChart"

export default function UserIndex() {
    const checkChart =[
        {value: 5,name: 'Entradas',itemStyle: {color: 'rgb(5 150 105/ .70'}}, 
        {value: 10,name: 'Salidas',itemStyle: {color: 'rgb(239 68 68 / .80'} }
    ]
    const sueldo = [
        {value: 1000,name: 'Sueldo',itemStyle: {color: 'rgb(5 150 105/ .70'}}, 
        {value: 500,name: 'Gastos',itemStyle: {color: 'rgb(239 68 68 / .80'} }
    ]

    const desempenio = [
        {value: 100,name: 'Desempeño'}, 
        {value: 200,name: 'Faltas'}
    ]

    const { plaza } = useSelector(state => state.empleado)
    
  return (
    <section className="flex flex-col">
        <article className="bg-white p-2 rounded-xl">
            <h1 className="text-4xl">
                {plaza.nombre}
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 mt-5">
                <button className="w-full bg-emerald-100 text-emerald-600 py-3 rounded font-semibold">
                    Entrar
                </button>
                <button className="w-full bg-red-100 text-red-500 py-3 rounded font-semibold">
                    Salir
                </button>
            </div>
      </article>
        <article className="flex flex-col lg:flex-row">
        <RoudChart 
            height={"300px"}
            option={checks(checkChart)}/>
        <RoundChart 
            height={"300px"}
            option={checks(sueldo)}
        />

        </article>
        <BasicBar 
            height={"300px"}
            option={basicBarOptions(desempenio)}
        />
    </section>
  )
}

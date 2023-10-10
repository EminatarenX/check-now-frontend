import React from 'react'

export default function FormularioPlazas({setFormularioPlaza}) {

    const handleCrearPlaza = (e) => {
        e.preventDefault()
        console.log('creando plaza')
    }
  return (
    <div className='w-full fixed top-0 h-screen bg-emerald-950 bg-opacity-90 p-5 xl:p-20'>
        <div className='flex justify-end m-2 xl:m-0'>
        <button >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 xl:h-20 xl:w-20 text-emerald-900 hover:text-emerald-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" onClick={()=> setFormularioPlaza(false)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>
        <form
            onSubmit={handleCrearPlaza} 
            className='bg-white rounded-2xl p-5 flex flex-col animate-entrada'>
        <input type="text"
            placeholder="Nombre o titulo de la plaza"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
                  <input type="text"
            placeholder="Departamento ( Ejemplo: Contabilidad )"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
                  <input type="text"
            placeholder="Descripcion de la plaza"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
                  <input type="text"
            placeholder="Supervisor o encargado"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
                  <input type="text"
            placeholder="Salario de la plaza ( Ejemplo: 10000 )"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
                  <input type="text"
            placeholder="Habilidades requeridas ( Ejemplo: Análisis en Excel )"
            className={`bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
            <div className='flex justify-evenly flex-col xl:flex-row items-center'>
            <div className="mt-3 grid">
            <label htmlFor='entrada' className='border-2 border-green-600 px-5 py-3 text-emerald-800 rounded'>Horario de entrada</label>
            <input type="time"
            name='entrada'
            placeholder="Horario de Entrada"
            className={`flex- bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
            </div>
          
            <div className="mt-3 grid">
            <label htmlFor='salida' className='border-2 border-rose-500 px-5 py-3 text-emerald-800 rounded'>Horario de salida</label>
            <input type="time"
            name='salida'
            placeholder="Horario de salida"
            className={`flex- bg-transparent text-emerald-900  border-b-2 border-emerald-300 focus:outline-none p-3 placeholder:text-emerald-700  transition-all`}

          />
            </div>
            </div>
     
          <input 
          type="submit" 
          value="Agregar plaza" 
            className="bg-emerald-900 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer hover:bg-emerald-700 transition-all"
          />
        </form>
    </div>
  )
}

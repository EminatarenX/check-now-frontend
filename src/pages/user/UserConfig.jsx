import { Fragment, useEffect, useState } from "react"

// Redux 
import { useSelector } from "react-redux"

export default function UserConfig() {

    const { nombre, apellidos, direccion, telefono, correo } = useSelector( state => state.usuarios?.user) 
    const [ userDataForm, setUserDataForm ] = useState({
        nombre: nombre,
        apellidos: apellidos,
        direccion: direccion,
        telefono: telefono,
        correo: correo
    })
    const handleInformacionPersonal = (e) => {
        e.preventDefault()    
        console.log(userDataForm)
        
    }

    useEffect(()=> {
        const loadUserDataForm = () => {
            setUserDataForm({
                nombre: nombre,
                apellidos: apellidos,
                direccion: direccion,
                telefono: telefono,
                correo: correo
            })
        }
        loadUserDataForm()
    },[])


  return (
    <Fragment>

        <section>
            <h2 className="text-emerald-900 text-2xl font-semibold">Información personal</h2>
           
            <form className="grid grid-cols-2 gap-5 mt-5"
                onSubmit={handleInformacionPersonal}
            >
                <div className="col-span-2 lg:col-span-1">
                    <label className="text-xs text-emerald-800" htmlFor="nombre">Nombre</label>
                    <input className="w-full p-2 outline-emerald-600 rounded placeholder:text-emerald-800 placeholder:opacity-70 text-emerald-800 " placeholder="Nombre"  type="text" name="nombre" id="nombre"  
                        value={userDataForm.nombre}
                        onChange={ e => setUserDataForm({ ...userDataForm, nombre: e.target.value})}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <label className="text-xs text-emerald-800" htmlFor="apellido">Apellidos</label>
                    <input className="w-full p-2 outline-emerald-600 rounded placeholder:text-emerald-800 placeholder:opacity-70 text-emerald-800 " placeholder="Apellidos" type="text" name="apellidos" id="apellidos" 
                        value={userDataForm.apellidos}
                        onChange={ e => setUserDataForm({ ...userDataForm, apellidos: e.target.value})}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <label className="text-xs text-emerald-800" htmlFor="email">Email</label>
                    <input className="w-full p-2 disabled:opacity-60 disabled:bg-white outline-emerald-600 rounded placeholder:text-emerald-800 placeholder:opacity-70 text-emerald-800 " placeholder="Correo electrónico" type="email" name="email" id="email"  
                        value={userDataForm.correo}
                        disabled={true}
                        onChange={ e => setUserDataForm({ ...userDataForm, correo: e.target.value})}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <label className="text-xs text-emerald-800" htmlFor="telefono">Telefono</label>
                    <input className="w-full p-2 outline-emerald-600 rounded placeholder:text-emerald-800 placeholder:opacity-70 text-emerald-800" type="number" name="telefono" id="telefono"  
                        value={userDataForm.telefono}
                        onChange={ e => setUserDataForm({ ...userDataForm, telefono: e.target.value})}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1">
                    <label className="text-xs text-emerald-800" htmlFor="direccion">Dirección postal</label>
                    <input className="w-full p-2 outline-emerald-600 rounded placeholder:text-emerald-800 placeholder:opacity-70 text-emerald-800" type="text" name="direccion" id="direccion"  
                        value={userDataForm.direccion}
                        onChange={ e => setUserDataForm({ ...userDataForm, direccion: e.target.value})}
                    />
                </div>
                <div>

                </div>
                <button 
                type="submit"
                className="col-span-2 bg-emerald-800 text-white p-2 rounded hover:bg-emerald-900 transition-all"
                >
                    Guardar
                </button>        
            </form>
        </section>
    </Fragment>
  )
}

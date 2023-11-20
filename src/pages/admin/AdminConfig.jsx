import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

// funciones de redux
import { actualizarDatosEmpresaAction } from '../../actions/empresasAction';

export default function AdminConfig() {
    const usuario = useSelector( state => state.usuarios.user)
    const datos_empresa = useSelector( state => state.empresa.datos)
    const dispatch = useDispatch()
    
    // formularios states
    const [location, setLocation] = useState({
        lat: null,
        long: null
    });

    const [user, setUser] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        direccion: '',
        telefono: ''
    })

    const [ datosEmpresa, setDatosEmpresa ] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        razonSocial: '',
        identificacionTributaria: '',
        industria: ''
    })


    // fin formularios states

    const handleDatosEmpresa = (e) => {
        setDatosEmpresa({
            ...datosEmpresa,
            [e.target.name]: e.target.value
        })
    }

    // formularios functions 
    const handleSubmitDatosEmpresa = () => {
        const campos = Object.values(datosEmpresa)

        if(campos.some( campo => campo === '')){
            toast.warning('Todos los campos son requeridos')
            return
        }

        if(datosEmpresa.telefono.length !== 10) {
            toast.warning('El telefono debe tener 10 digitos')
            return
        }

        if(!Number(datosEmpresa.telefono)){
            toast.warning('El telefono debe ser un numero')
            return
        }

        if(datosEmpresa.identificacionTributaria.length !== 13) {
            toast.warning('La identificacion tributaria debe tener 13 digitos')
            return
        }

        dispatch( actualizarDatosEmpresaAction(datosEmpresa))

    }


    useEffect(()=> {
        if(usuario) {
            setUser({
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                email: usuario.correo,
                direccion: usuario.direccion,
                telefono: usuario.telefono
            })
        }



    },[])

    useEffect(() => {
        if(datos_empresa) {
            setDatosEmpresa({
                nombre: datos_empresa.nombre,
                direccion: datos_empresa.direccion,
                telefono: datos_empresa.telefono,
                razonSocial: datos_empresa.razonSocial,
                identificacionTributaria: datos_empresa.identificacionTributaria,
                industria: datos_empresa.industria
            })
        }
    },[datos_empresa])

    return (
        <main className='bg-emerald-950'>
            <section className='bg-white p-10 rounded-tl-[100px] grid grid-cols-1 lg:grid-cols-4 gap-14'>
                {
                    // Formulario de datos de usuario
                }

                <article className='lg:col-span-2 flex flex-col gap-2'>
                    <h2 className='text-emerald-900 text-3xl font-semibold mb-3'>Datos del usuario</h2>
                    <input type="text"
                        placeholder="Nombre"
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={user.nombre}
                        onChange={e => setUser({...user, nombre: e.target.value})}
                    />
                    <input type="text"
                        placeholder="Apellidos"
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={user.apellidos}
                        onChange={e => setUser({...user, apellidos: e.target.value})}
                    />

                    <input type="email"
                        placeholder="Correo electrónico"
                        disabled={true}
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                    />
                     <input type="text"
                        placeholder="Dirección"
                        className={`bg-transparent block text-emerald-800 w-full  placeholder:opacity-50 border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={user.direccion}
                        onChange={e => setUser({...user, direccion: e.target.value})}
                    />
                     <input type="text"
                        placeholder="Teléfono"
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={user.telefono}
                        onChange={e => setUser({...user, telefono: e.target.value})}
                    />
                    <button className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'>Guardar cambios</button>
                </article>

                {
                    // Formulario de datos de empresa
                }

                <article className='lg:col-span-2 flex flex-col justify-between lg:row-span-2'>
                    <div className='flex flex-col gap-5'>
                    <h2 className='text-emerald-900 text-3xl font-semibold mb-3'>Datos de la empresa</h2>
                    <div  className='flex flex-col w-full justify-between gap-5'>
                    <input type="text"
                        placeholder="Nombre"
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.nombre}
                        name='nombre'
                        onChange={(e) => handleDatosEmpresa(e)}
                    />
                    

                    <input type="text"
                        placeholder="Dirección"
                        className={`bg-transparent block text-emerald-800 w-full  placeholder:opacity-50 border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.direccion}
                        name='direccion'
                        onChange={(e) => handleDatosEmpresa(e)}
                    />  
                    <input type="text"
                        placeholder="Teléfono"
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.telefono}
                        name='telefono'
                        onChange={(e) => handleDatosEmpresa(e)}    
                    />
                    <input type="text"
                        placeholder='Razon social'
                        className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.razonSocial}
                        name='razonSocial'
                        onChange={(e) => handleDatosEmpresa(e)}    
                    />
                   
                  
                    <input type="text"
                        placeholder="Identificación tributaria"
                        className={`bg-transparent block text-emerald-800 w-full  placeholder:opacity-50 border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.identificacionTributaria}
                        name='identificacionTributaria'
                        onChange={(e) => handleDatosEmpresa(e)}
                    />
                    <input type="text"
                        placeholder="Industria"
                        className={`bg-transparent block text-emerald-800 w-full  placeholder:opacity-50 border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`}
                        value={datosEmpresa.industria}
                        name='industria'
                        onChange={(e) => handleDatosEmpresa(e)}
                    />
                        

                    </div>
                    </div>
                    <button className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'
                        onClick={handleSubmitDatosEmpresa}
                    >
                        Actualizar
                    </button>

                </article>  

                <article className='flex flex-col justify-between'>
                    <h2 className='text-emerald-900 text-3xl font-semibold mb-5'>Seguridad</h2>
                    <input className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`} placeholder='Contraseña actual'/>
                    <input className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`} placeholder='Contraseña nueva'/>
                    <button className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'>Cambiar contraseña</button>
                </article>
                <article className='flex flex-col justify-end'>
                    <h2 className='text-emerald-900 text-3xl font-semibold mb-5 text-center'>Eliminar cuenta</h2>
                    <button className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'>Eliminar cuenta</button>
                </article>
            </section>
        </main>
    )
}

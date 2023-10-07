import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AdminConfig() {
    const usuario = useSelector( state => state.usuarios.user)

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

    const obtenerUbicacion = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude
            });
        });


    };

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

    return (
        <main className='bg-emerald-950'>
            <section className='bg-emerald-100 p-20 rounded-tl-[150px] grid grid-cols-1 lg:grid-cols-4 gap-14'>
                <article>
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
                <article>
                    <h2 className='text-emerald-900 text-3xl font-semibold'>Ubicacion</h2>

                    <p className='text-emerald-900 text-lg mt-5'>Latitud: {location.lat}</p>
                    <p className='text-emerald-900 text-lg mt-5'>Longitud: {location.long}</p>
                    <button onClick={obtenerUbicacion} className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'>Configurar ubicacion</button>
                </article>
                <article>
                    <h2 className='text-emerald-900 text-3xl font-semibold mb-5'>Seguridad</h2>
                    <input className={`bg-transparent block text-emerald-800 w-full placeholder:opacity-50  border-b-2 border-emerald-300 focus:outline-none py-2 placeholder:text-emerald-800  transition-all`} placeholder='Cambiar contraseña'/>
                    <button className='bg-emerald-800 text-white font-semibold p-3 w-full rounded shadow mt-5'>Cambiar contraseña</button>
                </article>
            </section>
        </main>
    )
}

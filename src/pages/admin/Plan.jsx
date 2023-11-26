import {useState, useEffect} from 'react'
import ChecknowLogo from '../../assets/img/img-inicio-check.svg'
import { toast } from 'react-toastify'
import clienteAxios from '../../config/axios'

export default function Plan() {
    const [prices, setPrices] = useState([])
    const [ cargando, setCargando ] = useState(false)
    
    const obtenerLink = async (price_id) => {
        const token = localStorage.getItem('token')
        
        if(!token){
            toast.error('No hay token')
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        
        }

        try {
            const { data } = await clienteAxios.get(`/pagos/session/${price_id}`, config)
            console.log(data)
            window.location.href = data.url
            
        } catch (error) {
            toast.error('No se pudo obtener el link')
            console.log(error)
        }
    }

    useEffect(() => {
        setCargando(true)
        const obtenerPrice = async () => {

            const token = localStorage.getItem('token')
            
            if(!token){
                toast.error('No hay token')
                return
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            
            }
    
            try {
                const { data } = await clienteAxios.get(`/pagos`, config)
                const pricesOrdenados = data.prices.sort((a, b) => a.unit_amount - b.unit_amount)
                setPrices(pricesOrdenados)
                console.log(pricesOrdenados)
            } catch (error) {
                toast.error('No se pudo obtener el link')
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        obtenerPrice()
    },[])
    // TODO: realzar una pagina de un plan mensual de 4999 pesos mxn con un boton de pagar con cualquier metodo de pago
  return (
    <main className='bg-slate-200 p-2 flex justify-center h-screen gap-5 flex-col lg:flex-row'>
        {
            // TODO: realzar una pagina de un plan mensual de 4999 pesos mxn con un boton de pagar con cualquier metodo de pago
        }
       
        {
            cargando ? (
                <div className='bg-white rounded-[100px] p-10 lg:p-20'>
                    <h1 className='text-4xl text-emerald-900 font-semibold'>Cargando...</h1>
                </div>
            ) : prices.length === 0 ?  null : (
                prices.map( (price, i) => (
                    <section  key={price.id} className='shadow-xl bg-white px-6 max-h-[650px] mt-20 rounded flex flex-col items-center justify-center gap-3'>
                    <h1 className='text-4xl font-semibold text-emerald-900 text-center z-10'>Check-Now plan {i === 1 ? 'anual' : 'mensual'}</h1>
                    <p className='text-emerald-900 text-xl text-center z-10'>{i === 1 ? '48,589.00' : '4,899.00'} MXN</p>
                    <img src={ChecknowLogo} className='bg-emerald-100 scale-[1.1] rounded-[50%] mt-5' alt=""checklogo />
        
                    <button className='bg-emerald-900 w-full text-white rounded-xl mt-5 px-10 py-4 block text-center z-10'
                    onClick={() =>obtenerLink(price.id)}
                    >Suscribirse</button>
                </section>
                ))
            )
        }


    </main>
    
  )
}

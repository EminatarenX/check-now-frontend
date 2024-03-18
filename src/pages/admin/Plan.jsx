import { useState, useEffect } from 'react'
import ChecknowLogo from '../../assets/img/img-inicio-check.svg'
import { toast } from 'react-toastify'
import clienteAxios from '../../config/axios'
import PaymentOption from '../../components/admin/PaymentOption'
import { Link } from 'react-router-dom'
export default function Plan() {
  const [prices, setPrices] = useState([])
  const [cargando, setCargando] = useState(false)

  function formatAmount(amountInCents, currency) {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
    });

    // Convertir el monto de centavos a la unidad de la moneda (dividiendo por 100)
    const amountInCurrency = amountInCents / 100;

    // Formatear y devolver el monto en la moneda local
    return formatter.format(amountInCurrency);
  }


  const obtenerLink = async (price_id) => {
    const token = localStorage.getItem('token')

    if (!token) {
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

      if (!token) {
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
      } catch (error) {
        toast.error('No se pudo obtener el link')
        console.log(error)
      } finally {
        setCargando(false)
      }
    }
    obtenerPrice()
    console.log(prices)
  }, [])
  // TODO: realzar una pagina de un plan mensual de 4999 pesos mxn con un boton de pagar con cualquier metodo de pago
  return (
    // <main className='bg-slate-200 p-2 lg:p-14 flex justify-evenly items-center gap-5 flex-col lg:flex-row'>
    <main className='bg-slate-200 p-2 lg:p-4 flex justify-evenly items-center gap-5 flex-col'>

      <Link to='/admin' className={"fixed bottom-10 lg:right-10 p-5 rounded bg-emerald-600 text-white "}>
        Volver al panel de control
      </Link>

      {
        cargando ? (
          <div className='bg-white rounded-[100px] p-10 lg:p-20'>
            <h1 className='text-4xl text-emerald-900 font-semibold'>Cargando...</h1>
          </div>
        ) : prices.length === 0 ? null : (
          prices.map((price, i) => {
            if (i === 0) {
              return null
            } else {
              return (
                <PaymentOption
                  key={price.id}
                  price={price}
                  formatAmount={formatAmount}
                  obtenerLink={obtenerLink}
                />
              )
            }
          }
          ))
      }


    </main >

  )
}

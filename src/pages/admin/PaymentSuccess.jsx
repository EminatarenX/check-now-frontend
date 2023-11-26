import { useEffect } from "react"
export default function PaymentSuccess() {

  useEffect(()=> {
    setTimeout(() => {
      window.location.href='/admin'
    }, 1500);
  }, [])

  return (
    <main className='bg-emerald-950 p-5'>

        <section className='bg-white rounded-[100px] p-10 lg:p-20'>
            <h1 className='text-4xl text-emerald-900 font-semibold'>Pago exitoso</h1>
            <p className='text-emerald-900 text-lg'>Gracias por su compra</p>

        </section>
    
    </main>
  )
}

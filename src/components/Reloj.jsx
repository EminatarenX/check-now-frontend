import { useEffect, useState } from 'react'

export default function Reloj() {
    const [fecha, setFecha] = useState(new Date())

    useEffect(() => {
        const boton = document.querySelector('.reloj')


        document.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                boton.classList.remove('reloj-out')
                boton.classList.add('reloj-in')
            } else {
                boton.classList.remove('reloj-in')
                boton.classList.add('reloj-out')
            }
        })

        const interval = setInterval(() => {
            setFecha(new Date())
        }, 1000)

        return () => clearInterval(interval)

    }, [])
    return (
        <span className='reloj reloj-out'>
            {
                fecha.getHours() > 12 ?
                    fecha.getHours() - 12 :
                    fecha.getHours()
            } :
            {
                fecha.getMinutes() < 10 ?
                    '0' + fecha.getMinutes() :
                    fecha.getMinutes()}
            {
                fecha.getHours() >= 12 ? ' pm' : ' am'
            }

        </span>
    )
}

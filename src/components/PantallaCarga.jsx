import '../styles/PantallaCarga.css'

export default function PantallaCarga() {
  return (
    <div className='fade h-screen w-full position fixed bg-gradient-to-r from-green-700 to-green-400 flex flex-col gap-10 justify-center items-center'>
        <div className='loader'></div>
    </div>
  )
}

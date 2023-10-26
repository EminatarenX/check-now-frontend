

export default function Regresar() {
    return (
        <div className="block lg:hidden">
            <button className="bg-emerald-700 text-emerald-100 rounded p-2 mt-5" onClick={() => window.history.back()}>Regresar</button>
        </div>
    )
}

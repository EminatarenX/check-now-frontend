import {
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  ArrowPathRoundedSquareIcon
} from "@heroicons/react/20/solid";
import imagenInicio from "../assets/img/img-inicio-check.svg";
export default function Inicio() {
  return (
    <main className="bg-gradient-to-r from-emerald-800 to-emerald-500">
      <section className="flex justify-evenly items-center p-20">
        <article>
          <h1 className="text-white text-6xl font-bold ">
            Administra tu negocio de manera{" "}
            <span className="text-emerald-400">mas sencilla</span>
          </h1>
        </article>
        <img
          src={imagenInicio}
          alt="imagen-inicio"
          className="hidden lg:block"
        />
      </section>
      <section className="flex flex-col bg-emerald-800 p-5 lg:p-14">
        <h2 className="text-white text-6xl font-bold text-center">
          ¿Que es Check-Now?
        </h2>
        <div className="overflow-hidden py-24 sm:py-3 mt-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-white">
                    Administra mas rápido!
                  </h2>
                 
                  <p className="mt-6 text-lg leading-8 text-white">
                    Check-Now es una aplicación web que te permite administrar tu negocio o empresa 
                    de manera mas sencilla y rápida, con Check-Now podrás llevar un control de tus departamentos,
                    empleados y mucho mas!.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-white lg:max-w-none">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-white">
                          <feature.icon
                            className="absolute left-1 top-1 h-5 w-5 text-emerald-500"
                            aria-hidden="true"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <img
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    name: "Crea.",
    description:
      "Crea tus propios departamentos de trabajo, divídelo por categorías y crea plazas y vacantes para futuros empleados.",
    icon: DocumentPlusIcon,
  },
  {
    name: "Mejora el flujo de trabajo.",
    description:
      "Registra las entradas y salidas de cada trabajador, genera estadísticas de forma automática.",
    icon: ArrowPathRoundedSquareIcon,
  },
  {
    name: "Personaliza nominas.",
    description:
      "Genera de forma automatica nominas en base a tus necesidades y Check-Now se encargara de llevar un control de ellas de manera precisa y eficaz.",
    icon: ClipboardDocumentListIcon,
  },
];

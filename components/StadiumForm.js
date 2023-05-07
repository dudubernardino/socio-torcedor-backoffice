import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const StadiumForm = ({
  stadium = {},
  disabled,
  setDisabled,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...stadium,
    },
  })

  const [sectors, setSectors] = useState([
    {
      name: '',
      capacity: 0,
      checkinLimit: 0,
    },
  ])

  useEffect(() => {
    const update = async () => {
      setSectors(stadium.sectors)
    }

    if (stadium.id) update()
  }, [stadium])

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {stadium?.id ? stadium.name : 'Registrar nova partida'}
            </h6>
            <div>
              {disabled ? (
                <>
                  <button
                    className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDisabled(false)}
                  >
                    Editar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setSectors((prevSectors) => [
                        ...prevSectors,
                        {
                          name: '',
                          capacity: 0,
                          checkinLimit: 0,
                        },
                      ])

                      setValue(sectors)
                    }}
                  >
                    Adicionar Setor
                  </button>
                  <button
                    className="bg-red-700 active:bg-red-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDisabled(true)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isSubmitting ? 'Carregando' : 'Salvar'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex-auto px-6 py-10 pt-0">
          <form>
            <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informações do estádio
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Nome estádio"
                    {...register('name')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-4 md:min-w-full" />
            <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Setores do estádio
            </h6>
            {sectors?.map((sector, key) => (
              <div key={key}>
                <div className="flex flex-wrap rounded p-4 m-4">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        autoFocus
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="Nome setor"
                        disabled={disabled}
                        value={sector.name}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.name?.message}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Capacidade
                      </label>
                      <input
                        type="number"
                        autoFocus
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="Capacidade estádio"
                        disabled={disabled}
                        value={sector.capacity}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.capacity?.message}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Limite checkin
                      </label>
                      <input
                        type="number"
                        autoFocus
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="Limite checkin"
                        disabled={disabled}
                        value={sector.checkinLimit}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.checkinLimit?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Datepicker from 'react-tailwindcss-datepicker'
import Select from 'react-select'

export const MatchForm = ({
  match = {},
  disabled,
  setDisabled,
  onSubmit,
  stadiums,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...match,
    },
  })
  const [dateValue, setDateValue] = useState({
    startDate: null,
    endDate: null,
  })

  const [timeValue, setTimeValue] = useState(null)

  useEffect(() => {
    const update = async () => {
      const date = match.startTime.substring(0, 10)
      const time = match.startTime.substring(11, 16)

      setTimeValue(time)
      setDateValue({
        startDate: date,
        endDate: date,
      })
    }

    if (match.id) update()
  }, [match])

  const handleDateChange = (date) => {
    setValue('dateTime', date)
  }

  const handleTimeChange = (time) => {
    setValue('time', time)
  }

  const selectStadiums = stadiums?.reduce((acc, item) => {
    return [
      ...acc,
      {
        value: item.id,
        label: item.name,
      },
    ]
  }, [])

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {match?.id
                ? `Partida: ${match?.homeTeam} x ${match?.awayTeam}`
                : 'Registrar nova partida'}
            </h6>
            <div>
              {disabled ? (
                <button
                  className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setDisabled(false)}
                >
                  Editar
                </button>
              ) : (
                <>
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
              Informações da aplicação
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Time Casa
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Time casa"
                    {...register('homeTeam')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.homeTeam?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Time Fora
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Time fora"
                    {...register('awayTeam')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.awayTeam?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Data
                  </label>
                  <Datepicker
                    i18n={'pt-br'}
                    configs={{
                      shortcuts: {
                        today: 'Hoje',
                        yesterday: 'Ontem',
                        past: (period) => `Últimos ${period} dias`,
                        currentMonth: 'Mês atual',
                        pastMonth: 'Último mês',
                      },
                      footer: {
                        cancel: 'Cancelar',
                        apply: 'Aplicar',
                      },
                    }}
                    value={dateValue}
                    onChange={(value) => {
                      setDateValue(value)
                      handleDateChange(value)
                    }}
                    showShortcuts
                    separator="~"
                    displayFormat="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Time fora"
                    disabled={disabled}
                    value={timeValue}
                    onChange={(event) => {
                      setTimeValue(event.target.value)
                      handleTimeChange(event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Estádio</span>
                  </label>
                  <Controller
                    control={control}
                    name="stadiumId"
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          className="basic-single"
                          classNamePrefix="select"
                          isDisabled={disabled}
                          isLoading={false}
                          isClearable
                          isSearchable
                          placeholder="Procurar..."
                          onChange={(data) => field.onChange(data.value)}
                          value={selectStadiums?.find(
                            (item) => item.value === field.value
                          )}
                          options={selectStadiums}
                        />
                      )
                    }}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.selectStadiums?.message}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import CurrencyInput from 'react-currency-input'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

export const PlanForm = ({ plan = {}, disabled, setDisabled, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...plan,
    },
  })

  const sectors = watch('sectors')

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {plan?.name ? `Plano: ${plan?.name}` : 'Registrar novo plano'}
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
                    Nome
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Plano"
                    {...register('name')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Aplicativo usado na web"
                    {...register('description')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.description?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Preço</span>
                  </label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        autoComplete="off"
                        autoCorrect="off"
                        className="appearance-none border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0"
                        id="input-amount"
                        inputMode="decimal"
                        onBlur={field.onBlur}
                        disabled={disabled}
                        onChangeEvent={(event, maskedValue, float) =>
                          setValue('price', float || 0)
                        }
                        placeholder="R$ 0,00"
                        ref={field.ref}
                        spellCheck="false"
                        style={{ outline: 'none' }}
                        value={field.value}
                        prefix="R$ "
                        decimalSeparator=","
                        thousandSeparator="."
                      />
                    )}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.price?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Setores</span>
                  </label>
                  <Controller
                    control={control}
                    name="sectors"
                    rules={{
                      required: 'Setores é um campo obrigatório.',
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={disabled}
                        isLoading={false}
                        isClearable
                        isSearchable
                        isMulti
                        placeholder="Procurar..."
                        value={
                          field?.value?.map((item) => ({
                            value: item?.id,
                            label: item?.name,
                          })) ?? ''
                        }
                        options={sectors?.map((item) => ({
                          value: item?.id,
                          label: item?.name,
                        }))}
                      />
                    )}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.sectors?.message}
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

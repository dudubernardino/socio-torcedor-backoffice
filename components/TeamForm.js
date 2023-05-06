import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'

import { CpfCnpj } from './CpfCnpj'
import { ButtonToggleStatusEntity } from './ButtonToggleStatusEntity'
import CurrencyInput from 'react-currency-input'

export const TeamForm = ({ team = {}, disabled, setDisabled, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...team,
      fee: team?.fee ? team?.fee / 100 : null,
    },
  })

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-10 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {team?.name || 'Registrar novo cliente'}
            </h6>
            <div>
              {disabled ? (
                <>
                  <ButtonToggleStatusEntity
                    entityName="teams"
                    id={team?.id}
                    status={team?.status}
                  />

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
            <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
              Informações da empresa
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : 'Iniciador LTDA'}
                    {...register('name', {
                      required: 'Nome é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    CNPJ
                  </label>
                  <Controller
                    name="taxId"
                    rules={{
                      required: 'CNPJ é um campo obrigatório.',
                      validate: (v) => {
                        const value = v.replace(/\.|\-/g, '')
                        // validate CNPJ
                        if (isValidCNPJ(value)) return true
                        return `Insira um  'CNPJ válido`
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <CpfCnpj
                        mask="CNPJ"
                        placeholder="Seu CNPJ"
                        {...field}
                        disabled={disabled}
                        onChange={(event) =>
                          field.onChange(
                            event.target.value.replace(/\.|\-|\//g, '')
                          )
                        }
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                      />
                    )}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.taxId?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : 'tecnologia@exemplo.com'}
                    {...register('email', {
                      required: 'Email é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Tarifa</span>
                  </label>
                  <Controller
                    name="fee"
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
                          setValue('fee', float || 0)
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
                    {errors.fee?.message}
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

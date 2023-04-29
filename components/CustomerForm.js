import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'

import { CpfCnpj } from './CpfCnpj'
import { ButtonToggleStatusEntity } from './ButtonToggleStatusEntity'

export const CustomerForm = ({
  customer = {},
  disabled,
  setDisabled,
  hasEmailCheckbox,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: customer,
  })

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-10 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {customer?.tradeName || 'Registrar novo cliente'}
            </h6>
            <div>
              {disabled ? (
                <>
                  <ButtonToggleStatusEntity
                    entityName="customers"
                    id={customer?.id}
                    status={customer?.status}
                    has2FA
                  />
                  <a
                    className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    href="#keys"
                  >
                    Chaves de API
                  </a>

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
                    Razão Social
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
                    Nome fantasia
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : 'Iniciador'}
                    {...register('tradeName', {
                      required: 'Nome fantasia é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.tradeName?.message}
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
                    Email Financeiro
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
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Avatar
                  </label>
                  <input
                    type="url"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={
                      disabled ? 'N/A' : 'https://iniciador.com.br/avatar.png'
                    }
                    {...register('avatar', {
                      pattern: {
                        value:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                        message: 'Insira uma URL válida.',
                      },
                    })}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.avatar?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Cor principal
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : '#172F56'}
                    {...register('mainColor', {
                      pattern: {
                        value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                        message: 'Insira uma cor válida.',
                      },
                    })}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.mainColor?.message}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 border-b-1 border-gray-300" />

            <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
              Representante da empresa
            </h6>
            {!disabled && (
              <div className="flex items-center p-2 my-3 bg-slate-500 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="font-md font-medium text-white py-4">
                  Atenção! O representante da empresa será responsável por todas
                  as ações realizadas na plataforma. <br /> Um e-mail será
                  enviado para a geração de senha e acesso.
                </p>
              </div>
            )}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : 'Nome Representante'}
                    {...register('representative.name', {
                      required: 'Nome do representante é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.representative?.name?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Telefone
                  </label>
                  <input
                    type="phone"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : '+55 11 99999-9999'}
                    {...register('representative.phone', {
                      required:
                        'Telefone do representante é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.representative?.phone?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder={disabled ? 'N/A' : 'representante@email.com'}
                    {...register('representative.email', {
                      required:
                        'Email do representante é um campo obrigatório.',
                    })}
                    disabled={disabled}
                    required
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.representative?.email?.message}
                  </p>
                </div>
              </div>
              {hasEmailCheckbox && (
                <div className="w-full lg:w-12/12 px-4 flex items-center">
                  <input
                    {...register('sendWelcomeEmail', {
                      required: false,
                      value: true,
                    })}
                    id="sendWelcomeEmail"
                    type="checkbox"
                    class="form-checkbox rounded text-blue-500 mr-2"
                  />
                  <label
                    htmlFor="sendWelcomeEmail"
                    className="text-sm font-semibold text-gray-600"
                  >
                    Enviar email de acesso para o representante?
                  </label>
                </div>
              )}
            </div>
            {!disabled && (
              <>
                <hr className="my-6 border-b-1 border-gray-300" />

                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase px-4">
                  Autenticação de 2 fatores
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        token
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder={disabled ? 'N/A' : '2341297'}
                        {...register('token2fa', {
                          required: 'Token 2FA',
                        })}
                        disabled={disabled}
                        required
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.token2fa?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
          <div className="pt-6 px-3 text-right">
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
    </div>
  )
}

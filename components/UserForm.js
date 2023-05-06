import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'

import { ButtonToggleStatusEntity } from './ButtonToggleStatusEntity'
import { formatRole } from 'utils/formatRole'
import { CpfCnpj } from './CpfCnpj'
import { formatGender } from 'utils/formatGender'

import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { fetcher } from 'utils/fetcher'
import { eres } from 'utils/eres'

export const UserForm = ({
  user = {},
  disabled,
  setDisabled,
  onSubmit,
  currentUser,
  hasTeamId,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: user,
  })

  const [teams, setTeams] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const [error, result] = await eres(fetcher({ path: '/teams' }))

      setTeams(result)
    }

    if (!hasTeamId) fetch()
  }, [hasTeamId])

  const whereUserBelong =
    user?.role?.split('_')[0] || currentUser?.role?.split('_')[0] || ''

  const getRules = process.env.NEXT_PUBLIC_ROLES.split(',').reduce(
    (acc, item) => {
      // Show every role to INIC
      if (whereUserBelong.includes('SUPER')) {
        return [
          ...acc,
          {
            value: item,
            label: formatRole(item),
          },
        ]
      }

      // DO NOT show roles that user doesn't belong
      if (!item.includes(whereUserBelong)) return acc

      // Show roles that user can see
      return [
        ...acc,
        {
          value: item,
          label: formatRole(item),
        },
      ]
    },
    []
  )

  const roles = process.env.NEXT_PUBLIC_ROLES ? getRules : []
  const genders = process.env.NEXT_PUBLIC_GENDERS
    ? process.env.NEXT_PUBLIC_GENDERS.split(',').reduce((acc, item) => {
        return [
          ...acc,
          {
            value: item,
            label: formatGender(item),
          },
        ]
      }, [])
    : []

  const selectTeams = teams?.reduce((acc, item) => {
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
        <div className="rounded-t bg-white mb-0 px-10 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {user?.id ? `Usuário ${user?.name}` : 'Registrar usuário'}
            </h6>
            <div>
              {disabled ? (
                <>
                  <ButtonToggleStatusEntity
                    entityName="users"
                    id={user?.id}
                    status={user?.status}
                    has2FA
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
            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="John Doe"
                    {...register('name')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="example@gmail.com"
                    {...register('email')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="*********"
                    {...register('password')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Confirmar senha
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="*********"
                    {...register('confirmPassword')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    CPF
                  </label>
                  <Controller
                    name="taxId"
                    rules={{
                      required: 'CPF é um campo obrigatório.',
                      validate: (v) => {
                        const value = v.replace(/\.|\-/g, '')
                        // validate CPF
                        if (isValidCPF(value)) return true
                        return `Insira um  'CPF válido`
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <CpfCnpj
                        mask="CPF"
                        placeholder="Seu CPF"
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
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="2000-02-11"
                    {...register('birthday')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.birthday?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Gênero
                  </label>
                  {disabled ? (
                    <p className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 rounded text-sm shadow bg-transparent shadow-none pl-0 pl-0">
                      {formatGender(user?.gender)}
                    </p>
                  ) : (
                    <Controller
                      control={control}
                      name="gender"
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
                            value={genders.find(
                              (item) => item.value === field.value
                            )}
                            options={genders}
                          />
                        )
                      }}
                    />
                  )}
                  <p className="text-xs text-red-600 mt-1">
                    {errors.gender?.message}
                  </p>
                </div>
              </div>
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
                    Atenção! Existem 2 tipos de usuários: usuário admin e
                    manager. <br /> O usuário admin tem acesso a todas as
                    funcionalidades do sistema, enquanto o usuário manager tem
                    acesso apenas à consulta dos sócios e gerencimento de
                    algumas funcionalidades.
                  </p>
                </div>
              )}
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Função
                  </label>
                  {disabled ? (
                    <p className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 rounded text-sm shadow bg-transparent shadow-none pl-0 pl-0">
                      {formatRole(user?.role)}
                    </p>
                  ) : (
                    <Controller
                      control={control}
                      name="role"
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
                            value={roles.find(
                              (item) => item.value === field.value
                            )}
                            options={roles}
                          />
                        )
                      }}
                    />
                  )}
                  <p className="text-xs text-red-600 mt-1">
                    {errors.role?.message}
                  </p>
                </div>
              </div>
              {teams && (
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                      Time
                    </label>
                    <Controller
                      control={control}
                      name="teamId"
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
                            value={selectTeams?.find(
                              (item) => item.value === field.value
                            )}
                            options={selectTeams}
                          />
                        )
                      }}
                    />
                    <p className="text-xs text-red-600 mt-1">
                      {errors.teamId?.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

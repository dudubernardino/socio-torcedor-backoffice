import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils'

import accountTypes from 'utils/accountTypes.json'
import { CpfCnpj } from './CpfCnpj'
import CurrencyInput from 'react-currency-input'

export const ApplicationForm = ({
  application = {},
  banks,
  disabled,
  setDisabled,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...application,
      fee: application?.fee ? application?.fee / 100 : null,
    },
  })

  const paymentMethods = watch('paymentMethods')
  const hasCreditorInfo = (paymentMethods = []) => {
    return ['PIX_INIC', 'PIX_MANU_AUTO'].some((method) =>
      paymentMethods.map((item) => item?.value || item?.name).includes(method)
    )
  }

  const bankOptions = banks.map((bank) => ({
    value: String(bank.ispb),
    label: bank.compe ? `${bank.compe} - ${bank.name}` : bank.name,
  }))
  const accountTypesOptions = accountTypes.map(({ value, label }) => ({
    value,
    label,
  }))

  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">
              {application?.clientId
                ? `App: ${application?.name}`
                : 'Registrar nova aplicação'}
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
              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    autoFocus
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="Minha aplicação"
                    {...register('name')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-12/12">
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
              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Cor principal
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="#e353e3"
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
              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Avatar</span>{' '}
                    <span className="font-medium">
                      (de preferencia quadrada)
                    </span>
                  </label>
                  <input
                    type="url"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="https://iniciador.com.br/avatar.png"
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
              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">
                      Tarifa para o usuário final
                    </span>{' '}
                    <span className="font-medium">
                      (exibido na interface por obrigação regulatória e não será
                      debitado automaticamente pelo sistema)
                    </span>
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
              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                    Métodos de Pagamento
                  </label>
                  <Controller
                    control={control}
                    name="paymentMethods"
                    rules={{
                      required: 'Métodos de pagamento é um campo obrigatório.',
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
                            value: item?.name || item?.value,
                            label: item?.name || item?.label,
                          })) ?? ''
                        }
                        options={process.env.NEXT_PUBLIC_PAYMENT_METHODS.split(
                          ','
                        ).map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    )}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors?.paymentMethods?.message}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">Webhook link</span>{' '}
                    <span className="font-medium">
                      (Endereço para receber notificações de transações)
                    </span>
                  </label>
                  <input
                    type="url"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="https://yourwebsite.com/webhook"
                    {...register('webhookUrl', {
                      pattern: {
                        value:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                        message: 'Insira uma URL válida.',
                      },
                    })}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.webhookUrl?.message}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-12/12">
                <div className="relative w-full mb-3">
                  <label className="block text-gray-600 text-xs font-bold mb-2">
                    <span className="uppercase">
                      Webhook HMAC chave para assinatura
                    </span>{' '}
                    <span className="font-medium">
                      (Sua chave secreta para assinar as notificações de
                      transações)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                    placeholder="sua chave secreta"
                    {...register('webhookHMacKey')}
                    disabled={disabled}
                  />
                  <p className="text-xs text-red-600 mt-1">
                    {errors.webhookHMacKey?.message}
                  </p>
                </div>
              </div>
            </div>
            {hasCreditorInfo(paymentMethods) && (
              <>
                {paymentMethods.map((i) => i.value)?.includes('PIX_INIC') && (
                  <div className="flex justify-center items-center p-2 my-3 bg-slate-500 rounded-md ">
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
                      Atenção! Certifique-se que ao selecionar PIX_INIC os dados
                      da conta são referentes a chave Pix cadastrada no CNPJ da
                      empresa. <br />
                      Não utilize PIX_INIC caso o CNPJ não seja cadastrado como
                      chave Pix.
                    </p>
                  </div>
                )}
                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Conta bancária para depósito dos pagamentos
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Banco de destino
                      </label>
                      <Controller
                        control={control}
                        name="creditor.ispb"
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
                              onChange={(data) => field.onChange(data.value)}
                              value={bankOptions.find(
                                (item) => item.value === field.value
                              )}
                              placeholder="Procurar..."
                              options={bankOptions}
                            />
                          )
                        }}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.creditor?.ispb?.message}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 lg:pr-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        <span className="uppercase">Agência</span>{' '}
                        <span className="font-medium">(sem dígito)</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="0001"
                        {...register('creditor.issuer')}
                        disabled={disabled}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.creditor?.issuer?.message}
                      </p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <div className="relative w-full mb-3 lg:pl-4">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        <span className="uppercase">Conta</span>{' '}
                        <span className="font-medium text-xs">
                          (sem hifen e com dígito, caso letra substituir por 0)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="999999"
                        {...register('creditor.number')}
                        disabled={disabled}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.creditor?.number?.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:bg-transparent disabled:shadow-none disabled:pl-0 disabled:pl-0"
                        placeholder="John Doe"
                        {...register('creditor.name')}
                        disabled={disabled}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.creditor?.name?.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        CNPJ
                      </label>
                      <Controller
                        name="creditor.taxId"
                        rules={{
                          validate: (v) => {
                            if (!v) return
                            const value = v.replace(/\.|\-/g, '')
                            // validate CNPJ
                            if (isValidCNPJ(value)) return true
                            // validate CPF
                            if (isValidCPF(value)) return true
                            return `Insira um ${
                              value.length <= 11 ? 'CPF' : 'CNPJ'
                            } válido`
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <CpfCnpj
                            placeholder="Seu CNPJ"
                            disabled={disabled}
                            value={field.value}
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
                        {errors.creditor?.taxId?.message}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-12/12">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-600 text-xs font-bold mb-2">
                        Tipo de conta
                      </label>
                      <Controller
                        control={control}
                        name="creditor.accountType"
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={disabled}
                            isLoading={false}
                            isClearable
                            isSearchable
                            onChange={(data) => field.onChange(data.value)}
                            value={accountTypesOptions.find(
                              (item) => item.value === field.value
                            )}
                            placeholder="Procurar..."
                            options={accountTypesOptions}
                          />
                        )}
                      />
                      <p className="text-xs text-red-600 mt-1">
                        {errors.creditor?.accountType?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
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
          <div className="pt-6 text-right">
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

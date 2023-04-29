import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

import { eres } from 'utils/eres'
import { fetcher } from 'utils/fetcher'
import { errorAlert } from 'utils/errorAlert'

export const TwoFASetupInfo = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetch = async () => {
      const [error, result] = await eres(fetcher({ path: '/2fa/setup' }))

      if (error) {
        setError(true)
        return errorAlert(error)
      }

      setData(result)
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="my-4">
      <p>Cadastre em seu aplicativo de dois fatores</p>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro</p>}
      {!loading && !error && (
        <>
          <QRCodeSVG value={data?.link} className="py-3" />
          <CopyToClipboard
            text={data?.secret}
            onCopy={() => toast.success('Copiado com sucesso!')}
          >
            <button
              className="bg-gray-700 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Copiar secret
            </button>
          </CopyToClipboard>
        </>
      )}

      <div />
    </div>
  )
}

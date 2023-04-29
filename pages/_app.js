import 'styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'
import { SWRConfig } from 'swr'

import { Sidebar } from 'components/Sidebar'
import { fetcher } from 'utils/fetcher'

function App({ Component, pageProps }) {
  return (
    <div>
      <SWRConfig value={{ fetcher }}>
        {pageProps?.outsideLayout ? null : <Sidebar />}
        <Component {...pageProps} />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </SWRConfig>
    </div>
  )
}

export default App

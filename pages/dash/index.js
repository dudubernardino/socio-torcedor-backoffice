import Head from 'next/head'

import { Stats } from 'components/Stats'

function Dash() {
  return (
    <>
      <Head>
        <title>Dash - Backoffice Iniciador</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <Stats />
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* <Chart /> */}
          <p className="mt-10 font-medium">
            Estamos só no começo. Aguarde para estatísticas.
          </p>
        </div>
      </div>
    </>
  )
}

export default Dash

export const getServerSideProps = async ({ req, res }) => {
  return {
    redirect: {
      destination: '/dash/payments',
      permanent: false,
    },
  }
}

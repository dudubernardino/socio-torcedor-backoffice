import React from 'react'
import Head from 'next/head'

function SLA() {
  return (
    <>
      <Head>
        <title>SLA - Backoffice Sócio API</title>
      </Head>
      <div className="relative md:ml-64 bg-gray-100 h-full">
        <div className="px-4 md:px-10 mx-auto w-full">
          <h2 className="text-xl text-gray-800 font-semibold py-4 mr-3">
            SLA do Iniciador
          </h2>
          <table className="table-auto mt-4">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-400">
                  Ordem de Prioridade
                </th>
                <th className="p-4 border-b border-slate-400">Demanda</th>
                <th className="p-4 border-b border-slate-400">Prazo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-slate-400 font-medium">
                  Prioridade 1
                </td>
                <td className="p-4 border-b border-slate-400">
                  Problemas que afetam os principais recursos do produto para um
                  grande número de usuários.
                </td>
                <td className="p-4 border-b border-slate-400">
                  Atendimento em dias úteis, em horário comercial e com prazo de
                  retorno em até 8 (oito) horas.
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-400 font-medium">
                  Prioridade 2
                </td>
                <td className="p-4 border-b border-slate-400">
                  Problemas que afetam os recursos anexados do produto para um
                  grande número de usuários ou que causam danos irreversíveis.
                </td>
                <td className="p-4 border-b border-slate-400">
                  Atendimento em dias úteis, em horário comercial e com prazo de
                  retorno em até 2 (dois) dias úteis.
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-400 font-medium">
                  Prioridade 3
                </td>
                <td className="p-4 border-b border-slate-400">
                  Problemas que afetam um pequeno número de usuários.
                </td>
                <td className="p-4 border-b border-slate-400">
                  Análise da demanda e retorno em 2 (dois) dias úteis.
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-400 font-medium">
                  Prioridade 4
                </td>
                <td className="p-4 border-b border-slate-400">
                  Problemas que não afetam significativamente o uso da
                  plataforma.
                </td>
                <td className="p-4 border-b border-slate-400">
                  Análise da demanda e retorno em 10 (dez) dias úteis.
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-400 font-medium">
                  Prioridade 5
                </td>
                <td className="p-4 border-b border-slate-400">
                  Novas demandas.
                </td>
                <td className="p-4 border-b border-slate-400">
                  Elaboração de orçamento não sujeito a prazo.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SLA

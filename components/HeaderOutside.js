import React, { useState } from 'react'
import Link from 'next/link'

export const HeaderOutside = () => {
  const [collapseShow, setCollapseShow] = useState('hidden')

  return (
    <nav className="top-0 absolute z-50 w-full px-2 py-3 navbar-expand-lg">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            href="/"
            className="flex justify-center items-center text-white text-sm font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase"
          >
            <img
              src="/socio-torcedor-logo.png"
              className="w-28 h-28"
              alt="Sócio API Logo"
            />
            Backoffice
          </Link>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setCollapseShow('bg-gray-200 m-2 py-3 px-6')}
          >
            <i className="text-white fas fa-bars"></i>
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row justify-center items-center list-none lg:ml-auto">
            <li className="flex items-center mr-3">
              <a
                className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                href="https://app.getpostman.com/run-collection/24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf?action=collection%2Ffork&collection-url=entityId%3D24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf%26entityType%3Dcollection%26workspaceId%3D449f39d5-fbc0-4907-b84a-8ecfc771c5f5"
                target="_blank"
                rel="noreferrer"
              >
                <i className="lg:text-gray-200 text-gray-400 far fa-file-alt text-lg leading-lg mr-2"></i>{' '}
                Docs
              </a>
            </li>

            <li className="flex items-center">
              <a
                className="bg-white text-gray-700 active:bg-gray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                href="https://www.linkedin.com/in/dudubernardino"
                target="_blank"
                rel="noreferrer"
              >
                Entre em contato
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
          collapseShow
        }
      >
        {/* Collapse header */}
        <div className="md:min-w-full md:hidden block pb-4 mb-4">
          <div className="flex flex-wrap">
            <div className="w-6/12">
              <Link
                href="/"
                className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
              >
                Backoffice Sócio API
              </Link>
            </div>
            <div className="w-6/12 flex justify-end">
              <button
                type="button"
                className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                onClick={() => setCollapseShow('hidden')}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-gray-200 text-gray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://app.getpostman.com/run-collection/24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf?action=collection%2Ffork&collection-url=entityId%3D24863168-1e9bedb3-fa00-4efa-9a91-8c82f3cd39cf%26entityType%3Dcollection%26workspaceId%3D449f39d5-fbc0-4907-b84a-8ecfc771c5f5"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="lg:text-gray-200 text-gray-400 far fa-file-alt text-lg leading-lg mr-2"></i>{' '}
                  Docs
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="bg-white text-gray-700 active:bg-gray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 m-3 ease-linear transition-all duration-150"
                  href="https://www.linkedin.com/in/dudubernardino"
                  target="_blank"
                  rel="noreferrer"
                >
                  Entre em contato
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

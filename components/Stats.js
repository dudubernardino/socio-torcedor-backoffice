import React from 'react'

const CardStats = ({
  statSubtitle = 'Traffic',
  statTitle = '350,897',
  statArrow = 'up',
  statPercent = '3.48',
  statPercentColor = 'text-emerald-500',
  statDescripiron = 'Since last month',
  statIconName = 'far fa-chart-bar',
  statIconColor = 'bg-black',
}) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-gray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          {/* <p className="text-sm text-gray-400 mt-4">
            <span className={statPercentColor + ' mr-2'}>
              <i
                className={statArrow === 'up' ? 'fas fa-arrow-up' : statArrow === 'down' ? 'fas fa-arrow-down' : ''}
              ></i>{' '}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p> */}
        </div>
      </div>
    </>
  )
}

export const Stats = () => {
  return (
    <>
      {/* Header */}
      <div className="relative bg-black pb-12 pt-6">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <h2 className="text-white text-xl font-semibold px-4 pb-4">
              Overview 2022
            </h2>

            {/* Card stats */}
            {/* <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="iniciações"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-black"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="iniciações fina."
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-bar"
                  statIconColor="bg-black"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="clientes"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-black"
                />
              </div> 
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-blue-500"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export const Panel = ({ title, children }) => {
  return (
    <div className="px-4 md:px-10 mx-auto w-full bg-gray-100 py-6">
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 id="keys" className="text-gray-700 text-xl font-bold">
              {title}
            </h6>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

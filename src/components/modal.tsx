interface Props {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: { target: HTMLInputElement }) => void;
  saveModal: () => void;
  data: {
    ppn: string;
    extra: string;
  };
}

export default function Modal({
  setModalShow,
  data,
  handleChange,
  saveModal,
}: Props) {
  return (
    <>
      {/* Main modal */}
      <div
        id="default-modal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-gray-50"
      >
        <div className="relative p-4 w-full max-w-prose min-h-svh mx-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
              <h3 className="text-xl font-semibold dark:text-white">Setting</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setModalShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <form className="max-w-sm mx-auto">
                <div className="mb-4">
                  <label
                    htmlFor="ppn"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ppn:
                  </label>
                  <input
                    type="number"
                    id="ppn"
                    aria-describedby="helper-text-explanation"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                    value={data.ppn}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="extra"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Extra:
                  </label>
                  <input
                    type="number"
                    id="extra"
                    aria-describedby="helper-text-explanation"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                    value={data.extra}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 rounded-b">
              <button
                onClick={saveModal}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

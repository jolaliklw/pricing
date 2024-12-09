import { useState } from 'react';
import InputOut from './ui/input-out';
import Label from './ui/label';
import Update from './update';
import { InitialState } from '../App';
import { setLocalData } from '../lib/utils';

interface Props {
  pricingDetails: InitialState;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ pricingDetails, setOpenSetting }: Props) {
  const [setting, setSetting] = useState({
    ppn: pricingDetails.ppn,
    extra: pricingDetails.extra,
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;

    if (id === 'ppn') {
      setSetting({ ...setting, ppn: value });
      return;
    }

    if (id === 'extra') setSetting({ ...setting, extra: value });
  };

  const saveSetting = () => {
    if (
      pricingDetails.ppn !== setting.ppn ||
      pricingDetails.extra !== setting.extra
    ) {
      setLocalData({
        ...pricingDetails,
        ppn: setting.ppn,
        extra: setting.extra,
        berat: '',
      });
    }

    location.reload();
  };

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
              <h3 className="text-xl font-semibold">Setting</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setOpenSetting(false)}
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
              <form className="max-w-sm mx-auto [&>*:not(:last-child)]:mb-4 [&>*>label]:mb-1">
                <div>
                  <Label htmlFor="ppn">Ppn</Label>
                  <InputOut
                    type="number"
                    id="ppn"
                    value={setting.ppn}
                    onChange={handleInput}
                    step={0.5}
                  />
                </div>
                <div>
                  <Label htmlFor="extra">Extra</Label>
                  <InputOut
                    type="number"
                    id="extra"
                    value={setting.extra}
                    onChange={handleInput}
                    step={1000}
                  />
                </div>
              </form>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 rounded-b">
              <button
                disabled={isUpdate}
                onClick={saveSetting}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-200"
              >
                Save
              </button>
            </div>
          </div>

          <div className="mt-16 px-5">
            <Update pricingDetails={pricingDetails} setIsUpdate={setIsUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { Tabs } from 'flowbite-react';
import OrgTex from './OrgTex';
import PO from './PO';
import { ToastContainer } from 'react-toastify';
import { FaCopy } from 'react-icons/fa6';
import { useState } from 'react';



const AddCompyuter = () => {
  const [openCopyTab, setOpenCopyTab] = useState(false);

  const customTheme = {

    tablist: {
      tabitem: {
        base: "p-4",
        active: {
          on: "border-b-2 border-red-500",
          off: "border-transparent",
        },
      },
    },
  };

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" />
  }
  return (
    <>
      <Breadcrumb pageName="Добавить компьютер" />

      <div className="grid grid-cols-1 sm:grid-cols-4">

        <div className="col-span-4">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">


            <div className="max-w-full m-4">
              <Tabs aria-label="Tabs example" theme={customTheme}>
                <Tabs.Item active title="Типь орг. техника">
                  <OrgTex />
                </Tabs.Item>
                <Tabs.Item title="Программы обеспечение">
                  <PO />
                </Tabs.Item>
              </Tabs>


            </div>



          </div>
        </div >

      </div >

    </>
  );
};

export default AddCompyuter;

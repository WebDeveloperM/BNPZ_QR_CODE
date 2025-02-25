import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import MainTable from '../../components/Tables/MainTable';
import { BASE_URL } from '../../utils/urls';
import { Compyuter, InfoComputerData } from '../../types/compyuters';
import axioss from '../../api/axios';
import { isAuthenticated } from '../../utils/auth';
import { Navigate } from 'react-router-dom';
import { FaComputer } from "react-icons/fa6";
import { AiOutlinePrinter } from "react-icons/ai"
import { MdOutlineAdfScanner } from "react-icons/md";
import { RiWebcamLine } from "react-icons/ri";
import ComputerTable from '../../components/Tables/DataTable';

const Main: React.FC = () => {
  const [data, setData] = useState<Compyuter[] | null>()
  const [selectKey, setSelectKey] = useState<string | null>("")
  const [infoCompData, setInfoCompData] = useState<InfoComputerData | null>()
  const token = localStorage.getItem('token')

  console.log(selectKey, "2222222222222233333333333333333333333");
  
  useEffect(() => {
    if (!token) return
    axioss
      .get(`${BASE_URL}/all_compyuters/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));

    axioss
      .get(`${BASE_URL}/info-comp/`)
      .then((response) => {
        setInfoCompData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axioss
      .get(`${BASE_URL}/filter-data/${selectKey}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [selectKey]);

  console.log(data, "666666666666");



  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" />
  }

  return (
    <>
      {data ?
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats title="Компьютеры" total={`${infoCompData?.all_compyuters_count}`} setSelectKey={setSelectKey}>
              <FaComputer className="fill-primary dark:fill-white" width="20" height="22" />
            </CardDataStats>

            <CardDataStats title="Принтеры" total={`${infoCompData?.all_compyuters_with_printer}`} setSelectKey={setSelectKey} >
              <AiOutlinePrinter className="fill-primary dark:fill-white" width="20" height="22" />
            </CardDataStats>

            <CardDataStats title="Сканеры" total={`${infoCompData?.all_compyuters_with_scaner}`} setSelectKey={setSelectKey}>
              <MdOutlineAdfScanner className="fill-primary dark:fill-white" width="20" height="22" />
            </CardDataStats>

            <CardDataStats title="Веб-камеры" total={`${infoCompData?.all_compyuters_with_webcam}`} setSelectKey={setSelectKey}>
              <RiWebcamLine className="fill-primary dark:fill-white" width="20" height="22" />

            </CardDataStats>
          </div>

          <div className='mt-6'>
            {/* <MainTable /> */}
            <ComputerTable />
          </div>
        </> :
        <div className='flex justify-center mt-[10%]'>
          <div className='text-center'>
            <h1 className='text-5xl font-semibold mb-2'>Oшибка 500</h1>
            <p className='text-2xl'>(Internal Server Error)</p>
          </div>
        </div>
      }


    </>
  );
};

export default Main;

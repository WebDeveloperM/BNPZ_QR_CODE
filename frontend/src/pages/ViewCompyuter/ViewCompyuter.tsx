import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { BASE_IMAGE_URL, BASE_URL } from '../../utils/urls';
import { Compyuter } from '../../types/compyuters';
import Skeleton from '../../components/Skeleton/Skeleton';
import axioss from '../../api/axios';
import { isAuthenticated } from '../../utils/auth';
import { Link, Navigate, useParams } from 'react-router-dom';
import ModalMultySelectInputTexnology from '../../components/Input/ModalMultySelectInputTexnology';
import { ModalDataInput } from '../../components/Input/ModalDataInput';
import { GrEdit } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ViewCompyuter = () => {
  const { slug } = useParams()

  const [data, setData] = useState<Compyuter>()

  useEffect(() => {
    if (!slug) return; // Agar modalData yo'q bo'lsa, useEffect ishlamasin

    axioss
      .get(`${BASE_URL}/comp_detail/${slug}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [slug]);


  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" />
  }
  return (
    <>
      <Breadcrumb pageName="Информация о компьютере" />


      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="col-span-4">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-5">
            <div className="flex justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <Link to={`/`} type='submit' className="flex items-center justify-center gap-2 rounded-md bg-slate-500 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-5" >
                < FaLongArrowAltLeft className='text-xl' />
                Назад
              </Link>
              <Link to={`/edit-computer/${slug}`} type='submit' className="flex items-center justify-center gap-2 rounded-md bg-meta-3 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-7" >
                <GrEdit className='text-xl' />
                Редактировать
              </Link>

            </div>
            {
              data ?
                <div>

                  <div className="grid sm:grid-cols-12">
                    <div className="sm:col-span-2">
                      <div className="">
                        <img src={`${BASE_IMAGE_URL}/${data?.qr_image}`} className="ml-12 sm:ml-0" alt="" />
                      </div>

                    </div>
                    <div className="col-span-10 ">
                      <h1 className='p-5 pt-5 pb-3 font-semibold'>Основные параметры</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 border-b mb-2">
                        {data && <ModalDataInput label="Тип орг.техники" inputData={data.type_compyuter.name} />}
                        {data && <ModalDataInput label="Производитель МП" inputData={data.motherboard.name} />}

                        {data && <ModalDataInput label="Модель МП" inputData={data.motherboard_model.name} />}

                        {data && <ModalDataInput label="Процессор" inputData={data.CPU.name} />}

                        {data && <ModalDataInput label="Поколение процессора" inputData={data.generation.name} />}

                        {data && <ModalDataInput label="Частота процессора" inputData={data.frequency.name} />}

                        {data && <ModalDataInput label="Диск  HDD" inputData={data.HDD.name} />}

                        {data && <ModalDataInput label="Диск  SSD" inputData={data.SSD.name} />}

                        {data && <ModalDataInput label="Тип диска SSD" inputData={data.disk_type.name} />}

                        {data && <ModalDataInput label="Тип оперативки" inputData={data.RAM_type.name} />}

                        {data && <ModalDataInput label="Размер оперативной памяти" inputData={data.RAMSize.name} />}

                        {data && <ModalDataInput label="Видеокарта" inputData={data.GPU.name} />}

                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Монитор</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 border-b">
                        {data.type_monitor.length != 0 ? <div className='col-span-3'>
                          {data && <ModalMultySelectInputTexnology label="Тип Монитора" selectedIdComp={data.type_monitor} />}
                        </div> :
                          <div className='col-span-3'>
                            <h1>Нет монитора</h1>
                          </div>

                        }

                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Периферийные устройства</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-7 border-b">

                        <div className='col-span-3'>
                          {data && <ModalMultySelectInputTexnology label="Принтер" selectedIdComp={data.printer} />}
                        </div>
                        <div className='col-span-3'>
                          {data && <ModalMultySelectInputTexnology label="Сканер" selectedIdComp={data.scaner} />}
                        </div>

                        <div className='col-span-3'>
                          {data && <ModalMultySelectInputTexnology label="Тип вебкамера" selectedIdComp={data.type_webcamera} />}
                        </div>

                        {data.model_webcam && <ModalDataInput label="Модель вебкамеры" inputData={data.model_webcam.name} />}

                      </div>

                      <h1 className='p-5 pt-2 pb-3 font-semibold'>Подразделение</h1>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-7 border-b">


                        {data && <ModalDataInput label="Цех" inputData={data.departament.name} />}

                        {data && <ModalDataInput label="Пользователь" inputData={data.user} />}

                        {data && <ModalDataInput label="Руководитель подразделения" inputData={data.departament.name} />}

                        {data && <ModalDataInput label="Зав. склад" inputData={data.warehouse_manager.name} />}

                      </div>
                      <div className="grid sm:grid-cols-12 gap-4 p-5 py-3 pb-5 ">

                        {data && <ModalDataInput label="Номер пломбы" inputData={data.seal_number} />}
                        {data && <ModalDataInput label="IPv4 адрес" inputData={data.ipadresss} />}

                        {data && <ModalDataInput label="Физический(MAC) адрес" inputData={data.mac_adress} />}


                      </div>
                    </div>

                  </div>
                </div> :

                <div className='grid grid-cols-12'>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>
                  <div className='col-span-3 '>
                    <Skeleton />
                  </div>

                </div>

            }

          </div>
        </div>

      </div >

    </>
  );
};

export default ViewCompyuter;

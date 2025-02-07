import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddCompyuterSeleced from '../../components/SelectedGroup/AddCompyuterSeleced';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/urls';
import { TexnologyDataStructure } from '../../types/texnology';
import AddCompyuterSelecedTexnology from '../../components/SelectedGroup/AddCompyuterSelecedTexnology';
import { FaCopy } from "react-icons/fa";
import { Compyuter } from '../../types/compyuters';
import CopyCompyuterSeleced from '../../components/SelectedGroup/CopyCompyuterSeleced';
import MultySelectTexnology from '../../components/SelectedGroup/MultySelectTexnology';
const AddCompyuter = () => {
  const [data, setData] = useState<TexnologyDataStructure | null>(null)
  const [localData, setLocalData] = useState("")
  // const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);


  const [openCopyTab, setOpenCopyTab] = useState(false);

  const [compyuterData, setCompyuterData] = useState<Compyuter[]>([])
  const [compyuterDetailData, setCompyuterDetailData] = useState<Compyuter>()
  const [selectedCompyuterId, setSelectedCopyuterId] = useState<string | null>(null);

  // All selected Texnology items

  const [seal_number, setSealNumber] = useState<string>("");
  const [departament, setSelectedUser] = useState<number | null>(null);
  const [user, setUser] = useState<string>("");
  const [warehouse_manager, setSelectedWarehouseManagerId] = useState<number | null>(null);
  const [type_compyuter, setSelectedTypeCompyuterId] = useState<number | null>(null);
  const [motherboard, setSelectedMotherboardId] = useState<number | null>(null);
  const [motherboard_model, setSelectedMotherboardModelId] = useState<number | null>(null);
  const [CPU, setCPUId] = useState<number | null>(null);
  const [generation, setGenerationId] = useState<number | null>(null);
  const [frequency, setFrequencyId] = useState<number | null>(null);
  const [HDD, setHddId] = useState<number | null>(null);
  const [SSD, setSsdId] = useState<number | null>(null);
  const [disk_type, setDiskTypeId] = useState<number | null>(null);
  const [RAM_type, setRamTypeId] = useState<number | null>(null);
  const [RAMSize, setRamSizeId] = useState<number | null>(null);
  const [GPU, setGpuId] = useState<number | null>(null);
  const [ipadresss, setIpAddressId] = useState<string>("");
  const [mac_adress, setMacAddressId] = useState<string>("");

  const [printer, setPrinterId] = useState<number[] | null>(null);
  const [scaner, setScanerId] = useState<number[] | null>(null);
  const [type_webcamera, setTypeWebcameraId] = useState<number[] | null>(null);
  const [model_webcam, setModelWebcamId] = useState<number | null>(null);
  const [type_monitor, setTypeMonitorId] = useState<number[] | null>(null);
  const [diaganal_monitor, setDiaganalMonitorId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  
  // console.log(
  //   seal_number,
  //   departament,
  //   selectedWarehouseManagerId, 
  //   selectedTypeCompyuterId,
  //   selectedMotherboardId,
  //   selectedMotherboardModelId,
  //   cpuId,
  //   generationId,
  //   frequencyId,
  //   hddId,
  //   ssdId,
  //   ramTypeId,
  //   ramSizeId,
  //   gpuId,
  //   printerId,
  //   scanerId,
  //   typeWebcameraId,
  //   modelWebcamId,
  //   typeMonitorId,
  //   diaganalMonitorId
  // );

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all_compyuters/`)
      .then((response) => {
        setCompyuterData(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${BASE_URL}/all_texnology/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get(`${BASE_URL}/comp_detail/${selectedCompyuterId}`)
      .then((response) => {
        setCompyuterDetailData(response.data);
      })
      .catch((err) => console.log(err));
  }, [selectedCompyuterId]);

  useEffect(() => {
    setLocalData(data?.departament.find(x => x.id == Number(departament))?.boss_fullName as unknown as string)
  }, [departament]);


  return (
    <>
      <Breadcrumb pageName="Добавить компьютер" />


      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="col-span-4">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Введите компьютерные данные
              </h3>
              <button onClick={() => setOpenCopyTab(!openCopyTab)} className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" >
                <FaCopy />
                Копировать
              </button>
            </div>

            <div className={`mx-5 mt-4  ${openCopyTab ? "block" : "hidden"} `}>
              {data && <CopyCompyuterSeleced label='Выберите компьютер' compyuterData={compyuterData} setSelectedCopyuterId={setSelectedCopyuterId} />}
            </div>

            {/* {selectedCompyuterId != null ? */}
            <div className="grid grid-cols-12 gap-4 p-5 py-3 pb-5">
              <div className='col-span-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Номер пломбы
                </label>
                <input
                  type="text"
                  onChange={(e) => console.log(e.target.value, "22222222222222")}
                  placeholder="Номер пломбы"
                  className="w-full rounded-md border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSeleced label='Цех' selectData={data} setSelectedUser={setSelectedUser} />}
              </div>
              <div className='col-span-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Пользователь
                </label>
                <input
                  type="text"
                  placeholder="Пользователь"
                  className="w-full rounded-md border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className='col-span-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Руководитель подразделения
                </label>
                <input
                  value={localData}
                  disabled
                  type="text"
                  placeholder="Руководитель подразделения"
                  className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Зав. склад' selectData={data.warehouse_manager} selectedTexnologyId={setSelectedWarehouseManagerId} selectedIdComp={compyuterDetailData?.warehouse_manager.id} />}
              </div>

              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Тип орг.техники' selectData={data.type_compyuter} selectedTexnologyId={setSelectedTypeCompyuterId} selectedIdComp={compyuterDetailData?.type_compyuter.id} />}
              </div>

              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Производитель МП' selectData={data.motherboard} selectedTexnologyId={setSelectedMotherboardId} selectedIdComp={compyuterDetailData?.motherboard.id} />}
              </div>
              <div className='col-span-3'>
                {data &&
                  <AddCompyuterSelecedTexnology label='Модель МП'
                    selectData={data.motherboard_model}
                    selectedTexnologyId={setSelectedMotherboardModelId}
                    selectedIdComp={compyuterDetailData?.motherboard_model.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Процессор' selectData={data.cpu} selectedTexnologyId={setCPUId} selectedIdComp={compyuterDetailData?.CPU.id} />}
              </div>

              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Поколение процессора' selectData={data.generation} selectedTexnologyId={setGenerationId} selectedIdComp={compyuterDetailData?.generation.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Частота процессора' selectData={data.frequency} selectedTexnologyId={setFrequencyId} selectedIdComp={compyuterDetailData?.frequency.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Диск  HDD' selectData={data.hdd} selectedTexnologyId={setHddId} selectedIdComp={compyuterDetailData?.HDD.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Диск  SSD' selectData={data.ssd} selectedTexnologyId={setSsdId} selectedIdComp={compyuterDetailData?.SSD.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Тип диска' selectData={data.disk_type} selectedTexnologyId={setDiskTypeId} selectedIdComp={compyuterDetailData?.disk_type.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Тип оперативки' selectData={data.ram_type} selectedTexnologyId={setRamTypeId} selectedIdComp={compyuterDetailData?.RAM_type.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Размер оперативной памяти' selectData={data.ram_size} selectedTexnologyId={setRamSizeId} selectedIdComp={compyuterDetailData?.RAMSize.id} />}
              </div>
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Видеокарта' selectData={data.gpu} selectedTexnologyId={setGpuId} selectedIdComp={compyuterDetailData?.GPU.id} />}
              </div>

              <div className='col-span-3'>
                <label className="mb-3 block text-black dark:text-white">
                  IPv4 адрес
                </label>
                <input
                  type="text"
                  onChange={e => setIpAddressId(e.target.value)}
                  placeholder="IPv4 адрес"
                  className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className='col-span-3'>
                <label className="mb-3 block text-black dark:text-white">
                  Физический(MAC) адрес
                </label>
                <input
                  type="text"
                  onChange={e => setMacAddressId(e.target.value)}
                  placeholder="Физический(MAC) адрес"
                  className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className='col-span-3'>
                {data && <MultySelectTexnology label='Принтер' selectData={data.printer} selectedTexnologyId={setPrinterId} selectedIdComp={compyuterDetailData?.printer} />}                
              </div>
              <div className='col-span-3'>
                {data && <MultySelectTexnology label='Сканер' selectData={data.scaner} selectedTexnologyId={setScanerId} selectedIdComp={compyuterDetailData?.scaner} />}                
              </div>
              <div className='col-span-3'>
                {data && <MultySelectTexnology label='Тип вебкамера' selectData={data.type_webcamera} selectedTexnologyId={setTypeWebcameraId} selectedIdComp={compyuterDetailData?.type_webcamera} />}                
              </div>

     
              <div className='col-span-3'>
                {data && <AddCompyuterSelecedTexnology label='Модель вебкамеры' selectData={data.model_webcam} selectedTexnologyId={setModelWebcamId} selectedIdComp={compyuterDetailData?.model_webcam.id} />}
              </div>

              <div className='col-span-3'>
                {data && <MultySelectTexnology label='Тип Монитора' selectData={data.type_monitor} selectedTexnologyId={setTypeMonitorId} selectedIdComp={compyuterDetailData?.type_webcamera} />}                
              </div>
            
        

            </div>
            {/* :
              <div className="grid grid-cols-12 gap-4 p-5 py-3 pb-5">
                <div className='col-span-3'>
                  <label className="mb-3 block text-black dark:text-white">
                    Номер пломбы
                  </label>
                  <input
                    type="text"
                    placeholder="Номер пломбы"
                    className="w-full rounded-md border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSeleced label='Цех' selectData={data} setSelectedUser={setSelectedUser} />}
                </div>
                <div className='col-span-3'>
                  <label className="mb-3 block text-black dark:text-white">
                    Пользователь
                  </label>
                  <input
                    type="text"
                    placeholder="Пользователь"
                    className="w-full rounded-md border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className='col-span-3'>
                  <label className="mb-3 block text-black dark:text-white">
                    Руководитель подразделения
                  </label>
                  <input
                    value={localData}
                    disabled
                    type="text"
                    placeholder="Руководитель подразделения"
                    className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Зав. склад' selectData={data.warehouse_manager} selectedTexnologyId={setSelectedWarehouseManagerId} selectedIdComp={compyuterDetailData?.warehouse_manager.id} />}
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Тип орг.техники' selectData={data.type_compyuter} selectedTexnologyId={setSelectedTypeCompyuterId} selectedIdComp={compyuterDetailData?.type_compyuter.id} />}
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Производитель МП' selectData={data.motherboard} selectedTexnologyId={setSelectedMotherboardId} selectedIdComp={compyuterDetailData?.motherboard.id} />}
                </div>
                <div className='col-span-3'>
                  {data &&
                    <AddCompyuterSelecedTexnology label='Модель МП'
                      selectData={data.motherboard_model}
                      selectedTexnologyId={setSelectedMotherboardModelId}
                      selectedIdComp={compyuterDetailData?.motherboard_model.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Процессор' selectData={data.cpu} selectedTexnologyId={setCPUId} selectedIdComp={compyuterDetailData?.CPU.id} />}
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Поколение процессора' selectData={data.generation} selectedTexnologyId={setGenerationId} selectedIdComp={compyuterDetailData?.generation.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Частота процессора' selectData={data.frequency} selectedTexnologyId={setFrequencyId} selectedIdComp={compyuterDetailData?.frequency.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Диск  HDD' selectData={data.hdd} selectedTexnologyId={setHddId} selectedIdComp={compyuterDetailData?.HDD.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Диск  SSD' selectData={data.ssd} selectedTexnologyId={setSsdId} selectedIdComp={compyuterDetailData?.SSD.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Тип оперативки' selectData={data.ram_type} selectedTexnologyId={setRamTypeId} selectedIdComp={compyuterDetailData?.RAM_type.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Размер оперативной памяти' selectData={data.ram_size} selectedTexnologyId={setRamSizeId} selectedIdComp={compyuterDetailData?.RAMSize.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Видеокарта' selectData={data.gpu} selectedTexnologyId={setGpuId} selectedIdComp={compyuterDetailData?.GPU.id} />}
                </div>

                <div className='col-span-3'>
                  <label className="mb-3 block text-black dark:text-white">
                    IPv4 адрес
                  </label>
                  <input
                    type="text"
                    placeholder="IPv4 адрес"
                    className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className='col-span-3'>
                  <label className="mb-3 block text-black dark:text-white">
                    Физический(MAC) адрес
                  </label>
                  <input
                    type="text"
                    placeholder="Физический(MAC) адрес"
                    className="w-full rounded-md border-stroke  bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Принтер' selectData={data.printer} selectedTexnologyId={setPrinterId} selectedIdComp={compyuterDetailData?.printer.id} />}
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Сканер' selectData={data.scaner} selectedTexnologyId={setScanerId} selectedIdComp={compyuterDetailData?.scaner.id} />}
                </div>

                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Тип вебкамера' selectData={data.type_webcamera} selectedTexnologyId={setTypeWebcameraId} selectedIdComp={compyuterDetailData?.type_webcamera.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Модель вебкамеры' selectData={data.model_webcam} selectedTexnologyId={setModelWebcamId} selectedIdComp={compyuterDetailData?.model_webcam.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Тип Монитора' selectData={data.type_monitor} selectedTexnologyId={setTypeMonitorId} selectedIdComp={compyuterDetailData?.type_monitor.id} />}
                </div>
                <div className='col-span-3'>
                  {data && <AddCompyuterSelecedTexnology label='Диаганал Монитора' selectData={data.diaganal_monitor} selectedTexnologyId={setDiaganalMonitorId} selectedIdComp={compyuterDetailData?.diaganal_monitor.id} />}
                </div>


              </div>} */}

          </div>
        </div>

      </div>


      {/* <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-5">
        <div className="flex flex-col gap-9">

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Введите компьютерные данные
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-5 py-3">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Номер пломбы
                </label>
                <input
                  type="text"
                  placeholder="Номер пломбы"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Active Input
                </label>
                <input
                  type="text"
                  placeholder="Active Input"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Disabled label
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Toggle switch input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SwitcherOne />
              <SwitcherTwo />
              <SwitcherThree />
              <SwitcherFour />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <DatePickerOne />
              <DatePickerTwo />
            </div>
          </div>

          
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Textarea Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Default textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Active textarea
                </label>
                <textarea
                  rows={6}
                  placeholder="Active textarea"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
        
              <MultiSelect id="multiSelect" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AddCompyuter;

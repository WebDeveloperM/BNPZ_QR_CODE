import TreeSelectComponent from "../../components/TreeSelect/TreeSelect";

export default function PO() {
    // const handleChange = (ids: number[]) => {
    //     console.log("Ok");
    // }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-12">

            <div className="col-span-12 mx-3">

                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 border-r">
                        <h2 className="font-semibold">Лицензированный</h2>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-5">
                                <label className="text-gray-700 font-medium mt-2">
                                    Системная
                                    <span className="text-red-500 pl-1">*</span>
                                </label>

                                <TreeSelectComponent
                                // data={workerPositions.data?.data}
                                // language="uz"
                                // placeholder="Tanlang"
                                // onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-5">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы
                                    <span className="text-red-500 pl-1">*</span>
                                </label>

                                <TreeSelectComponent
                                // data={workerPositions.data?.data}
                                // language="uz"
                                // placeholder="Tanlang"
                                // onChange={handleChange}
                                />
                            </div>
                        </div>


                    </div>
                    {/* <div className="col-span-6">
                        <h2 className="font-semibold">Не лицензированный</h2>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Системная
                                    <span className="text-red-500 pl-1">*</span>
                                </label>

                                <TreeSelectComponent
                                // data={workerPositions.data?.data}
                                // language="uz"
                                // placeholder="Tanlang"
                                // onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы
                                    <span className="text-red-500 pl-1">*</span>
                                </label>

                                <TreeSelectComponent
                                // data={workerPositions.data?.data}
                                // language="uz"
                                // placeholder="Tanlang"
                                // onChange={handleChange}
                                />
                            </div>
                        </div>


                    </div> */}


                </div>



            </div>
        </div>
    )
}

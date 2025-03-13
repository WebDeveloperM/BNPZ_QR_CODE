import { useEffect, useState } from "react";
import TreeSelectComponent from "../../components/TreeSelect/TreeSelect";
import axioss from "../../api/axios";
import { BASE_URL } from "../../utils/urls";
import { TexnologyDataStructure } from "../../types/texnology";

import { Compyuter } from "../../types/compyuters";
import MultySelectTexnologyProgram from "../../components/SelectedGroup/MultySelectTexnologyProgram";

export default function PO() {
    // const handleChange = (ids: number[]) => {
    //     console.log("Ok");
    // }
    const [data, setData] = useState<TexnologyDataStructure | null>(null)
    const [program, setProgramId] = useState<number[] | null>(null);
    const [compyuterDetailData, setCompyuterDetailData] = useState<Compyuter>()
    const [selectedCompyuterId, setSelectedCopyuterId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean | null>(false)

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!selectedCompyuterId) return;
        axioss
            .get(`${BASE_URL}/comp_detail/${selectedCompyuterId}`)
            .then((response) => {
                setCompyuterDetailData(response.data);
            })
            .catch((err) => console.log(err));
    }, [selectedCompyuterId]);

    useEffect(() => {
        if (!token) return

        axioss
            .get(`${BASE_URL}/all_texnology/`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => console.log(err));
    }, []);



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

                                </label>
                                {data && <MultySelectTexnologyProgram label='Системная' selectData={data.program_with_license_and_systemic} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} />}

                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-5">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы

                                </label>

                                {data && <MultySelectTexnologyProgram label='Дополнительные' selectData={data.program_with_license_and_additional} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} />}

                            </div>
                        </div>


                    </div>
                    <div className="col-span-6">
                        <h2 className="font-semibold">Не лицензированный</h2>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Системная
                                </label>
                                {data && <MultySelectTexnologyProgram label='Системная' selectData={data.program_with_no_license_and_systemic} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} />}
                            </div>
                        </div>

                        <div className=" bg-white  dark:border-strokedark dark:bg-box mt-3">
                            <div className="mr-2">
                                <label className="text-gray-700 font-medium mt-2">
                                    Дополнительные программы

                                </label>

                                {data && <MultySelectTexnologyProgram label='Дополнительные' selectData={data.program_with_no_license_and_additional} selectedTexnologyId={setProgramId} selectedIdComp={compyuterDetailData?.printer} isSubmitted={isSubmitted} />}

                            </div>
                        </div>


                    </div>


                </div>



            </div>
        </div>
    )
}

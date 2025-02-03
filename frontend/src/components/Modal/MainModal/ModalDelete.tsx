
"use client";

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BASE_URL } from "../../../utils/urls";
import alert from "../../../images/icon/alert.png"


type Props = {
    openDeleteModal: boolean,
    setDeleteOpenModal: (value: boolean) => void,
    deleteModalData: string,
    setDeleteCompData: (value: boolean) => void,

}

export function ModalDeleteComponent({ openDeleteModal, setDeleteOpenModal, deleteModalData, setDeleteCompData }: Props) {
    // const [data, setData] = useState()
    // const [accept, setAccept] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        axios
            .delete(`${BASE_URL}/comp_delete/${deleteModalData}`)
            .then(() => {
                setLoading(false);
                setDeleteOpenModal(false);
                setDeleteCompData(true)
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error deleting:", err);
            });
    };
    // useEffect(() => {
    //     axios
    //         .post(`${BASE_URL}/comp_delete/${deleteModalData}`)
    //         .then((response) => {
    //             setData(response.data);
    //             navigate("/")
    //         })
    //         .catch((err) => console.log(err));
    // }, [accept]);

    // console.log(accept, "22222222");
    // console.log(data, "333333333333");


    return (
        <>
            {/* <Modal show={openDeleteModal} onClose={() => setDeleteOpenModal(false)} className="min-w-[80%]">
                <Modal.Header>Удалить компьютер</Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex justify-center">
                            <img src={alert} alt="" className="w-20 h-20 " />
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 text-center dark:text-gray-400">
                            Вы уверены, что хотите удалить этот компьютер из базы данных?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            setDeleteOpenModal(false)
                            setAccept(true)
                        }
                        }>Cоглосен</Button>
                    <Button color="gray" onClick={() => setDeleteOpenModal(false)}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal > */}


            <Modal show={openDeleteModal} onClose={() => setDeleteOpenModal(false)}>
                <Modal.Header>Подтвердите удаление</Modal.Header>
                <Modal.Body>
                    <div className="space-y-2">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex justify-center">
                            <img src={alert} alt="" className="w-20 h-20 " />
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 text-center dark:text-gray-400">
                            Вы уверены, что хотите удалить этот компьютер из базы данных?
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setDeleteOpenModal(false)}>Отмена</Button>
                    <Button color="red" onClick={handleDelete} disabled={loading}>
                        {loading ? "Удаление..." : "Удалить"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

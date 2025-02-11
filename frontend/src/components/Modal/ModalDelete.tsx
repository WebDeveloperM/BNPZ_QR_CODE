
"use client";

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BASE_URL } from "../../utils/urls";

import { FiAlertTriangle } from "react-icons/fi";
import axioss from "../../api/axios";

type Props = {
    openDeleteModal: boolean,
    setDeleteOpenModal: (value: boolean) => void,
    deleteModalData: string,
    setDeleteCompData: (value: boolean) => void,

}

export function ModalDeleteComponent({ openDeleteModal, setDeleteOpenModal, deleteModalData, setDeleteCompData }: Props) {

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        axioss
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


    return (
        <>
            <Modal show={openDeleteModal} onClose={() => setDeleteOpenModal(false)}>
                <Modal.Header>Подтвердите удаление</Modal.Header>
                <Modal.Body>
                    <div className="space-y-2">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex justify-center">
                            <FiAlertTriangle className="w-20 h-20 text-red-500" />
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

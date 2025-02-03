
"use client";

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/urls";
import { Compyuter } from "../types/compyuters";

type Props = {
    openModal: boolean,
    setOpenModal: (value: boolean) => void,
    modalData: string
}

export function ModalComponent({ openModal, setOpenModal, modalData }: Props) {
    const [data, setData] = useState<Compyuter>()

    useEffect(() => {
        axios
            .get(`${BASE_URL}/comp_detail/${modalData}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => console.log(err));
    }, [modalData]);

    console.log(data, "2222222222222");

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)} className="min-w-[80%]">
                <Modal.Header>О компьютере</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {data?.CPU.name}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

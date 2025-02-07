export type Department = {
    id: number;
    name: string;
    boss_fullName: string;
}

export type GenericType = {
    id: number;
    name: string;
}

export interface TexnologyDataStructure {
    departament: Department[];
    warehouse_manager: GenericType[];
    type_compyuter: GenericType[];
    motherboard: GenericType[];
    motherboard_model: GenericType[];
    cpu: GenericType[];
    generation: GenericType[];
    frequency: GenericType[];
    hdd: GenericType[];
    ssd: GenericType[];
    disk_type: GenericType[];
    ram_type: GenericType[];
    ram_size: GenericType[];
    gpu: GenericType[];
    printer: GenericType[];
    scaner: GenericType[];
    type_webcamera: GenericType[];
    model_webcam: GenericType[];
    type_monitor: GenericType[];
}




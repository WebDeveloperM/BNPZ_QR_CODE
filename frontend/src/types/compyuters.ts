export type Compyuter = {
    id: number;
    departament: {
        id: number,
        name: string,
        boss_fullName: string
    };
    warehouse_manager: {
        id: number,
        name: string
    },
    type_compyuter: {
        id: number,
        name: string
    },
    motherboard: {
        id: number,
        name: string
    },
    motherboard_model: {
        id: number,
        name: string
    },
    CPU: {
        id: number,
        name: string
    },
    generation: {
        id: number,
        name: string
    },
    frequency: {
        id: number,
        name: string
    },
    HDD: {
        id: number,
        name: string
    },
    SSD: {
        id: number,
        name: string
    },
    disk_type: {
        id: number,
        name: string
    },
    RAM_type: {
        id: number,
        name: string
    },
    RAMSize: {
        id: number,
        name: string
    },
    GPU: {
        id: number,
        name: string
    },
    printer: {
        id: number,
        name: string
    },
    scaner: {
        id: number,
        name: string
    },
    type_webcamera: {
        id: number,
        name: string
    },
    model_webcam: {
        id: number,
        name: string
    },
    type_monitor: {
        id: number,
        name: string
    },
    diaganal_monitor: {
        id: number,
        name: string
    },
    seal_number: string,
    user: string,
    ipadresss: string,
    mac_adress: string,
    qr_image: string,
    signature: string | null,
    joinDate: string,
    slug: string,
    isActive: boolean,
    addedUser: number
  };
  
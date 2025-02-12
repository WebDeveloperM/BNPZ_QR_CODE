

import { Select, Space } from 'antd';

import { GenericType } from '../../types/texnology';

type Props = {
    label: string;
    selectedIdComp: GenericType[] | null;
};

export default function ModalMultySelectInputTexnology({ label, selectedIdComp }: Props) {

    const defaultValues = Array.isArray(selectedIdComp)
        ? selectedIdComp.map(option => option.name)
        : [];

    // ✅ Tanlangan (default) qiymatlar
    // const defaultValues = selectedIdComp.map(option => option.value);

    return (
        <Space style={{ width: '100%' }} direction="vertical">
            {label && <label className="block text-black dark:text-white">{label}</label>}

            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%', height: "43px", marginTop: "3px" }}
                placeholder={label}
                showSearch
                optionFilterProp="label"
                disabled
                defaultValue={defaultValues} // ✅ Tanlangan qiymatlar
                // className="dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500"
            />
        </Space>
    );
}

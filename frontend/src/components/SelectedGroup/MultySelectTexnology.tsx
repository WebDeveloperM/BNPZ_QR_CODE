
import { Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { GenericType } from '../../types/texnology';

type Props = {
    label: string;
    selectData: GenericType[];
    selectedIdComp: GenericType[] | undefined;
    selectedTexnologyId: React.Dispatch<React.SetStateAction<number[] | null>>;
};

export default function MultySelectTexnology({ label, selectData, selectedIdComp, selectedTexnologyId }: Props) {
    // Select uchun optionlarni yaratish
    const options = selectData?.map(item => ({
        label: item.name,
        value: item.id
    })) || [];

    // **State to control selected values**
    const [selectedValues, setSelectedValues] = useState<number[]>([]);

    // **Sync state with props when component mounts or props change**
    useEffect(() => {
        if (selectedIdComp) {
            setSelectedValues(selectedIdComp.map(item => item.id));
        }
    }, [selectedIdComp]);

    // **Handle change event**
    const handleChange = (value: number[]) => {
        setSelectedValues(value);
        selectedTexnologyId(value);
    };

    return (
        <Space style={{ width: '100%' }} direction="vertical">
            {label && <label className="block text-black dark:text-white">{label}</label>}

            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%', height: "42px", marginTop: "3px" }}
                placeholder={label}
                showSearch
                className="dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500"
                optionFilterProp="label"
                onChange={handleChange}
                options={options}
                value={selectedValues} // **Local state bilan bog‘lash**
            />
        </Space>
    );
}

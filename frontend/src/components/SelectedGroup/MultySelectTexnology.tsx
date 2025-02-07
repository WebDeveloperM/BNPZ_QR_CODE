import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { GenericType } from '../../types/texnology';

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

type Props = {
    label: string;
    selectData: GenericType[];
    selectedIdComp: GenericType[] | undefined;
    selectedTexnologyId: React.Dispatch<React.SetStateAction<number[] | null>>

};


export default function MultySelectTexnology({ label, selectData, selectedIdComp, selectedTexnologyId }: Props) {
    const handleChange = (value: number[]) => {
        selectedTexnologyId(value)
    };
    const options = selectData?.map(item => ({
        label: item.name,
        value: item.id
    })) || [];


    return (
        <Space style={{ width: '100%' }} direction="vertical">
            {label && <label className="block text-black dark:text-white">{label}</label>}

            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%', height: "43px", marginTop: "3px" }}
                placeholder={label}
                showSearch // Qidiruvni yoqish
                optionFilterProp="label" // Qidiruv qaysi field orqali ishlashini ko'rsatish
                onChange={handleChange}
                options={options}
            />
        </Space>


    )
}



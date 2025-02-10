// import { Select, Space } from 'antd';
// import type { SelectProps } from 'antd';
// import { GenericType } from '../../types/texnology';

// const options: SelectProps['options'] = [];

// for (let i = 10; i < 36; i++) {
//     options.push({
//         label: i.toString(36) + i,
//         value: i.toString(36) + i,
//     });
// }

// type Props = {
//     label: string;
//     selectedIdComp: GenericType[] | null;
// };


// export default function ModalMultySelectInputTexnology({ label, selectedIdComp }: Props) {

//     const options = Array.isArray(selectedIdComp)
//         ? selectedIdComp.map(item => ({
//             label: item.name,
//             value: item.id
//         }))
//         : []; // ❗️ Bo‘sh massiv qaytariladi

//     return (
//         <Space style={{ width: '100%' }} direction="vertical">
//             {label && <label className="block text-black dark:text-white">{label}</label>}

//             <Select
//                 mode="multiple"
//                 allowClear
//                 style={{ width: '100%', height: "43px", marginTop: "3px" }}
//                 placeholder={label}
//                 showSearch // Qidiruvni yoqish
//                 optionFilterProp="label" // Qidiruv qaysi field orqali ishlashini ko'rsatish
//                 options={options}
//             />
//         </Space>


//     )
// }


import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
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
            />
        </Space>
    );
}

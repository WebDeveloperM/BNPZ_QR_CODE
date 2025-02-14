// import { useState, useEffect } from 'react';
// import { TexnologyDataStructure } from '../../types/texnology';

// type Props = {
//   label: string,
//   selectData: TexnologyDataStructure,
//   setSelectedUser: React.Dispatch<React.SetStateAction<number | null>>
//   isSubmitted: boolean | null
// }

// export default function AddCompyuterSeleced({ label, selectData, setSelectedUser, isSubmitted }: Props) {
//   const [selectedOption, setSelectedOption] = useState<string>('');
//   const [_, setIsOptionSelected] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>("");


//   console.log(selectedOption, "55555555555555");

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (event.target instanceof Element && !event.target.closest('.dropdown-container')) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener('click', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   const filteredOptions = selectData.departament?.filter((data) =>
//     data.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelect = (value: string) => {
//     setSelectedOption(value);
//     setSelectedUser(Number(value));
//     setIsOptionSelected(true);
//     setIsDropdownOpen(false);
//   };



//   return (
//     <div className="relative dropdown-container">
//       <label className="mb-3  block text-black dark:text-white ">{label}</label>
//       <div className="bg-white dark:bg-form-input relative">
//         <div
//           className="w-full flex pt-2 appearance-none rounded-md border h-11 border-stroke bg-transparent px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input cursor-pointer"
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         >
//           {selectedOption ? selectData.departament?.find(d => d.id === Number(selectedOption))?.name : label}
//         </div>
//         {isDropdownOpen && (
//           <div className="absolute left-0 right-0 bg-white dark:bg-form-input border border-stroke mt-1 rounded-md shadow-lg z-20">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 border-b border-gray-300 outline-none"
//               placeholder="Поиск..."
//               autoFocus
//             />
//             <div className="max-h-40 overflow-auto">
//               {filteredOptions?.map((data) => (
//                 <div
//                   key={data.id}
//                   onClick={() => handleSelect(data.id.toString())}
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
//                 >
//                   {data.name}
//                 </div>
//               ))}
//               {filteredOptions?.length === 0 && <div className="p-2 text-gray-500">Ничего не найдено.</div>}
//             </div>
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </div>
//         )}
//         <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g opacity="0.8">
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
//                 fill="#637381"
//               ></path>
//             </g>
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { TexnologyDataStructure } from '../../types/texnology';

type Props = {
  label: string,
  selectData: TexnologyDataStructure,
  setSelectedDepartment: React.Dispatch<React.SetStateAction<number | null>>,
  isSubmitted: boolean | null
}

export default function AddCompyuterSeleced({ label, selectData, setSelectedDepartment, isSubmitted }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Agar `isSubmitted` true bo‘lsa va hech qanday variant tanlanmagan bo‘lsa, xatolik chiqarish
    if (isSubmitted && !selectedOption) {
      setError("Обязательное поле");
    } else {
      setError(null);
    }
  }, [isSubmitted, selectedOption]);

  const filteredOptions = selectData.departament?.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setSelectedDepartment(Number(value));
    setIsDropdownOpen(false);
    setError(null); // Variant tanlanganda xatolikni o‘chirish
  };

  return (
    <div className="relative dropdown-container">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <div className="bg-white dark:bg-form-input relative">
        <div
          className={`w-full flex pt-2 appearance-none rounded-md border h-11 px-5 outline-none transition 
            ${error ? "border-red-500" : "border-stroke"} focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input cursor-pointer`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption ? selectData.departament?.find(d => d.id === Number(selectedOption))?.name : label}
        </div>
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 bg-white dark:bg-form-input border border-stroke mt-1 rounded-md shadow-lg z-20">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border-b border-gray-300 outline-none"
              placeholder="Поиск..."
              autoFocus
            />
            <div className="max-h-40 overflow-auto">
              {filteredOptions?.map((data) => (
                <div
                  key={data.id}
                  onClick={() => handleSelect(data.id.toString())}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {data.name}
                </div>
              ))}
              {filteredOptions?.length === 0 && <div className="p-2 text-gray-500">Ничего не найдено.</div>}
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}




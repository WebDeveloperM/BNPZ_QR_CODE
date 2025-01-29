import { Compyuter } from '../../types/compyuters';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_IMAGE_URL, BASE_URL } from "../../utils/urls";

// const productData: Product[] = [
//   {
//     image: ProductOne,
//     name: 'Apple Watch Series 7',
//     category: 'Electronics',
//     price: 296,
//     sold: 22,
//     profit: 45,
//   },
//   {
//     image: ProductTwo,
//     name: 'Macbook Pro M1',
//     category: 'Electronics',
//     price: 546,
//     sold: 12,
//     profit: 125,
//   },
//   {
//     image: ProductThree,
//     name: 'Dell Inspiron 15',
//     category: 'Electronics',
//     price: 443,
//     sold: 64,
//     profit: 247,
//   },
//   {
//     image: ProductFour,
//     name: 'HP Probook 450',
//     category: 'Electronics',
//     price: 499,
//     sold: 72,
//     profit: 103,
//   },
// ];

const TableTwo = () => {
  const [data, setData] = useState<Compyuter[]>([])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all_compyuters/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data, "111111111");


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Компьютеры
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">QR Code</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Цехы</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Пользователь</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Зав. склад</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Тип орг.техники</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Производитель МП</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Процессор</p>
        </div>
       
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Активен</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {data?.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke pb-4 pt-2 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
              <div className="h-12.5 w-15">
                <img src={`${BASE_IMAGE_URL}${product.qr_image}`} alt="Product" />
              </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.departament.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.user}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.warehouse_manager.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.type_compyuter.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.motherboard.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.CPU.name}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3"></p>
          </div>
      
        </div>
      ))}
    </div>
  );
};

export default TableTwo;

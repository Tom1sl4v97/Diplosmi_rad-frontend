import { useTranslation } from "react-i18next";
import OneOrder from "./OneOrder";

const orders = [
  {
    orderID: 1,
    orderNumber: "123456789",
    orderDate: "2021-08-01",
    orderReciverName: "John Doe",
    orderSum: 86.00,
    orderAddress: "Some address",
    orderPhone: "123456789",
    orderEmail: "some email",
    orderCity: "Some city",
    orderCountry: "Some country",
    orderPostCode: "123456789",
    orderDiscount: "0%",
    orderDiscountName: "None",
    orderShipping: 21.0,

    orderList: [
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20,
        itemQuantity: 3,
      },
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20.00,
        itemQuantity: 2,
      },
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20.00,
        itemQuantity: 1,
      },
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 31.00,
        itemQuantity: 2,
      },
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 15.00,
        itemQuantity: 3,
      },
    ],
  },
  {
    orderID: 2,
    orderNumber: "564655248",
    orderDate: "2021-08-01",
    orderReciverName: "John Doe",
    orderSum: 40.00,
    orderAddress: "Some address",
    orderPhone: "123456789",
    orderEmail: "some email",
    orderCity: "Some city",
    orderCountry: "Some country",
    orderPostCode: "123456789",
    orderDiscount: "10%",
    orderDiscountName: "Student",
    orderShipping: 8,
    orderList: [
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20.00,
        itemQuantity: 1,
      },
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20.00,
        itemQuantity: 1,
      },
    ],
  },
  {
    orderID: 3,
    orderNumber: "654564654",
    orderDate: "2021-08-01",
    orderReciverName: "John Doe",
    orderSum: 20.00,
    orderAddress: "Some address",
    orderPhone: "123456789",
    orderEmail: "some email",
    orderCity: "Some city",
    orderCountry: "Some country",
    orderPostCode: "123456789",
    orderDiscount: "0%",
    orderDiscountName: "None",
    orderShipping: 8.00,
    orderList: [
      {
        itemName: "High Quaility Italic Dress",
        itemSKU: "123456789",
        itemPrice: 20.00,
        itemQuantity: 1,
      },
    ],
  },
];

function ShoppingHistory() {
  const { t: text } = useTranslation();

  return (
    <>
      <div className="pb-16 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-8">
                {text("userShoppingHistoryLestOrders")}
              </p>

              {orders.length === 0 ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-8">
                    {text("userShoppingHistoryEmpty")}
                  </p>
                </div>
              ) : (
                <div className="relative overflow-x-auto shadow-md rounded-3xl w-full">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-base text-white uppercase bg-cyanDark">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          {text("userShoppingHistoryOrderNumber")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {text("userShoppingHistoryOrderDate")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {text("userShoppingHistoryOrderReciverName")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {text("userShoppingHistoryOrderTotalPrice")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">
                            {text("userShoppingHistoryOrderShowOrder")}
                          </span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">
                            {text("userShoppingHistoryOrderCancelOrder")}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <OneOrder order={order} key={order.orderID} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingHistory;

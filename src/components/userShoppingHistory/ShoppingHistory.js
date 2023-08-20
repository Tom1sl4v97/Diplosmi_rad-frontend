import { useTranslation } from "react-i18next";

import OneOrder from "./OneOrder";

function ShoppingHistory(props) {
  const { t: text } = useTranslation();
  const { userOderList } = props;

  return (
    <>
      <div className="md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 pt-4 md:pt-6 md:px-6 xl:px-8 w-full">
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-8">
                {text("userShoppingHistoryLestOrders")}
              </p>

              {userOderList.length === 0 ? (
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
                          {text("userShoppingHistoryOrderStatus")}
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
                      {userOderList.map((order) => (
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

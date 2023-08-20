import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFetchOrderList } from "../../hooks/fetchContent";
import { defaultSession, useSessionStorage } from "../../hooks/SessionStorage";

import Pagination from "../navigation/Pagination";
import LoadingCom from "../pomocno/LoadingCom";
import OneOrder from "../userShoppingHistory/OneOrder";

const serverURL = process.env.REACT_APP_SERVER_URL;

function ShopOrder() {
  const { t: text } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const skipPage = 10;

  const [userData] = useSessionStorage("userData", defaultSession);

  const { loadingData, orderList, totalCount } = useFetchOrderList(
    skipPage,
    currentPage * skipPage - skipPage,
    userData.tokenKey
  );

  const nextPage = () => {
    if (currentPage * skipPage < totalCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const deliveringHandler = async (orderID) => {
    await updateOrderStatus(orderID, "delivering");
  };

  const deliveredHandler = async (orderID) => {
    await updateOrderStatus(orderID, "delivered");
  };

  const updateOrderStatus = async (orderID, status) => {
    try {
      const url = serverURL + "/order/updateOrderStatus";
      const tokenKey = userData.tokenKey;

      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          orderID: orderID,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          <h1 className="block uppercase tracking-wide text-xl font-bold mb-2">
            {text("userShoppingHistoryOrderListOfAllOrders")}
          </h1>
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
                      {text("userShoppingHistoryOrderDelivered")}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">
                      {text("userShoppingHistoryOrderDelivering")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <OneOrder
                    key={order.orderNumber}
                    order={order}
                    deliveringHandler={deliveringHandler}
                    deliveredHandler={deliveredHandler}
                  />
                ))}
              </tbody>
            </table>

            <Pagination
              prevPage={prevPage}
              nextPage={nextPage}
              currentPage={currentPage}
              totalCount={totalCount}
              skipPage={skipPage}
              goToPage={goToPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ShopOrder;

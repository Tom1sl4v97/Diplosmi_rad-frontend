import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OrderDitailTitle from "../components/userShoppingHistory/OrderDitailTitle";
import OrderDitailItemsList from "../components/userShoppingHistory/OrderDitailItemsList";
import OrderDitailItemSummery from "../components/userShoppingHistory/OrderDitailItemSummery";
import OrderDitailCustomer from "../components/userShoppingHistory/OrderDitailCustomer";

function OrderDitailPage() {
  const orderData = useSelector((state) => state.userOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderData.orderNumber === "") {
      navigate("/shop/userShoppingHistory", { replace: true });
    }
  }, [orderData, navigate]);

  return (
    <>
      {orderData.orderNumber !== "" && (
        <div>
          <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <OrderDitailTitle
              orderNumber={orderData.orderNumber}
              orderDate={orderData.orderDate}
            />

            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                  <OrderDitailItemsList orderList={orderData.orderList} />
                </div>


                <OrderDitailItemSummery
                  orderSum={orderData.orderSum}
                  orderDiscount={orderData.orderDiscount}
                  orderDiscountName={orderData.orderDiscountName}
                  orderShippingName={orderData.orderShippingName}
                  orderShippingDescription={orderData.orderShippingDescription}
                  orderShipping={orderData.orderShipping}

                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <OrderDitailCustomer
                  orderReciverName={orderData.orderReciverName}
                  orderAddress={orderData.orderAddress}
                  orderCity={orderData.orderCity}
                  orderCountry={orderData.orderCountry}
                  orderPostCode={orderData.orderPostCode}
                  orderPhone={orderData.orderPhone}
                  orderEmail={orderData.orderEmail}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderDitailPage;

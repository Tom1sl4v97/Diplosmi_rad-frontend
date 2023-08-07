import { useTranslation } from "react-i18next";

function OrderDitailItemSummery(props) {
  const { t: text } = useTranslation();
  const { orderSum, orderDiscount, orderDiscountName, orderShipping } = props;
  const realDiscount = orderDiscount.split("%")[0];
  const priceMinusDiscount = (orderSum * realDiscount) / 100;

  return (
    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
        <h3 className="text-xl font-semibold leading-5 text-gray-800">
          {text("userShoppingHistorySummary")}
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base leading-4 text-gray-800">
              {text("userShoppingHistorySubtotal")}
            </p>
            <p className="text-base leading-4 text-gray-600">
              {orderSum.toFixed(2)}€
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800">
              {text("userShoppingHistoryDiscount")}{" "}
              <span className="bg-gray-200 p-1 text-xs font-medium leading-3 uppercase text-gray-800">
                {orderDiscountName}
              </span>
            </p>
            <p className="text-base leading-4 text-gray-600">
              -{priceMinusDiscount.toFixed(2)}€ ({orderDiscount})
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800">
              {text("userShoppingHistoryShipping")}
            </p>
            <p className="text-base leading-4 text-gray-600">
              {orderShipping.toFixed(2)}€
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base font-semibold leading-4 text-gray-800">
            {text("userShoppingHistoryTotal")}
          </p>
          <p className="text-base font-semibold leading-4 text-gray-600">
            {(orderSum - priceMinusDiscount + orderShipping).toFixed(2)}€
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
        <h3 className="text-xl font-semibold leading-5 text-gray-800">
          {text("userShoppingHistoryShipping")}
        </h3>
        <div className="flex justify-between items-start w-full">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-8">
              <img
                className="w-full h-full"
                alt="logo"
                src="https://i.ibb.co/L8KSdNQ/image-3.png"
              />
            </div>
            <div className="flex flex-col justify-start items-center">
              <p className="text-lg leading-6 font-semibold text-gray-800">
                DPD Delivery
                <br />
                <span className="font-normal">Delivery with 24 Hours</span>
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold leading-6 text-gray-800">
            {orderShipping.toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDitailItemSummery;

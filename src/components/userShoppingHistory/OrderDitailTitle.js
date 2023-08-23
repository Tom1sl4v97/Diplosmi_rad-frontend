import { useTranslation } from "react-i18next";

function OrderDitailTitle(props) {
  const { t: text } = useTranslation();
  const { orderNumber, orderDate } = props;

  return (
    <div className="flex justify-start item-start space-y-2 flex-col print:text-base">
      <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 print:text-base">
        {text("userShoppingHistoryOrderNumber")}: #{orderNumber}
      </h1>
      <p className="text-base font-medium leading-6 text-gray-600 print:text-base">
        {text("userShoppingHistoryOrderDate")}: {orderDate}
      </p>
    </div>
  );
}

export default OrderDitailTitle;

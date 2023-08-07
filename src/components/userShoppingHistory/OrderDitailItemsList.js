import { useTranslation } from "react-i18next";

function OrderDitailItemsList(props) {
  const { t: text } = useTranslation();
  const orderList = props.orderList;
  return (
    <>
      <p className="text-lg md:text-xl lg:text-2xl font-semibold leading-6 xl:leading-5 text-gray-800 mb-8">
        {text("userShoppingHistoryUserCart")}:
      </p>
      <div className="relative overflow-x-auto shadow-md rounded-3xl w-full">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-base text-white uppercase bg-cyanDark">
            <tr>
              <th scope="col" className="px-6 py-3">
                {text("userShoppingHistoryItemName")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("userShoppingHistoryItemSku")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("userShoppingHistoryItemPrice")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("userShoppingHistoryItemQuantity")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("userShoppingHistoryItemTotalPrice")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item) => (
              <tr key={item.sku} className="text-sm text-gray-800 hover:bg-gray-300">
                <td className="px-6 py-2 whitespace-nowrap">
                  {item.itemName}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {item.itemSKU}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {item.itemPrice.toFixed(2)}€
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {item.itemQuantity}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {(item.itemPrice * item.itemQuantity).toFixed(2)}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderDitailItemsList;

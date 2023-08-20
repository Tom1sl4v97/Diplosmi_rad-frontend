function OrderListTable(props) {
  const { orderList } = props;

  return (
    <>
      {orderList.map((order) => (
        <tr key={order.orderNumber}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.orderNumber}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.orderDate}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.reciverName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.totalPrice}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "delivering"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
              href="#"
              className="text-cyan hover:text-cyanDark"
              onClick={() => {
                console.log("Show order");
              }}
            >
              Show
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
              href="#"
              className="text-green-600 hover:text-green-900"
              onClick={() => {
                console.log("Delivered");
              }}
            >
              Delivered
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a
              href="#"
              className="text-yellow-600 hover:text-yellow-900"
              onClick={() => {
                console.log("Delivering");
              }}
            >
              Delivering
            </a>
          </td>
        </tr>
      ))}
    </>
  );
}

export default OrderListTable;

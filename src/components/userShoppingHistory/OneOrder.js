import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userOrderActions } from "../../store/UserOrder";
import { useNavigate } from "react-router-dom";

function OneOrder(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t: text } = useTranslation();
  const order = props.order;

  const ditailPageUrl =
    "/shop/userShoppingHistory/orderDetail/" + order.orderNumber;

  const detailOrderHandler = () => {
    dispatch(userOrderActions.setUserOrder(order));
    navigate(ditailPageUrl);
  };

  return (
    <tr className=" hover:bg-gray-300 border-b-2 text-black">
      <td className="px-6 py-4">{order.orderNumber}</td>
      <td className="px-6 py-4">{order.orderDate}</td>
      <td className="px-6 py-4">{order.orderReciverName}</td>
      <td className="px-6 py-4">{order.orderSum.toFixed(2)}€</td>
      <td className="px-6 py-4">{order.orderStatus}</td>
      <td className="px-6 py-4 text-right">
        <a
          onClick={detailOrderHandler}
          className="font-medium text-blue-600 hover:underline cursor-pointer"
        >
          {text("userShoppingHistoryOrderShowOrder")}
        </a>
      </td>

      <td className="px-6 py-4 text-right">
        <a href="#" className="font-medium text-rose-600 hover:underline">
          {text("userShoppingHistoryOrderCancelOrder")}
        </a>
      </td>
    </tr>
  );
}

export default OneOrder;

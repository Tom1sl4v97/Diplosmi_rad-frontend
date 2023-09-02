import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userOrderActions } from "../../store/UserOrder";
import { useNavigate } from "react-router-dom";
import { defaultSession, useSessionStorage } from "../../hooks/SessionStorage";

const serverURL = process.env.REACT_APP_SERVER_URL;

function OneOrder(props) {
  const [userData] = useSessionStorage("userData", defaultSession);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t: text } = useTranslation();
  const { order, deliveringHandler = null, deliveredHandler = null } = props;

  const ditailPageUrl =
    "/shop/userShoppingHistory/orderDetail/" + order.orderNumber;

  const detailOrderHandler = () => {
    dispatch(userOrderActions.setUserOrder(order));
    navigate(ditailPageUrl);
  };

  const cancelOrderHandler = async () => {
    console.log("cancel order");

    try {
      const url = serverURL + "/order/updateOrderStatus";
      const userOrderID = order.orderID;
      const tokenKey = userData.tokenKey;

      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          orderID: userOrderID,
          status: "canceled",
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

  const readyAndSendHandler = async () => {
    deliveringHandler(order.orderID);
  };

  const deliveredOrderHandler = async () => {
    deliveredHandler(order.orderID);
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

      {deliveredHandler === null && deliveringHandler === null ? (
        <td className="px-6 py-4 text-right">
          <button
            className={
              "font-medium text-rose-600 hover:underline " +
              (order.orderStatus !== "processing"
                ? " opacity-50 cursor-not-allowed"
                : "cursor-pointer")
            }
            disabled={order.orderStatus !== "processing"}
            onClick={cancelOrderHandler}
          >
            {text("userShoppingHistoryOrderCancelOrder")}
          </button>
        </td>
      ) : (
        <>
          <td className="px-6 py-4 text-right">
            <button
              className={
                "font-medium text-rose-600 hover:underline " +
                (order.orderStatus !== "processing"
                  ? " opacity-50 cursor-not-allowed"
                  : "cursor-pointer")
              }
              disabled={order.orderStatus !== "processing"}
              onClick={readyAndSendHandler}
            >
              {text("userShoppingHistoryOrderRedyAndSend")}
            </button>
          </td>
          <td className="px-6 py-4 text-right">
            <button
              className={
                "font-medium text-rose-600 hover:underline " +
                (order.orderStatus !== "delivering"
                  ? " opacity-50 cursor-not-allowed"
                  : "cursor-pointer")
              }
              disabled={order.orderStatus !== "delivering"}
              onClick={deliveredOrderHandler}
            >
              {text("userShoppingHistoryOrderDelivered")}
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default OneOrder;

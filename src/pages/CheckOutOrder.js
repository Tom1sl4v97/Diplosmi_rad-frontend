import {
  defaultSession,
  useLocalStorage,
  useSessionStorage,
} from "../hooks/SessionStorage";
import { useTranslation } from "react-i18next";
import {
  useFetchProductGetAccessToken,
  useFetchShippingMethods,
} from "../hooks/fetchProductCommTol";

import OrderDitailCustomer from "../components/userShoppingHistory/OrderDitailCustomer";
import OrderDitailItemSummery from "../components/userShoppingHistory/OrderDitailItemSummery";
import OrderDitailItemsList from "../components/userShoppingHistory/OrderDitailItemsList";
import OrderDitailTitle from "../components/userShoppingHistory/OrderDitailTitle";
import LoadingCom from "../components/pomocno/LoadingCom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const serverURL = process.env.REACT_APP_SERVER_URL;
const commercetoolsAuthClientId = process.env.REACT_APP_COMMERCETOOLS_CLIENT_ID;
const commercetoolsAuthClientSecret =
  process.env.REACT_APP_COMMERCETOOLS_SECRET;

function CheckOutOrder() {
  const { t: text } = useTranslation();
  const [userCart, setUserCart] = useLocalStorage("userCart", []);
  const [userData] = useSessionStorage("userData", defaultSession);
  const navigate = useNavigate();

  const accessTokenCT = useFetchProductGetAccessToken(
    commercetoolsAuthClientId,
    commercetoolsAuthClientSecret
  );
  const { shippingMethods, loading: shippingMethodsLoader } =
    useFetchShippingMethods(accessTokenCT);

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var orderList = [];
  var orderSum = 0;

  var userDateIsSet = false;

  if (
    userData.user.firstName === null ||
    userData.user.firstName === "" ||
    userData.user.lastName === null ||
    userData.user.lastName === "" ||
    userData.user.address === null ||
    userData.user.address === "" ||
    userData.user.city === null ||
    userData.user.city === "" ||
    userData.user.country === null ||
    userData.user.country === "" ||
    userData.user.postalCode === null ||
    userData.user.postalCode === "" ||
    userData.user.phoneNumber === null ||
    userData.user.phoneNumber === "" ||
    userData.user.firstName === undefined ||
    userData.user.lastName === undefined ||
    userData.user.address === undefined ||
    userData.user.city === undefined ||
    userData.user.country === undefined ||
    userData.user.postalCode === undefined ||
    userData.user.phoneNumber === undefined
  ) {
    userDateIsSet = true;
  }

  for (var i = 0; i < userCart.length; i++) {
    orderList.push({
      itemName: userCart[i].name,
      itemSKU: userCart[i].sku,
      itemPrice: userCart[i].price,
      itemQuantity: userCart[i].quantityInCart,
    });
    orderSum += userCart[i].price * userCart[i].quantityInCart;
  }

  const [selectedShippingMethod, setSelectedShippingMethod] = useState({});

  useEffect(() => {
    if (shippingMethods.length !== 0) {
      setSelectedShippingMethod({
        name: shippingMethods[0].name,
        description: shippingMethods[0].localizedDescription["en-US"],
        price:
          shippingMethods[0].zoneRates[0].shippingRates[0].price.centAmount /
          100,
      });
    }
  }, [shippingMethods]);

  const selectedShippingMethodHandler = (item) => {
    setSelectedShippingMethod(item);
  };

  const orderNewHandler = () => {
    const orderData = {
      orderStatus: "processing",
      orderDate: date,
      orderReciverName: userData.user.firstName + " " + userData.user.lastName,
      orderSum: orderSum,
      orderAddress: userData.user.address,
      orderPhone: userData.user.phoneNumber,
      orderEmail: userData.user.email,
      orderCity: userData.user.city,
      orderCountry: userData.user.country,
      orderPostCode: userData.user.postalCode,
      orderDiscount: "0%",
      orderDiscountName: "None",
      orderShippingName: selectedShippingMethod.name,
      orderShippingDescription: selectedShippingMethod.description,
      orderShipping: selectedShippingMethod.price,
      orderList: orderList,
    };

    sendNewOrder(orderData);
  };

  const sendNewOrder = async (orderData) => {
    const url = serverURL + "/order";
    const token = userData.tokenKey;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      setUserCart([]);
      setTimeout(() => {
        alert(data.message);
        navigate("/shop/userShoppingHistory");
      }, 100);
    }
  };

  return (
    <div>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <OrderDitailTitle
          orderNumber={text("shopCheckoutPageNewOrder")}
          orderDate={date}
        />

        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <OrderDitailItemsList orderList={orderList} />
            </div>

            {shippingMethodsLoader ? (
              <LoadingCom />
            ) : (
              <OrderDitailItemSummery
                orderSum={orderSum}
                orderDiscount={"0%"}
                orderDiscountName={"None"}
                orderShipping={8}
                shippingMethods={shippingMethods}
                selectedShippingMethodHandler={selectedShippingMethodHandler}
              />
            )}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <OrderDitailCustomer
              orderReciverName={
                userData.user.firstName + " " + userData.user.lastName
              }
              orderAddress={userData.user.address}
              orderCity={userData.user.city}
              orderCountry={userData.user.country}
              orderPostCode={userData.user.postalCode}
              orderPhone={userData.user.phoneNumber}
              orderEmail={userData.user.email}
              userDateIsSet={userDateIsSet}
              editUserDate={true}
              orderNewHandler={orderNewHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutOrder;

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function OrderDitailCustomer(props) {
  const { t: text } = useTranslation();
  const navigate = useNavigate();
  const {
    orderReciverName,
    orderAddress,
    orderCity,
    orderCountry,
    orderPostCode,
    orderPhone,
    orderEmail,
    userDateIsSet = false,
    editUserDate = false,
    orderNewHandler,
  } = props;

  const changeDestinationDataHandler = () => {
    navigate("/userSetting");
  };

  return (
    <>
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
        {text("userShoppingHistoryCustomerDetails")}
      </h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center py-2">
            <p className="text-base font-semibold pt-4 leading-4 text-left text-gray-800">
              {orderReciverName}
            </p>
          </div>

          <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 p w-full">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
              alt="email"
            />
            <p className="text-sm">{orderEmail}</p>
          </div>

          <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-2 w-full">
            <img
              className="w-6 h-6"
              src="https://img.icons8.com/?size=512&id=2olGSGqpqGWD&format=png"
              alt="phone"
            />
            <p className="text-sm">{orderPhone}</p>
          </div>
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 md:pl-12 xl:pl-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                {text("userShoppingHistoryShippingAddress")}
              </p>
              <div className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-sm text-gray-600">
                <p>
                  {text("userSettingsAdress")}: {orderAddress}
                </p>
                <p>
                  {text("userSettingsCity")}: {orderCity}
                </p>
                <p>
                  {text("userSettingsCountry")}: {orderCountry}
                </p>
                <p>
                  {text("userSettingsPostalCode")}: {orderPostCode}
                </p>
              </div>

              {userDateIsSet && (
                <p className="text-lg text-rose-700">
                  {text("shopCheckoutPageDestinationDataAreWrongOrEmpty")}
                </p>
              )}

              {editUserDate && (
                <button
                  type="button"
                  className="h-full w-full px-3 py-2 inline-block rounded-2xl bg-cyanLight text-sm font-medium text-gray-700 shadow-2xl transition duration-300 ease-in-out hover:text-white hover:bg-cyanDark"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={changeDestinationDataHandler}
                >
                  {text("shopCheckoutPageChangeDestinationData")}
                </button>
              )}
              {editUserDate && (
                <button
                  className={
                    "w-full bg-cyanDark font-bold rounded-full transition duration-300 hover:bg-cyan py-2 px-8 text-md text-white uppercase" +
                    (userDateIsSet ? " opacity-50 cursor-not-allowed" : "")
                  }
                  disabled={userDateIsSet}
                  onClick={orderNewHandler}
                >
                  {text("shopPageCheckout")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDitailCustomer;

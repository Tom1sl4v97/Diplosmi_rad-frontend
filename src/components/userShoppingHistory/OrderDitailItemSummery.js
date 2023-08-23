import { useTranslation } from "react-i18next";
import { useSessionStorage } from "../../hooks/SessionStorage";
import { useState } from "react";

function OrderDitailItemSummery(props) {
  const { t: text } = useTranslation();
  const [languageStorage] = useSessionStorage("language", "en-US");

  const {
    orderSum,
    orderDiscount,
    orderDiscountName,
    orderShippingName,
    orderShippingDescription,
    orderShipping,
    shippingMethods = [],
    selectedShippingMethodHandler,
  } = props;
  const realDiscount = orderDiscount.split("%")[0];
  const priceMinusDiscount = (orderSum * realDiscount) / 100;

  var shippingMethodsList = [];

  if (shippingMethods.length !== 0) {
    for (var i = 0; i < shippingMethods.length; i++) {
      const name = shippingMethods[i].name;
      var localizedName = null;

      if (shippingMethods[i].localizedName !== undefined) {
        localizedName = shippingMethods[i].localizedName[languageStorage];
      } else {
        localizedName = name;
      }

      const description =
        shippingMethods[i].localizedDescription[languageStorage] ||
        shippingMethods[i].localizedDescription["en-US"];

      const price =
        shippingMethods[i].zoneRates[0].shippingRates[0].price.centAmount / 100;
      const freeAbove =
        shippingMethods[i].zoneRates[0].shippingRates[0].freeAbove.centAmount /
        100;
      const currency =
        shippingMethods[i].zoneRates[0].shippingRates[0].freeAbove.currencyCode;

      shippingMethodsList.push({
        name: localizedName,
        description: description,
        price: price,
        freeAbove: freeAbove,
        currency: currency,
      });
    }
  }

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    shippingMethodsList[0]
  );

  const totalCost =
    orderSum -
    priceMinusDiscount +
    (shippingMethodsList.length !== 0
      ? selectedShippingMethod.price
      : orderShipping);

  return (
    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
        <h3 className="text-xl font-semibold leading-5 text-gray-800 print:text-xs">
          {text("userShoppingHistorySummary")}
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base leading-4 text-gray-800 print:text-xs">
              {text("userShoppingHistorySubtotal")}
            </p>
            <p className="text-base leading-4 text-gray-600 print:text-xs">
              {orderSum.toFixed(2)}€
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800 print:text-xs">
              {text("userShoppingHistoryDiscount")}{" "}
              <span className="bg-gray-200 p-1 text-xs font-medium leading-3 uppercase text-gray-800 print:text-xs">
                {orderDiscountName}
              </span>
            </p>
            <p className="text-base leading-4 text-gray-600 print:text-xs">
              -{priceMinusDiscount.toFixed(2)}€ ({orderDiscount})
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800 print:text-xs">
              {text("userShoppingHistoryShipping")}
            </p>
            <p className="text-base leading-4 text-gray-600 print:text-xs">
              {(shippingMethodsList.length !== 0
                ? selectedShippingMethod.price
                : orderShipping
              ).toFixed(2)}{" "}
              €
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base font-semibold leading-4 text-gray-800 print:text-xs">
            {text("userShoppingHistoryTotal")}
          </p>
          <p className="text-base font-semibold leading-4 text-gray-600 print:text-xs">
            {totalCost.toFixed(2)}€
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
        {shippingMethodsList.length !== 0 && (
          <>
            <h3 className="text-xl font-semibold leading-5 text-gray-800 print:text-xs">
              {text("shopCheckoutPageChoosePaymentMethod")}:
            </h3>
            <form>
              <div className="flex flex-col items-left mb-4">
                {shippingMethodsList.map((item, index) => {
                  return (
                    <div
                      className="flex flex-row items-center py-1"
                      key={"divRadioBTN-" + index}
                    >
                      <input
                        key={"radioBTN-" + index}
                        id={"default-radio-" + index}
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-cyan border-cyanDark focus:ring-cyanDark focus:ring-2 print:text-xs"
                        onChange={() => {
                          setSelectedShippingMethod(item);
                          selectedShippingMethodHandler(item);
                        }}
                      />
                      <label
                        key={"labelRadioBTN-" + index}
                        htmlFor={"default-radio-" + index}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 print:text-xs"
                      >
                        {item.name}, {item.price.toFixed(2)}€,{" "}
                        {text("shopCheckoutPageFreeAbove")}{" "}
                        {item.freeAbove.toFixed(2)}€
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </>
        )}

        <h3 className="text-xl font-semibold leading-5 text-gray-800 print:text-xs">
          {text("userShoppingHistoryShipping")}
        </h3>

        <div className="flex justify-between items-start w-full">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-8 print:text-xs">
              <img
                className="w-full h-full"
                alt="logo"
                src="https://i.ibb.co/L8KSdNQ/image-3.png"
              />
            </div>
            <div className="flex flex-col justify-start items-center">
              <p className="text-lg leading-6 font-semibold text-gray-800 print:text-xs">
                {shippingMethodsList.length !== 0
                  ? selectedShippingMethod.name
                  : orderShippingName}
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold leading-6 text-gray-800 print:text-xs">
            {shippingMethodsList.length !== 0
              ? selectedShippingMethod.price.toFixed(2) + "€"
              : orderShipping.toFixed(2) + "€"}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full space-y-4">
          <p className="text-base leading-4 text-gray-800 print:text-xs">
            {shippingMethodsList.length !== 0
              ? selectedShippingMethod.description
              : orderShippingDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDitailItemSummery;

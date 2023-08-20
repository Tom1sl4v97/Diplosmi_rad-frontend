import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/SessionStorage";

import CartSummary from "./CartSummary";
import SingelItem from "./SingelItem";

function CartList(props) {
  const { t: text } = useTranslation();
  const navigate = useNavigate();
  const [userCartRealData, setUserCartRealData] = useLocalStorage(
    "userCart",
    []
  );

  const [userCart, setUserCart] = useState(userCartRealData);

  const calulateTotalPrice = () => {
    let totalPrice = 0;
    userCart.forEach((item) => {
      totalPrice += item.price * item.quantityInCart;
    });
    return totalPrice;
  };

  const [totalItems, setTotalItems] = useState(
    userCart.map((item) => item.quantityInCart).reduce((a, b) => a + b, 0)
  );
  const [totalPrice, setTotalPrice] = useState(calulateTotalPrice());

  const changeItemToUserCartRealData = (productId, variantId, quantity) => {
    setUserCartRealData((prev) => {
      prev.forEach((item) => {
        if (item.id === productId && item.variantId === variantId) {
          item.quantityInCart = quantity;
        }
      });
      return [...prev];
    });
  };

  const addTotalItems = (price, productId, variantId) => {
    setTotalItems((prevTotalItems) => prevTotalItems + 1);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price);

    const item = userCart.find(
      (item) => item.id === productId && item.variantId === variantId
    );

    changeItemToUserCartRealData(productId, variantId, item.quantityInCart + 1);
  };

  const removeTotalItems = (price, productId, variantId) => {
    setTotalItems((prevTotalItems) => prevTotalItems - 1);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - price);

    const item = userCart.find(
      (item) => item.id === productId && item.variantId === variantId
    );

    changeItemToUserCartRealData(productId, variantId, item.quantityInCart - 1);
  };

  const onChangeTotalItems = (price, quantity, productId, variantId) => {
    setTotalItems((prevTotalItems) => prevTotalItems + quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity);

    const item = userCart.find(
      (item) => item.id === productId && item.variantId === variantId
    );

    changeItemToUserCartRealData(
      productId,
      variantId,
      item.quantityInCart + quantity
    );
  };

  const onRemoveItemHandler = (productId, variantId) => {
    setUserCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.variantId === variantId)
      )
    );

    setUserCartRealData((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.variantId === variantId)
      )
    );
  };

  const onCheckoutHandler = () => {
    navigate("/shop/checkOutOrder");
  };

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10 flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 bg-gray-100 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">
                {text("shopPageShoppingCart")}
              </h1>
              <h2 className="font-semibold text-2xl">
                {totalItems} {text("shopPageItem/items")}
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                {text("shopPageProductDetails")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                {text("userShoppingHistoryItemQuantity")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                {text("userShoppingHistoryItemPrice")}
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                {text("shopPageTotal")}
              </h3>
            </div>

            {userCart.length === 0 && (
              <div className="flex justify-center pt-14">
                <h2 className="font-semibold text-2xl">
                  {text("shopPageYourCartIsEmpty")}
                </h2>
              </div>
            )}
            {userCart.map((item) => (
              <SingelItem
                key={item.id + item.variantId}
                item={item}
                addTotalItems={addTotalItems}
                removeTotalItems={removeTotalItems}
                onChangeTotalItems={onChangeTotalItems}
                removeLabel={text("shopPageRemove")}
                onRemoveItemHandler={onRemoveItemHandler}
              />
            ))}
          </div>
          <div className="w-full lg:w-1/4">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onClickHandler={onCheckoutHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartList;

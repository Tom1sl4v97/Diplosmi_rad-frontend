import { useTranslation } from "react-i18next";

function CartSummary(props) {
  const { t: text } = useTranslation();
  const { totalItems, totalPrice, onClickHandler } = props;

  return (
    <div id="summary" className="px-8 py-10 bg-[#d1fcf5] h-full">
      <h1 className="font-semibold text-2xl border-b pb-8">
        {text("shopPageOrderSummary")}
      </h1>
      <div className="flex justify-between mt-10">
        <span className="font-semibold text-sm uppercase">
          {text("shopPageTotalItems")}
        </span>
        <span className="font-semibold text-sm">{totalItems}</span>
      </div>

      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>{text("shopPageTotalCost")}</span>
          <span>{totalPrice.toFixed(2)}€</span>
        </div>
        <div className="flex flex-col items-center mt-8">
          <button
            className={"bg-cyanDark font-bold rounded-full transition duration-300 hover:bg-cyan py-2 px-8 text-md text-white uppercase" + (totalItems === 0 ? " opacity-50 cursor-not-allowed" : "")}
            disabled={totalItems === 0}
            onClick={onClickHandler}
          >
            {text("shopPageCheckout")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;

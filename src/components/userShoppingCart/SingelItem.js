import { useState } from "react";

function SingleItem(props) {
  const {
    item,
    addTotalItems,
    removeTotalItems,
    onChangeTotalItems,
    removeLabel,
    onRemoveItemHandler,
  } = props;
  const [quantity, setQuantity] = useState(item.quantityInCart);

  const onAddQuantityHandler = () => {
    if (quantity === item.quantity) return;
    setQuantity((prevQuantity) => prevQuantity + 1);
    addTotalItems(item.price, item.id, item.variantId);
  };

  const onRemoveQuantityHandler = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
    removeTotalItems(item.price, item.id, item.variantId);
  };

  const remuveHandler = () => {
    onChangeTotalItems(item.price, -quantity, item.id, item.variantId);
    setQuantity(0);
    onRemoveItemHandler(item.id, item.variantId);
  };

  const onChangeInputHandler = (event) => {
    if (+event.target.value > item.quantity) {
      setQuantity(item.quantity);
      onChangeTotalItems(
        item.price,
        item.quantity - quantity,
        item.id,
        item.variantId
      );
      return;
    }
    if (+event.target.value < 1) {
      setQuantity(1);
      onChangeTotalItems(item.price, 1 - quantity, item.id, item.variantId);
      return;
    }
    const newQuantity = +event.target.value;
    const quantityDifference = newQuantity - quantity;
    setQuantity(newQuantity);
    onChangeTotalItems(item.price, quantityDifference, item.id, item.variantId);
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 overflow-auto">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24 object-contain"
            src={item.imageUrl}
            alt={item.name}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.name}</span>
          <div>
            <button
              className="font-bold text-left text-gray-500 text-xs hover:text-rose-700"
              onClick={remuveHandler}
            >
              {removeLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <button type="button" onClick={onRemoveQuantityHandler}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>

        <input
          className="mx-2 border text-center w-16"
          type="text"
          value={quantity}
          onChange={onChangeInputHandler}
        />

        <button type="button" onClick={onAddQuantityHandler}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {item.price.toFixed(2)}€
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {(item.price * quantity).toFixed(2)}€
      </span>
    </div>
  );
}

export default SingleItem;

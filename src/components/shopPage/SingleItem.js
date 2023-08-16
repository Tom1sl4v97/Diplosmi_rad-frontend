import { useTranslation } from "react-i18next";
import {
  useSessionStorage,
  defaultSession,
  useLocalStorage,
} from "../../hooks/SessionStorage";
import { useNavigate } from "react-router-dom";

function SingleItem(props) {
  const { t: text } = useTranslation();
  const [userData] = useSessionStorage("userData", defaultSession);
  const [userCart, setUserCart] = useLocalStorage("userCart", []);
  const navigate = useNavigate();
  const { item, position } = props;

  const buyNowButtonHover = () => {
    if (userData.role === "un-register") {
      navigate("/login", { replace: true });
    } else {
      setUserCart((prev) => {
        var itemInCart = false;
        if (prev.length > 0) {
          for (var i = 0; i < prev.length; i++) {
            if (prev[i].id === item.id) {
              itemInCart = true;
              prev[i].quantityInCart += 1;
              break;
            }
          }
        }

        if (!itemInCart) {
          item.quantityInCart = 1;
          prev.push(item);
        }

        return [...prev];
      });
      alert(text("shopPageAddedToCart"));
    }
  };

  const pictureDisplay = (
    <div>
      <img
        src={item.imageUrl}
        className="w-full rounded-lg shadow-lg dark:shadow-black/20"
        alt={item.name}
      />
    </div>
  );

  var itemCSS =
    "block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 pt-12 pb-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 backdrop-blur-[30px] border-1 border-gray-400";

  if (position) {
    itemCSS += " lg:-ml-20";
  } else {
    itemCSS += " lg:-mr-20";
  }

  const itemDataDisplay = (
    <div>
      <div className={itemCSS}>
        <h2 className="mb-6 pb-2 text-4xl font-bold">{item.name}</h2>
        <p className="mb-6 pb-2 text-neutral-500 dark:text-neutral-300">
          {item.description}
        </p>
        <div className="mb-6 flex flex-wrap">
          {item.category.map((category, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-cyanLight px-3 py-1 text-sm uppercase font-bold text-gray-700 mr-2 mb-2"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col mr-10">
            <span className="text-2xl font-bold text-gray-700 mb-2">
              {item.price}$
            </span>
            <span className="text-md text-black">{text("shopPagePrice")}</span>
          </div>
          <button
            type="button"
            className="inline-block rounded-2xl bg-cyan px-4 text-xl font-bold uppercase text-white shadow-2xl transition duration-300 ease-in-out hover:bg-cyanDark"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={buyNowButtonHover}
          >
            {text("shopPageBuyNow")}
          </button>
          <div className="flex flex-col items-center ml-10">
            <span className="text-2xl font-bold text-gray-700 mb-2">
              {item.quantity}
            </span>
            <span className="text-sm text-gray-500">
              {text("shopPageLeftPieces")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-2">
        <div className="container mx-auto xl:px-36">
          <div className="grid items-center lg:grid-cols-2">
            {position ? (
              <>
                {pictureDisplay}
                {itemDataDisplay}
              </>
            ) : (
              <>
                {itemDataDisplay}
                {pictureDisplay}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleItem;

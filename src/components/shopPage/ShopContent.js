import { useSessionStorage } from "../../hooks/SessionStorage";

import SingleItem from "./SingleItem";

const shopItemsList = [
  {
    id: 1,
    name: "Playstation 5",
    price: 500,
    description:
      "Playstation 5 is a new generation of gaming. With a lightning-fast SSD and a custom-integrated I/O system, the PS5 console delivers lightning-fast download speeds and an immersive gaming experience.",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._AC_SL1500_.jpg",
    category: [
      "electronics",
      "gaming",
      "console",
      "playstation",
      "sony",
      "ps5",
      "ps",
      "playstation5",
      "playstation 5",
    ],
    quantity: 10,
    rating: 4.5,
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "I love it!",
      },
      {
        id: 2,
        rating: 4,
        comment: "It's ok.",
      },
    ],
    richText:
      "<p>Playstation 5 is a new generation of gaming. With a lightning-fast SSD and a custom-integrated I/O system, the PS5 console delivers lightning-fast download speeds and an immersive gaming experience.</p>",
  },

  {
    id: 2,
    name: "Xbox Series X",
    price: 460,
    description:
      "Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X.",
    imageUrl: "https://www.mall.hr/i/51231272",
    category: ["electronics", "gaming", "console"],
    quantity: 10,
    rating: 4.5,
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "I love it!",
      },
      {
        id: 2,
        rating: 4,
        comment: "It's ok.",
      },
    ],
    richText:
      "<p>Introducing Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X.</p>",
  },

  {
    id: 3,
    name: "Nintendo Switch",
    price: 300,
    description:
      "Play your way with the Nintendo Switch gaming system. Whether you’re at home or on the go, solo or with friends, the Nintendo Switch system is designed to fit your life. Dock your Nintendo Switch to enjoy HD gaming on your TV. Heading out? Just undock your console and keep playing in handheld mode.",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg",
    category: ["electronics", "gaming", "console"],
    quantity: 10,
    rating: 4.5,
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "I love it!",
      },
      {
        id: 2,
        rating: 4,
        comment: "It's ok.",
      },
    ],
    richText:
      "<p>Play your way with the Nintendo Switch gaming system. Whether you’re at home or on the go, solo or with friends, the Nintendo Switch system is designed to fit your life. Dock your Nintendo Switch to enjoy HD gaming on your TV. Heading out? Just undock your console and keep playing in handheld mode.</p>",
  },
];

function ShopContent(props) {
  const { productList, categories } = props;
  const [languageStorage] = useSessionStorage("language", "en-US");

  //Dohvaća ime kategorije na temelju id-a
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      return category.name[languageStorage] || category.name["en-US"];
    }
    return "Category not found";
  };

  //Generira objekt za svaki proizvod koji se prikazuje na stranici
  const generateProductObject = (productData) => {
    const categoryIds = productData.masterData.current.categories.map(
      (category) => category.id
    );
    const productCategories = categoryIds.map((categoryId) =>
      getCategoryNameById(categoryId)
    );

    const getAtributsList = (atributs) => {
      return atributs.map((atribut) => {
        return {
          name: atribut.name,
          value: atribut.value[languageStorage] || atribut.value,
        };
      });
    };

    //Služi za prikazivanje količine proizvoda na lageru, jer je chanel id uvijek različit
    const getQuantity = (productDataVarient) => {
      let quantity = 0;
      for (const channelId in productDataVarient) {
        if (
          productDataVarient[
            channelId
          ].hasOwnProperty("availableQuantity")
        ) {
          quantity =
          productDataVarient[
              channelId
            ].availableQuantity;
          break;
        }
      }
      return quantity;
    };

    const description = productData.masterData.current.description[languageStorage];
    //Služi za prikazivanje ostalih slika proizvoda
    const imageList = productData.masterData.current.masterVariant.images.map(image => image.url);

    //Služi za prikazivanje varijanti proizvoda
    const varientsList = productData.masterData.current.variants.map(varient => {
      const imageList = varient.images.map(image => image.url);
      const quantity = getQuantity(varient.availability.channels);

      return{
      id: varient.id,
      name: varient.sku,
      price: varient.prices[0].value.centAmount / 100,
      currency: varient.prices[0].value.currencyCode,
      description: description,
      imageUrl: varient.images[0].url,
      otherImages: imageList,
      category: productCategories,
      sku: varient.sku,
      quantity: quantity,
      richText: getAtributsList(varient.attributes),
      }
    })

    return {
      id: productData.id,
      name: productData.masterData.current.name[languageStorage],
      price:
        productData.masterData.current.masterVariant.prices[0].value
          .centAmount / 100,
      currency: productData.masterData.current.masterVariant.prices[0].value.currencyCode,
      description: description,
      imageUrl: productData.masterData.current.masterVariant.images[0].url,
      otherImages: imageList,
      category: productCategories,
      sku: productData.masterData.current.masterVariant.sku,
      quantity: getQuantity(productData.masterData.current.masterVariant.availability.channels),
      richText: getAtributsList(productData.masterData.current.masterVariant.attributes),
      varients: varientsList,
    };
  };

  const dynamicProductObjects = productList.map((product) =>
    generateProductObject(product)
  );

  return (
    <div className="flex flex-col items-center w-full">
      {dynamicProductObjects.map((product, index) => (
        <SingleItem key={index} item={product} position={index % 2} />
      ))}
    </div>
  );
}

export default ShopContent;

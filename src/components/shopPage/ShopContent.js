import { useSessionStorage } from "../../hooks/SessionStorage";

import Pagination from "../navigation/Pagination";
import SingleItem from "./SingleItem";

function ShopContent(props) {
  const {
    productList,
    categories,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    totalCount,
    skipPage,
  } = props;
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
    const productId = productData.id;
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
        if (productDataVarient[channelId].hasOwnProperty("availableQuantity")) {
          quantity = productDataVarient[channelId].availableQuantity;
          break;
        }
      }
      return quantity;
    };

    const description =
      productData.masterData.current.description[languageStorage];
    //Služi za prikazivanje ostalih slika proizvoda
    const imageList = productData.masterData.current.masterVariant.images.map(
      (image) => image.url
    );

    //Služi za prikazivanje varijanti proizvoda
    const varientsList = productData.masterData.current.variants.map(
      (varient) => {
        const imageList = varient.images.map((image) => image.url);
        const quantity = getQuantity(varient.availability.channels);

        return {
          id: productId,
          variantId: varient.id,
          name: varient.key,
          price: varient.prices[0].value.centAmount / 100,
          currency: varient.prices[0].value.currencyCode,
          description: description,
          imageUrl: varient.images[0].url,
          otherImages: imageList,
          category: productCategories,
          sku: varient.sku,
          quantity: quantity,
          quantityInCart: 0,
          richText: getAtributsList(varient.attributes),
        };
      }
    );

    return {
      id: productId,
      variantId: productData.masterData.current.masterVariant.id,
      name: productData.masterData.current.name[languageStorage],
      price:
        productData.masterData.current.masterVariant.prices[0].value
          .centAmount / 100,
      currency:
        productData.masterData.current.masterVariant.prices[0].value
          .currencyCode,
      description: description,
      imageUrl: productData.masterData.current.masterVariant.images[0].url,
      otherImages: imageList,
      category: productCategories,
      sku: productData.masterData.current.masterVariant.sku,
      quantity: getQuantity(
        productData.masterData.current.masterVariant.availability.channels
      ),
      quantityInCart: 0,
      richText: getAtributsList(
        productData.masterData.current.masterVariant.attributes
      ),
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
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        totalCount={totalCount}
        skipPage={skipPage}
        goToPage={goToPage}
      />
    </div>
  );
}

export default ShopContent;

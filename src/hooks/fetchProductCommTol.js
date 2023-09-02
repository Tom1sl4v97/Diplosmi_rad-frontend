import { useState, useEffect } from "react";

const commercetollsUrl = process.env.REACT_APP_COMMERCETOOLS_URL;
const commercetoolsAuthUrl = process.env.REACT_APP_COMMERCETOOLS_AUTH_URL;

export function useFetchProductFromCommerceTools(accessToken, limit, skip) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${commercetollsUrl}/products?limit=${limit}&offset=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        setTotalCount(data.total);
        setProducts(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    if (accessToken !== null) fetchProducts();
  }, [accessToken, limit, skip]);

  return { products, loading, totalCount };
}

export function useFetchProductFromCommerceToolsByCategoryList(
  accessToken,
  categoryList
) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${commercetollsUrl}/products?limit=100`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (data.statusCode === 401) {
          setExpired(true);
          return;
        }

        const filteredProducts = data.results.filter((product) => {
          let hasCategory = false;
          product.categories.forEach((category) => {
            if (categoryList.includes(category.id)) {
              hasCategory = true;
            }
          });
          return hasCategory;
        });

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    if (accessToken !== null) fetchProducts();
  }, [accessToken, categoryList]);

  return { products, loading, expired };
}

export function useFetchShippingMethods(accessToken) {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await fetch(`${commercetollsUrl}/shipping-methods`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        setShippingMethods(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shipping methods:", error.message);
        setLoading(false);
      }
    };

    if (accessToken !== null) fetchShippingMethods();
  }, [accessToken]);

  return { shippingMethods, loading };
}

export function useFetchProductGetAccessToken(clientId, clientSecret) {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await fetch(commercetoolsAuthUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      });

      const data = await accessToken.json();

      setAccessToken(data.access_token);
    };

    fetchAccessToken();
  }, []);

  return accessToken;
}

export function useFetchCategories(accessToken) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${commercetollsUrl}/categories?limit=100`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        setCategories(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    }

    if (accessToken !== null) fetchCategories();
  }, [accessToken]);

  return { categories, loading };
}

export function useCreateProductReview(
  accessToken,
  productId,
  variantId,
  userReview
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function createProductReview() {
      try {
        setLoading(true);

        const body = {
          authorName: userReview.authorName,
          title: userReview.title,
          text: userReview.text,
          rating: userReview.rating,
          target: {
            typeId: "product",
            id: productId,
            variantId: variantId,
          },
        };

        const response = await fetch(`${commercetollsUrl}/reviews`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        if (data.statusCode === 401) {
          setError("Unauthorized");
          setLoading(false);
          return;
        }

        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error("Error creating review:", error);
        setError(error);
        setLoading(false);
      }
    }

    if (
      accessToken !== null &&
      userReview !== null &&
      productId !== null &&
      variantId !== null
    )
      createProductReview();
  }, [accessToken, productId, variantId, userReview]);

  return { loading, error, success };
}

export function useFetchProductReviews(accessToken, productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductReviews() {
      try {
        const response = await fetch(`${commercetollsUrl}/reviews?limit=500`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        const filteredReviews = data.results.filter(
          (review) => review.target.id === productId
        );

        setReviews(filteredReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    }

    if (accessToken !== null) fetchProductReviews();
  }, [accessToken, productId]);

  return { reviews, loading };
}

export function useRemoveReview(accessToken, reviewId, version) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const removeReviewHandler = async () => {
    const url =
      commercetollsUrl + "/reviews/" + reviewId + "?version=" + version;

    console.log("accessToken", accessToken);
    console.log("review", reviewId);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      setSuccess(true);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return { removeReviewHandler, error, success };
}

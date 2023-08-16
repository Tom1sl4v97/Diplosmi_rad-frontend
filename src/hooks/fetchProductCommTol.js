import { useState, useEffect } from "react";

const commercetollsUrl = process.env.REACT_APP_COMMERCETOOLS_URL;
const commercetoolsAuthUrl = process.env.REACT_APP_COMMERCETOOLS_AUTH_URL;
const commercetoolsAuthClientId = process.env.REACT_APP_COMMERCETOOLS_CLIENT_ID;
const commercetoolsAuthClientSecret =
  process.env.REACT_APP_COMMERCETOOLS_SECRET;

export function useFetchProductFromCommerceTools(accessToken) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${commercetollsUrl}/products`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (data.statusCode === 401) {
          setExpired(true);
          return;
        }

        setProducts(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    if (accessToken !== null) fetchProducts();
  }, [accessToken]);

  return { products, loading, expired };
}

export function useFetchProductGetAccessToken() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await fetch(commercetoolsAuthUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${commercetoolsAuthClientId}:${commercetoolsAuthClientSecret}`
          )}`,
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
        const response = await fetch(`${commercetollsUrl}/categories?limit=100`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

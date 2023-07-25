import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { useSessionStorage } from "../hooks/SessionStorage";

const client = createClient({
  space: "3587efa5a65l",
  environment: "master",
  accessToken: "cjhc4D6ezmPGYANVyyrtpeYSsBr8_cx8kLI2Qxjz5Bc",
});

export function useFetchContent(specifiedId = null) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage, setLanguageStorage] = useSessionStorage(
    "language",
    "en-US"
  );

  const getData = async () => {
    try {
      const request = client.getEntries({
        locale: languageStorage,
        content_type: "contents",
        "sys.id": specifiedId ? specifiedId : undefined,
      });

      const response = await request;
      const contents = response.items.map((item) => {
        const {
          title,
          author,
          dateOfCreation,
          subTitle,
          categories,
          image,
          content,
        } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return {
          title,
          author,
          dateOfCreation,
          subTitle,
          categories,
          img,
          id,
          content,
        };
      });

      setLoading(false);
      setData(contents);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { loadingData: loading, data, error };
}

import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { useSessionStorage } from "../hooks/SessionStorage";

const client = createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

export function useFetchContent(specifiedId = null, limit, skip) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [ totalCount, setTotalCount ] = useState(0);
  const [languageStorage] = useSessionStorage(
    "language",
    "en-US"
  );

  const getData = async () => {
    try {
      const request = client.getEntries({
        content_type: "contents",
        locale: languageStorage,
        order: "-fields.dateOfCreation",
        limit: limit ? limit : undefined,
        skip: skip ? skip : undefined,
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
      setTotalCount(response.total);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, [limit, skip, specifiedId, languageStorage]);

  return { loadingData: loading, data, totalCount, error };
}

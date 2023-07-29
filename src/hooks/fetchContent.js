import { useState, useEffect } from "react";
import { createClient } from "contentful";
import { useSessionStorage } from "../hooks/SessionStorage";

const client = createClient({
  space: process.env.REACT_APP_SPACE,
  environment: process.env.REACT_APP_ENVIRONMENT,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
});

const fetchData = async (options) => {
  try {
    const request = client.getEntries(options);
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

    return { contents, totalCount: response.total };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export function useFetchContent(limit, skip, category = []) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [languageStorage] = useSessionStorage("language", "en-US");

  useEffect(() => {
    const options = {
      content_type: "contents",
      locale: languageStorage,
      order: "-fields.dateOfCreation",
      limit,
      skip,
    };

    if (category && category.length > 0) {
      options["fields.categories[in]"] = category.join(",");
    }

    fetchData(options).then(({ contents, totalCount, error }) => {
      if (!error) {
        setLoading(false);
        setData(contents);
        setTotalCount(totalCount);
      } else {
        setError(error);
      }
    });
  }, [limit, skip, languageStorage, category]);

  return { loadingData: loading, data, totalCount, error };
}

export function useFetchCategoriesByPostId(specifiedId) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [languageStorage] = useSessionStorage("language", "en-US");

  useEffect(() => {
    const options = {
      content_type: "contents",
      locale: languageStorage,
      "sys.id": specifiedId,
    };

    fetchData(options).then(({ contents, totalCount, error }) => {
      if (!error) {
        setLoading(false);
        setData(contents);
        setTotalCount(totalCount);
      } else {
        setError(error);
      }
    });
  }, [specifiedId]);

  return { loadingData: loading, data, totalCount, error };
}

export function useFetchFirstContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage] = useSessionStorage("language", "en-US");

  useEffect(() => {
    const options = {
      content_type: "contents",
      locale: languageStorage,
      order: "-fields.dateOfCreation",
      limit: 1,
      skip: 0,
    };

    fetchData(options).then(({ contents, error }) => {
      if (!error) {
        setLoading(false);
        setData(contents);
      } else {
        setError(error);
      }
    });
  }, [languageStorage]);

  return { loadingData: loading, data, error };
}

export function useFetchContentByMultipleId(limit, skip) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage] = useSessionStorage("language", "en-US");
  const [totalCount, setTotalCount] = useState(0);
  const [mostPopularPostsIds, setMostPopularPostsIds] = useState([]);

  useEffect(() => {
    getMostPopularPostsIds(limit, skip).then((data) => {
      setMostPopularPostsIds(data);
    });
  }, [limit, skip]);

  useEffect(() => {
    if (mostPopularPostsIds.length > 0) {
      const options = {
        content_type: "contents",
        locale: languageStorage,
        "sys.id[in]": mostPopularPostsIds.join(","),
      };

      fetchData(options).then(({ contents, error }) => {
        if (!error) {
          const sortedContents = mostPopularPostsIds.map((postId) =>
            contents.find((item) => item.id === postId)
          );

          setLoading(false);
          setData(sortedContents);
          setTotalCount(contents.length);
        } else {
          setError(error);
        }
      });
    }
  }, [mostPopularPostsIds]);

  return { loadingData: loading, data, error, totalCount };
}

const serverURL = process.env.REACT_APP_SERVER_URL;

async function getMostPopularPostsIds(limit, skip) {
  const url = `${serverURL}/pageStatistics/mostPopular?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const postspostsIds = data.mostPopularPosts.map((item) => item);
    return postspostsIds;
  } catch (error) {
    console.log("Error fetching most popular posts:", error);
    return [];
  }
}

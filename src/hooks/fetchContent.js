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
  }, [specifiedId, languageStorage]);

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

export function useFetchCommentsById(postId) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCommentsById(postId).then((data) => {
      if (!data.error) {
        setLoading(false);
        setData(data);
      } else {
        setError(data.error);
      }
    });
  }, [postId]);

  return { loadingData: loading, data, error };
}

async function getCommentsById(postId) {
  const url = `${serverURL}/postComments?postId=${postId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else if (response.status === 204) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export function useFetchContentByMultipleId(limit, skip) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage] = useSessionStorage("language", "en-US");
  const [totalCount, setTotalCount] = useState(0);
  const [mostPopularPostsIds, setMostPopularPostsIds] = useState([]);

  const url = `${serverURL}/pageStatistics/mostPopular?limit=${limit}&skip=${skip}`;

  useEffect(() => {
    getMostPopularPostsIds(url, true).then((data) => {
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
  }, [mostPopularPostsIds, languageStorage]);

  return { loadingData: loading, data, error, totalCount };
}

export function useFetchContentBestScored(limit, skip) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage] = useSessionStorage("language", "en-US");
  const [totalCount, setTotalCount] = useState(0);
  const [mostPopularPostsIds, setMostPopularPostsIds] = useState([]);

  const url = `${serverURL}/postComments/bestScored?limit=${limit}&skip=${skip}`;

  useEffect(() => {
    getMostPopularPostsIds(url).then((data) => {
      setMostPopularPostsIds(data);
    });
  }, [limit, skip]);

  useEffect(() => {
    if (mostPopularPostsIds.length > 0) {
      const postIds = mostPopularPostsIds.map((item) => item.postId);

      const options = {
        content_type: "contents",
        locale: languageStorage,
        "sys.id[in]": postIds.join(","),
      };

      fetchData(options).then(({ contents, error }) => {
        if (!error) {
          const sortedContents = mostPopularPostsIds.map((postId) =>
            contents.find((item) => item.id === postId.postId)
          );

          sortedContents.forEach((item) => {
            const avgScore = mostPopularPostsIds.find(
              (element) => element.postId === item.id
            ).avgScore;
            item.avgScore = avgScore;
          });

          setLoading(false);
          setData(sortedContents);
          setTotalCount(contents.length);
        } else {
          setError(error);
        }
      });
    }
  }, [mostPopularPostsIds, languageStorage]);

  return { loadingData: loading, data, error, totalCount };
}

const serverURL = process.env.REACT_APP_SERVER_URL;

async function getMostPopularPostsIds(url, needSort = false) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (needSort) {
      const sortedPostsIds = data.mostPopularPosts.map((item) => item);
      return sortedPostsIds;
    }
    return data;
  } catch (error) {
    console.log("Error fetching most popular posts:", error);
    return [];
  }
}

export function useFetchContentBySearch(searchedData, limit, skip) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [languageStorage] = useSessionStorage("language", "en-US");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const options = {
      content_type: "contents",
      locale: languageStorage,
      query: searchedData,
      limit,
      skip,
    };

    fetchData(options).then(({ contents, error, totalCount }) => {
      if (!error) {
        setLoading(false);
        setData(contents);
        setTotalCount(totalCount);
      } else {
        setError(error);
      }
    });
  }, [searchedData, languageStorage, limit, skip]);

  return { loadingData: loading, data, error, totalCount };
}

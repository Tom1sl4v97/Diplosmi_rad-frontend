import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
  const navigator = useNavigate();

  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) {
      //checkIfTokenExpired(JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    }

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  function checkIfTokenExpired(userData) {
    if (userData.dateTimeStamp === null)
      throw new Error("dateTimeStamp is not set");
    const dateTimeStamp = new Date(userData.dateTimeStamp);
    const now = new Date();
    const difference = now.getTime() - dateTimeStamp.getTime();
    const differenceInMinutes = Math.round(difference / 60000);
    if (differenceInMinutes > 60) {
      console.log("Token expired");
      // TODO - implement firestone logout

      setValue({
        role: "un-register",
        user: {
          username: null,
          email: null,
          image: null,
        },
        tokenKey: null,
      });

      navigator("/login");
    }
  }

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}

export function defaultSession() {
  return {
    role: "un-register",
    user: {
      username: null,
      email: null,
      image: null,
      firstName: null,
      lastName: null,
      birthDate: null,
      phoneNumber: null,
      address: null,
      city: null,
      country: null,
      postalCode: null,
    },
    tokenKey: null,
    dateTimeStamp: null,
  };
}

export function defaultPageSettings(){
  return {
    defaultPageSettings: true,
    allContentPageSkip: 3,
    mostPopularPageSkip: 3,
    bestScoredPageSkip: 3,
    searchComponentPageSkip: 6,
    userReccomendationPageSkip: 3,
    shopAppPaginationSkip: 4,
  }
}

export function defaultCommerceToolsSettings(){
  return {
    accessToken: null,
  }
}
"use client";

import React, { useState, useEffect } from "react";

const parseJwt = (token: any) => {
  if (!token) {
    return true;
  }
  const base64Url = token?.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");

  return JSON.parse(window.atob(base64));
};

export const useExpiredToken = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("Token") : "";
  const expired = parseJwt(token);

  const jwtExpirationDate = new Date(expired.exp * 1000);

  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (token) {
      if (jwtExpirationDate < new Date() || !token || token === "") {
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
      }
    } else {
      setIsTokenExpired(true);
    }
  });

  return isTokenExpired;
};

export const useUserId = () => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("Id") : "";

  return userId;
};

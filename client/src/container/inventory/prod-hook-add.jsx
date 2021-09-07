import React, { useEffect, useState } from "react";
import { useAxios } from "axios-hooks";
import useInput from "../../components/hooks/useInput";

export default function ProdHookAdd() {
  // #TODO: refactor productlist to for useAxios Hook
  const [{ data, loading, error }, refetch] = useAxios({
    url: "http://localhost:5000/brands",
    method: "GET",
  });
  return <div></div>;
}

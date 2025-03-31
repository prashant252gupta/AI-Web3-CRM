import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData("").then(setData);
  }, []);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}
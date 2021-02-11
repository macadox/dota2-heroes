import { useEffect, useState } from "react";

// OBJ requires {url, key}
export const useFetch = (objs, id) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataObj = {};
        const responsePromiseArr = objs.map((obj) => {
          return fetch(obj.url);
        });
        const responseArr = await Promise.all(responsePromiseArr);
        const dataPromiseArr = responseArr.map((res) => res.json());
        const dataArr = await Promise.all(dataPromiseArr);

        dataArr.forEach((item, index) => {
          const key = objs[index].key;
          const val = item;
          dataObj[key] = val;
        });

        setData(dataObj);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  return [loading, data];
};

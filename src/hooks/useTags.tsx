import axios from "axios";
import { useEffect, useState } from "react";
interface Tag {
  id: number;
  name: string;
}

function useTags() {
  const [items, setItems] = useState<Tag[]>([]);

  useEffect(() => {
    // Only fetch projects if there are none
    if (items.length > 0) return;

    axios
      .get("https://cmgt.hr.nl/api/tags")
      .then((response) => {
        // console.log(response.data.data as ProjectMeta[]);
        const responseData = response.data.data as Tag[];

        setItems(responseData);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, [setItems, items.length]);

  return {
    tags: items,
    setTags: setItems,
  };
}
export default useTags;

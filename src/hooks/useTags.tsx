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

    fetch("https://cmgt.hr.nl/api/tags")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching tags");
        }
        return response.json();
      })
      .then((responseData) => {
        setItems(responseData.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, [setItems, items.length]);

  return {
    tags: items,
    setTags: setItems,
    isOnline: navigator.onLine ? true : false,
  };
}
export default useTags;

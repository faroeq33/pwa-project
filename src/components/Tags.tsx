import useTags from "../hooks/useTags";

function Tags() {
  const { tags } = useTags();

  return (
    <>
      <section className="w-full text-gray-600 body-font ">
        <div className="container flex flex-wrap justify-center gap-4">
          {tags.map((item) => (
            <div
              key={item.id}
              className="h-full px-2 overflow-hidden text-white bg-indigo-600 rounded-lg border-opacity-60"
            >
              {item.name}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Tags;

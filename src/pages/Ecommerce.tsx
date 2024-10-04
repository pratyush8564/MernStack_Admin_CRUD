const Ecommerce = () => {
  return (
    <>
      {/* Header component */}
      <div className="header">
        <div className="flex justify-between bg-white p-4">
          <div className="flex text-2xl font-semibold">MobMantra</div>
          <div className="flex justify-end items-end gap-2 text-md font-medium">
            <p>Reviews</p>
            <p>Articles</p>
            <p>Rankings</p>
            <p>Login</p>
          </div>
        </div>
        {/* What's latest/new/upcoming */}
        <div className="bg-black rounded-lg p-4 m-8 flex justify-between">
          <div>
            <p className="text-yellow-200 ">TECH ARTICLE</p>
            <p className="text-white text-2xl font-semibold mt-2">
              MOBMANTRA Insights:
            </p>
            <p className="text-gray-200 text-2xl">
              What Indian consumers really think of HDR smartphone potrait
            </p>
            <button className="bg-white rounded-lg p-1 mt-2">
              Read the article
            </button>
          </div>
          <div className="flex justify-end ">
            <img src="/src/assets/japaneseGirl.jpg" width="200" height="200" />
            <img src="/src/assets/photoGirl.jpeg" width="200" height="200" />
          </div>
        </div>

        {/* content and featured article */}
        <div className="flex justify-between m-8">
          <div className="container grid grid-cols-3 gap-4 p-4 bg-white rounded-lg">
            {/* First row - 3 elements */}
            <div className="bg-black rounded-lg p-4 col-span-1"></div>
            <div className="bg-black rounded-lg p-4 col-span-1"></div>
            <div className="bg-black rounded-lg p-4 col-span-1"></div>

            {/* Second row - 2 elements */}
            <div className="bg-black rounded-lg p-4 col-span-2"></div>
            <div className="bg-black rounded-lg p-4 col-span-1"></div>

            {/* Third row - 3 elements */}
            <div className="bg-black rounded-lg p-4 col-span-1"></div>
            <div className="bg-black rounded-lg p-4 col-span-1"></div>
            <div className="bg-black rounded-lg p-4 col-span-1"></div>
          </div>
          <div className="bg-white rounded-md p-4 "></div>
          
        </div>

        {/* featured artcile/news */}
        <div className="flex justify-between m-8">
        <div className="bg-white p-4"></div>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;

const Shimmer = () => {
  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-24">
      {Array(12)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="h-40 w-full rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-6 w-3/4 mt-4 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-6 w-1/2 mt-3 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="h-6 w-2/3 mt-3 rounded-md bg-gray-300 animate-pulse"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;

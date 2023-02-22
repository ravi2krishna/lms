function NoCourses() {
  return (
    <div className="relative rounded-lg border border-gray-200 p-8 text-center">
      <h2 className="text-2xl font-medium">{"There's nothing here..."}</h2>

      <p className="mt-4 text-sm text-gray-500">
        Enrolled courses will appear here, click below button to contact the
        academy.
      </p>

      <button className="mt-8 inline-flex items-center bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500">
        Enroll me!
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="ml-3 h-4 w-4 flex-shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
}

export default NoCourses;

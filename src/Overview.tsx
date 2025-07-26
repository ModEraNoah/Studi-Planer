function Overview() {
  return (
    <>
      <div className="flex justify-center pt-16 text-5xl font-bold">
        <span className="w-fit">Lobe</span>
        <span className="w-fit text-emerald-400">Tour</span>
      </div>
      <div className="grid place-items-center justify-center mt-8 text-md">
        <p>Build your first machine learning model in ten minutes.</p>
        <p>No code or experience required.</p>
        <div className="bg-amber-300 m-5 w-130 h-100 rounded-3xl"></div>
        <p className="text-5xl font-bold py-1">Train your app</p>
        <p className="text-5xl font-bold py-1">with Lobe</p>
      </div>
      <div className="grid mt-8 place-items-center">
        <button className=" bg-emerald-400 hover:bg-emerald-600 active:bg-emerald-600 active:border-2 border-2 border-white active:border-emerald-800 duration-100 text-gray-50 w-fit px-6 py-1 rounded-3xl">
          Download
        </button>
      </div>
    </>
  );
}

export default Overview;

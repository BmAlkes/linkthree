export const Home = () => {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl text-white mt-20 font-bold">
        pagina home
      </h1>
      <span className=" text-gray-50 mb-5 mt-3"> See my Links 👇</span>
      <main className="flex flex-col w-11/12 max-w-xl items-center text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-xl select-none transition-transform hover:scale-105 cursor-pointer">
          <a href="">
            <p className="text-base md:text-lg ">Canal no youtube</p>
          </a>
        </section>
      </main>
      <footer className="flex justify-center gap-3 my-4"></footer>
    </div>
  );
};

import Feed from "@/components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='blue_gradient head_text text-center'>
      Shorten it & Save it
      <br className='max-md:hidden' />
      <span className='red_gradient text-center text-3xl'> Redis+NEXT13 Powered</span>
    </h1>
    <p className='desc text-center'>
      This is just a boring Url Shortening service. But it's a 🔥 cool project.
    </p>

    <Feed />
  </section>
);

export default Home;

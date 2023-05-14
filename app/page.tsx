
import Feed from "@/components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='green_gradient head_text text-center'>
      Shorten & Keep it
      <br className='max-md:hidden' />
      <span className='red_gradient text-center text-3xl'> Redis+NEXT13 Powered</span>
    </h1>
    <p className='desc text-center'>
      <span className='text-red-500 text-2xl font-bold'>🔥Shrinkly🔥</span> - Your URL Concierge! Effortlessly shorten, customize, and search your URLs. Boost your digital presence with our advanced, user-friendly platform. Try Shrinkly, where long URLs meet their match!
    </p>

    <Feed />
  </section>
);

export default Home;

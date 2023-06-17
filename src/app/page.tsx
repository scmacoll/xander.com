import Image from 'next/image'
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Search />
      <Footer />
    </main>
  )
}

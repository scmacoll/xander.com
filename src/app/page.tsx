import Image from 'next/image'
import Header from './components/Header/Header';
import Search from './components/Search/Search';

export default function Home() {
  return (
    <main>
      <Header />
      <Search />
    </main>
  )
}

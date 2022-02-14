import Head from 'next/head'

import Header from '../components/header/Header'

export default function Home() {
  return (
    <div className="h-[100vh] bg-[#DAE0E6]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}

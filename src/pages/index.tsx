import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const data = [
  {id: 1, name: "Falafel", description: "Tasty falafels", image: "/img/test.jpg" },
  {id: 2, name: "Falafel", description: "Tasty falafels", image: "/img/test.jpg" },
  {id: 3, name: "Falafel", description: "Tasty falafels", image: "/img/test.jpg" },
  {id: 4, name: "Falafel", description: "Tasty falafels", image: "/img/test.jpg" },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Paris Blockchain Hackathon 2023</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-80">
      <Image
        src="/img/test.jpg"
        className="absolute inset-0 object-cover w-full h-full"
        alt="background"
        width={1000}
        height={1000}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-5xl text-white font-bold text-center z-10">
          Paris Blockchain Hackathon 2023
        </h1>
      </div>
    </div>
      <div className='w-screen m-10'>
        <div className='w-screen'>
        </div>
        <h2 className="text-2xl text-white font-bold text-left z-10 m-4">
          Liste des partenaires
        </h2>
        <div className='w-full flex sm:flex-col md:flex-row flex-wrap gap-y-8 '>
{
  data.map((e) => (
    <div className="w-1/4 rounded overflow-hidden shadow-lg bg-white mx-4 "
    key={e.name}
    >
        <Link href={`/partners/${e.id}`}>
            <Image className="w-full bg-cover" src={e.image} alt="Sunset in the mountains" width={100} height={100} />
            <div className="px-6 py-4">
              <div className="text-black font-bold text-xl mb-2">{e.name}</div>
              <p className="text-gray-700 text-base">
                {e.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
</Link>
          </div>
  ))
}
        </div>
      </div>
    </>
  )
}

import Image from 'next/image';export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          My New Project
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          The TypeScript error is fixed, and this page is ready for your own custom code.
        </p>
      </div>
    </main>
  );
}


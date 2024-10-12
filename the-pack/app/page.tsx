'use client'

import {useRouter} from "next/navigation";
import Image from "next/image";

export default function Landing() {
  const router = useRouter()

  return (
    <body>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            src = "/The Pack Logo.jpg"
            width = {500}
            height = {500}
            alt = "The Pack Logo"
          />
        </div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <button type = "button" onClick={() => router.push("./login")}>Login</button>
          <button type = "button" onClick={() => router.push('./register')}>Register</button>
          <button type = "button" onClick={() => router.push('./home')}>Home</button> {/*FOR DEMO PURPOSE ONLY */}
        </main>
    </div>
    </body>
  );
}
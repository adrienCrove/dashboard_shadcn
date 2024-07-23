"use client";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {PopUp} from "@/components/interne/PopUp"
import Footer from "@/components/layout/Footer"


export default function LandingPage() {
  return (
    <>
        {/* <PopUp/> */}
        <div className="flex flex-col items-center justify-center gap-3 p-3 m-4">
            <Image src="/images/logo.png" width="100" height="120" alt="Logo" />
            {/* <video className=" rounded-xl" width="640" height="480" controls preload="none">
                <source src="/videos/manga_anime.mp4" type="video/mp4" height="500"/>
                </video> */}
            <h1 className=" text-4xl text-center font-bold ">Bienvenue sur notre chaine Anime Enjoy</h1>
            <p>Vous pouvez acceder à notre plateforme en vous inscrivant en cliquant sur le bouton ci-dessous</p>
            <iframe
              src="/videos/manga_anime.mp4" className=" rounded-xl" allowfullscreen width="500" height="300"
            />
            <div className=" flex flex-row gap-3">
              <Button asChild size={"sm"}><Link href="/signup">S'inscrire</Link></Button>
              <Button asChild variant="secondary"><Link href="/login">Se connecter</Link></Button>
            </div>
        </div>
        {/* <footer className="flex flex-col p-9 gap-6 w-full bg-red-700 text-white text-center items-center absolute bottom-0">
          <h1 className=" font-bold text-2xl">A propos d'Otaku</h1>
          <p className=" text-sm">Otaku propose le meilleur des animés japonais juste après leur diffusion au Japon.</p>
      </footer> */}      
    </>
  )
}

import { useEffect } from "react"
import { useState } from "react"
import { setTimeout } from "timers"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"

export function PopUp() {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsOpen(true)}, 2000);
            return ()=> clearTimeout(timer)
        }, [])
        
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Le respect de votre vie privée est notre priorité</DialogTitle>
          <DialogDescription>
          Nous utilisons des cookies ou des technologies similaires pour accéder à certaines informations stockées sur votre terminal (identifiants uniques, adresses IP ou informations standards envoyées par chaque terminal), uniquement destinées à améliorer l’interactivité de notre site et à analyser son audience et ses performances, à des fins statistiques. Nous utilisons à ce titre l’outil Google Analytics pour générer des rapports sur le trafic (nombre de visites, temps passé sur le site, nombre de pages vues en moyenne, appareil et navigateur utilisé, emplacement géographique), l’origine du trafic et la navigation (pages consultées, actions réalisées).
          </DialogDescription>
        </DialogHeader>        
        <DialogFooter>
          <Button type="submit">J'accepte</Button>
          <DialogClose asChild>
            <Button type="submit" variant="secondary">Je refuse</Button>
          </DialogClose>         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}







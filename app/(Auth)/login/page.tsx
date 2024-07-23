"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Transition } from "framer-motion"

const formSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      email: '',
      password: ''
    }
  });

  const handleSubmit = () => {
    console.log("Validation de la connexion")
  }

  return (
    <>
    <div>
    <Image src="/images/logo.png" width="100" height="120" alt="Logo" />
    </div>
    <Card className="w-full max-w-md">
        <CardHeader className=" text-center">
            <CardTitle>Bon retour parmi nous sur Otakushop !!!</CardTitle>
            <CardDescription>Bon retour dès aujourd'hui <br/>Profiter des avantages d'une expérience d'achat personnalisée Otaku. Amusez-vous!!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField control={form.control} name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="" />
                    </FormControl>
                    <CardDescription />
                    <FormMessage/>
                  </FormItem>
                )}/>
                <FormField control={form.control} name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="" />
                    </FormControl>
                    <CardDescription />
                    <FormMessage/>
                  </FormItem>
                )}/>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col text-center gap-4">
           <small> Pas de compte ? <Link className="text-red-700 underline" href="/signup">créer un compte </Link></small>
            <p className="text-sm">En continuant, vous acceptez les conditions d'utilisation <br/> d'otaku <Link href="#">Termes et conditions</Link></p>
            <Button size={"lg"} className="w-full" type="submit">Se connecter</Button>
        </CardFooter>
    </Card>
    </>
  )
}
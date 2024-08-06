"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, toDate } from "date-fns"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
  .string()
  .min(8, { message: 'Le mot de passe doit au moins contenir 8 caractères' })
  .refine((password)=>{
    return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
  }, "Mot de passe doit contenir au moins une lettre en majuscule et un caractère spécial"),
  passwordConfirm: z.string(),
  account_type:z.enum(["Personal","Company"]),
  company_name: z.string().optional(),
  Employee_number:z.coerce.number().optional(),
  birthday_date:z.date().refine((date)=>{
    const today = new Date();
    const Minor = new Date(
      today.getFullYear()-18,
      today.getMonth(),
      today.getDate()
    );
    return date <= Minor;
  }, "Vous devez avoir 18 ans"),
}).superRefine((data, ctx) =>{

    if (data.password!==data.passwordConfirm){
      ctx.addIssue({
        code:z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Les mots de passe ne correspondent pas"
      })
    }
    if(data.account_type==="Company" && !data.company_name){
      ctx.addIssue({
        code:z.ZodIssueCode.custom,
        path: ["company_name"],
        message: "Le nom de la compagnie est obligatoire",
      })
    }
    if(data.account_type==="Company" && (!data.Employee_number|| data.Employee_number < 1)){
      ctx.addIssue({
        code:z.ZodIssueCode.custom,
        path: ["Employee_number"],
        message: "Le nombre d'employée de la compagnie est obligatoire",
      })
    }
})


export default function SignupPage() {
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

  const accountType= form.watch("account_type")

  const dobFromDate = new Date()
  dobFromDate.setFullYear(dobFromDate.getFullYear()-120)

  return (
    <>
    <div>
    <Image src="/images/logo.png" width="100" height="120" alt="Logo" />
    </div>
    <Card className="w-full max-w-md">
        <CardHeader className=" text-center">
            <CardTitle>Bienvenue chez OtakuShop</CardTitle>
            <CardDescription>Créez un nouveau compte dès aujourd'hui <br/>pour profiter des avantages d'une expérience d'achat personnalisée Otaku .</CardDescription>
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
                <FormField control={form.control} name="account_type" render={({field})=>(
                  <FormItem>
                    <FormLabel>Type de compte</FormLabel>
                    <Select onValueChange={field.onChange}>
                     <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="selectionné un type de compte"/>
                      </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                        <SelectItem value="Personal">Personel</SelectItem>
                        <SelectItem value="Company">Entreprise</SelectItem>
                      </SelectContent> 
                    </Select>
                  </FormItem>
                )}/>
                {accountType==="Company" &&
                <>
                  <FormField control={form.control} name="company_name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nom de la compagnie</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="" />
                      </FormControl>
                      <CardDescription />
                      <FormMessage/>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="Employee_number"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Nombre d"employée</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={0} placeholder="" />
                      </FormControl>
                      <CardDescription />
                      <FormMessage/>
                    </FormItem>
                  )}/>
                </>
                }
                <FormField control={form.control} name="birthday_date"
                  render={({field}) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de naissance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl> 
                            <Button variant={"outline"} className="normal-case flex justify-between ">
                              {!! field.value ?(
                                format(field.value, "PPP")
                              ):(
                                <span>Choisir une date</span> 
                              )}                                                        
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>                       

                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar mode="single" defaultMonth={field.value} 
                          selected={field.value} onSelect={field.onChange}
                          fixedWeeks weekStartsOn={1}
                          fromDate={new Date()} captionLayout="dropdown-buttons"/>

                        </PopoverContent>
                      </Popover>
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
                <FormField control={form.control} name="passwordConfirm"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Confirmation du Mot de passe</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} type="password" placeholder="" />
                    </FormControl>
                    <CardDescription />
                    <FormMessage/>
                  </FormItem>
                )}/>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col text-center gap-4">
           <small> Déja un compte ? <Link className="text-red-700 underline" href="/login">Se connecter</Link></small>
            <p className="text-sm">En continuant, vous acceptez les conditions d'utilisation <br/> d'otaku <Link href="#">Termes et conditions</Link></p>
            <Button size={"lg"} className="w-full" type="submit">S'inscrire</Button>
        </CardFooter>
    </Card>
    </>
  )
}
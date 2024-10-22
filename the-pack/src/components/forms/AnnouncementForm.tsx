"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"


const AnnouncementForm = () =>{

    const FormSchema = z.object({
        username: z.string().min(2).max(50),
      })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
        },
      })
     
      function onSubmit(data: z.infer<typeof FormSchema>) {
        
      }


    return(
        <div>
            <Button 
            variant = "outline"
            >
                Create Announcement
            </Button>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Announcement Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>

                            <FormLabel>Title Content</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your announcement" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};



export default AnnouncementForm;
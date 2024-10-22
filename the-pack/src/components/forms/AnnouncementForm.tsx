"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AnnouncementForm = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const FormSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle form submission
    console.log(data);
    setFormVisible(false); // Hide form after submission
  }

  return (
    <div className='flex justify-center'>
      <Button 
        variant="outline" 
        onClick={() => setFormVisible((prev) => !prev)} // Toggle visibility
      >
        {isFormVisible ? 'Hide Form' : 'Create Announcement'}
      </Button>

      {isFormVisible && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announcement Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
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
      )}
    </div>
  );
};

export default AnnouncementForm;

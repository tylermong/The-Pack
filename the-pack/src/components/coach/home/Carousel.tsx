import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"


export function SetCarousel(){

}

const AnnouncementCarousel = () =>{
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return(
        <div>
            <div className="flex justify-center md:h-screen md:w-full pt-20 space-x-80">
                <div className="Announcements">
                    <div className="mb-6">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">ANNOUNCEMENTS</h3>
                    </div>
                    <div className='Carousel mr-10'>
                    <Carousel orientation='horizontal' className='max-w-lg border-solid border-gray-5'>
                        <CarouselContent>
                            <CarouselItem>
                                <Card className='bg-black text-white'>
                                    <CardHeader className='text-center'>
                                        <CardTitle>Gym Open Hours</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center text-sm font-medium'>
                                        <p>Mon - Friday: 8AM - 7PM</p>
                                        <p>Saturday: 9AM - 11PM</p>
                                        <p>Sunday: 8AM - 7PM</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem>
                                <Card className='bg-black text-white'>
                                    <CardHeader className='text-center'>
                                        <CardTitle>Gym Open Hours</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center text-sm font-medium'>
                                        <p>Mon - Friday: 8AM - 7PM</p>
                                        <p>Saturday: 9AM - 11PM</p>
                                        <p>Sunday: 8AM - 7PM</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem>
                                <Card className='bg-black text-white'>
                                    <CardHeader className='text-center'>
                                        <CardTitle>Gym Open Hours</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center text-sm font-medium'>
                                        <p>Mon - Friday: 8AM - 7PM</p>
                                        <p>Saturday: 9AM - 11PM</p>
                                        <p>Sunday: 8AM - 7PM</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    </div>
                </div>
                <div className="Scheduling">
                    <div className="mb-6">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">SCHEDULING</h3>
                    </div>
                    <div className='calendar'>
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCarousel;
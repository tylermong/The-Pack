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
import { type CarouselApi } from "@/components/ui/carousel"

const AnnouncementCarousel = () =>{
    return(
        <div>
            <div className="flex flex-col justify-center bg-black">

                <div className="Announcements">
                    <div className="mb-3">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">ANNOUNCEMENTS</h3>
                    </div>

                    <div className='Carousel mb-8'>
                    <Carousel orientation='horizontal' className = 'max-w-lg border-solid border-gray-5'>

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
            </div>
        </div>
    );
};

export default AnnouncementCarousel;
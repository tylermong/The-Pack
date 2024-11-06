import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnnouncementCarousel = () => {
    const [announcements, setAnnouncements] = useState([
        {
            title: "Gym Open Hours",
            content: "Monday - Friday: 8AM - 7PM\nSaturday: 9AM - 11PM\nSunday: 8AM - 7PM"
        }
    ]);

    useEffect(() => {
        const currentAnnouncements = async () => {
            try{
                const response = await axios.get('http://localhost:3001/announcements');
                setAnnouncements(response.data);
            }catch(error){
                console.error("Error on Fetching Announcements:", error)
            }
        };
        currentAnnouncements();
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center md:max-h-screen md:w-full pt-1 space-x-80">
                <div className='mb-28'>
                    <div className="mb-6">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">ANNOUNCEMENTS</h3>
                    </div>
                    <div className='flex justify-center'>
                        <Carousel orientation='horizontal' className='max-w-lg border-solid border-gray-5'>
                            <CarouselContent>
                                {announcements.map((announcement, index) => (
                                    <CarouselItem key={index}>
                                        <Card className='bg-black text-white'>
                                            <CardHeader className='text-center'>
                                                <CardTitle>{announcement.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className='text-center text-sm font-medium'>
                                                <p style={{ whiteSpace: 'pre-line' }}>{announcement.content}</p>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
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
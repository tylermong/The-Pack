import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AnnouncementCarousel = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [announcements, setAnnouncements] = useState([
        {
            title: "Gym Open Hours",
            body: "Mon - Friday: 8AM - 7PM\nSaturday: 9AM - 11PM\nSunday: 8AM - 7PM"
        }
    ]);
    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAnnouncement = { title, body };
        setAnnouncements([...announcements, newAnnouncement]);
        console.log('Submitted:', newAnnouncement);
        setTitle('');
        setBody('');
    }

    return (
        <div>
            <div className="flex justify-center md:h-screen md:w-full pt-20 space-x-80">
                <div className="Announcements">
                    <div className="mb-6">
                        <h3 className="text-white md:text-3xl text-2xl font-extrabold text-center max-md:text-center">ANNOUNCEMENTS</h3>
                    </div>
                    <div className='Carousel'>
                        <Carousel orientation='horizontal' className='max-w-lg border-solid border-gray-5'>
                            <CarouselContent>
                                {announcements.map((announcement, index) => (
                                    <CarouselItem key={index}>
                                        <Card className='bg-black text-white'>
                                            <CardHeader className='text-center'>
                                                <CardTitle>{announcement.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className='text-center text-sm font-medium'>
                                                <p style={{ whiteSpace: 'pre-line' }}>{announcement.body}</p>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary" className="text-primary px-2 py-2 text-sm rounded-lg">Create Announcement</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-primary sm:max-w-[625px]">
                                <form onSubmit={handleSubmit}>
                                    <DialogHeader>
                                        <DialogTitle>Create Announcement</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details for your new announcement.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-6 items-center gap-4">
                                            <label htmlFor="title" className="text-right text-sm">Title</label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="col-span-5"
                                            />
                                        </div>
                                        <div className="grid grid-cols-6 items-center gap-4">
                                            <label htmlFor="body" className="text-right text-sm">Body</label>
                                            <Textarea
                                                id="body"
                                                value={body}
                                                onChange={(e) => setBody(e.target.value)}
                                                className="col-span-5"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-secondary text-primary">Create Announcement</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
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

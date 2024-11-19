import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";


export type Announcement = {
    title: string;
    content: string;
    authorId: string;
}

interface CustomJwtPayload extends JwtPayload {
    sub: string;
}




const AnnouncementCarousel = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [announcements, setAnnouncements] = useState([
        {
            title: '',
            content: '',
            authorId: '',
            id: ''
        }
    ]);
    const [newAnnouncement, setNewAnnouncement] = useState<Announcement>({
        title: '',
        content: '',
        authorId: '',
    });
    const [announcementId, setAnnouncementId] = useState<string[]>([]);

    const mountAnnouncements = async () => {
        console.log('Fetching Announcements...');
        try {
            const response = await axios.get('http://localhost:3001/announcements');
            console.log('Announcements:', response.data);
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error on Fetching Announcements:", error)
        }
    };

    useEffect(() => {
        mountAnnouncements();
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Decode the JWT token to get the coachId
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const coachId = decodedToken.sub;

                console.log('Coach ID:', coachId);

                if (!coachId) {
                    console.error("Coach ID not found in token.");
                    return;
                }

                setNewAnnouncement({ title: title, content: content, authorId: coachId['id'] });

                console.log('New Announcement:', newAnnouncement);

                // Send announcements to the database
                const response = await axios.post(`http://localhost:3001/announcements`, newAnnouncement);
                console.log('Submitted:', response.data);

                //update the announcements id to the new id
                setAnnouncements([...announcements, { title: title, content: content, authorId: coachId['id'], id: response.data['id'] }]);


                console.log('Announcement ID:', announcementId);

            } catch (error) {
                console.error("Error submitting announcement:", error);
            }
        } else {
            console.error("No access token found.");
        }

        setTitle('');
        setContent('');
    }

    //For deleting announcements
    const handleDelete = async (id: number) => {
        try {
            //delete the announcement from the database by id and update the state
            await axios.delete(`http://localhost:3001/announcements/${id}`);
            setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

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
                                            <div className="flex justify-center mt-4">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className='bg-primary'>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription className='text-white font-bold'>
                                                                This action cannot be undone. This will permanently delete the announcement.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction className='border border-solid' onClick={() => handleDelete(announcement.id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
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
                                            <label htmlFor="content" className="text-right text-sm">Content</label>
                                            <Textarea
                                                id="content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="col-span-5"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-secondary text-primary hover:bg-gray-300">Create Announcement</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCarousel;

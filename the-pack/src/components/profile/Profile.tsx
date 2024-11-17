'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { UserIcon } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


export enum ROLE {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
    COACH = 'COACH',
  }

export type UserProfile = {
    id: string
    name: string
    email: string
    phoneNum: string
    password: string
    coachId: string
    createdAt: string
    role: ROLE
    updatedAt: string
}

interface CustomJwtPayload {
    username: string;
    sub:{
        id: string;
        role: ROLE;
    }
    exp?: number;
    iat?: number;
}



const Profile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState<UserProfile>({ id: '', name: '', email: '', phoneNum: '', password: '', coachId: '', createdAt: '', role: ROLE.CLIENT, updatedAt: '' })
    const [isEditing, setIsEditing] = useState(false);
    const [newProfile, setNewProfile] = useState<UserProfile>({ id: '', name: '', email: '', phoneNum: '', password: '', coachId: '', createdAt: '', role: ROLE.CLIENT, updatedAt: '' })
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    
    // To get the user profile details (mounting current data)
    const getProfile = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {

                // Decode the JWT token to get the coachId
                if (!token) {
                    throw new Error("Token is null");
                }

                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                const email = decodedToken.username;

                console.log("Access token:", decodedToken);

                if (!email) {
                    console.error("ID not found in token.");
                    return;
                }

                // Fetch profile associated with token role
                const response = await axios.get(`http://localhost:3001/user?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const [profileData] = response.data; // Extract the first object from the array
                if (profileData) {
                    setProfile(profileData); // Set the state with the extracted profile
                    console.log("Fetched profile:", profileData);
                } else {
                    console.error("No profile data found in response");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        } else {
            console.error("No Token: Access token is missing. Please log in.");
            router.replace("/login");
        }
    };

    // Fetch the clients when the component mounts
    useEffect(() => {
        getProfile();
    }, []);


    //Handlees the change password dialog
    const handleChangePassword = async () => {
        const token = localStorage.getItem('accessToken');
        try {

            if(!oldPassword || !newPassword){
                alert("Please fill in all fields.");
                return;
            }

            //Check if old pasword is the same as old password
            const hashedPassword = await axios.post('http://localhost:3001/auth/verifyPassword', {password: oldPassword, storedHash: profile.password});

            if(hashedPassword.data == false){
                alert("Old password is incorrect. Please try again.");
                return;
            }

            await axios.patch(
                `http://localhost:3001/user/${profile.id}`,
                {
                    password: newPassword
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setOldPassword('');
            setNewPassword('');
            alert("Password changed successfully.");

        } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Failed to change password";
            alert(message);
        } else {
            alert("An unexpected error occurred");
        }
        console.error("Password update error:", error);
    }
    };

    //Handles edit mode
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setNewProfile(profile);  
        }
    };

    
    const handleLogout = () => {
        // Clear any stored tokens or session data
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
        
        // Reset the profile state
        setProfile({id: '', name: '', email: '', phoneNum: '', password: '', coachId: '', createdAt: '', role: ROLE.CLIENT, updatedAt: ''});
        
        // Redirect to login page
        router.replace("/login");
    };

    const handleSaveChanges = async () => {
        const updatedProfile = {
          id: newProfile.id || profile.id,
          name: newProfile.name || profile.name,
          email: newProfile.email || profile.email,
          phoneNum: newProfile.phoneNum || profile.phoneNum,
          password: newProfile.password || profile.password,
          coachId: profile.coachId,
          createdAt: profile.createdAt,
          role: profile.role,
          updatedAt: profile.updatedAt
        };
    
        try {
          await axios.put('http://localhost:3001/users', updatedProfile);
          setProfile(updatedProfile); // Update state with the new values
          setIsEditing(false);
        } catch (error) {
          console.error("Failed to update profile:", error);
        }
      };

    return(
        <div className='flex pl-48'>
            <div className='flex flex-col items-center h-auto space-x-4'>
                <Card className="w-64 h-64 border-r bg-black text-white">
                    <CardContent className='flex flex-col items-center justify-center h-full'>
                        <UserIcon size={64} className='flex'/>
                        <p>@{profile.name}</p>
                    </CardContent>

                </Card>

                <div className='flex pr-5'>
                    <Button onClick={handleLogout} className="mt-4 flex h-auto w-full"variant="outline">
                        Logout
                    </Button>
                </div>
            </div>

            <div className='flex pl-32'>
                <Card className="w-[650px] border border-r bg-black text-white">
                    <CardHeader>
                        <CardTitle className='text-4xl'>
                            Profile Details
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="overflow-y-auto">
                        {isEditing ? (
                            <div className="space-y-4">
                                {['name', 'email', 'phoneNum'].map((field) => (
                                    <div key={field} className="flex justify-between">
                                        <span className="font-bold text-lg">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                                        <span className="text-gray-400 text-2xl">
                                            <Input
                                                value={newProfile[field as keyof typeof newProfile]}
                                                onChange={(e) => setNewProfile({ ...newProfile, [field]: e.target.value })}
                                            />
                                        </span>
                                    </div>
                                ))}
                                <Separator />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {['name', 'email', 'phoneNum'].map((field) => (
                                    <div key={field} className="flex justify-between">
                                        <span className="font-bold text-lg">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                                        <span className="text-gray-400 text-2xl">
                                        <span>{profile[field as keyof UserProfile] || 'N/A'}</span>
                                        </span>
                                    </div>
                                ))}
                                <Separator />
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button className = 'mt-4' variant="outline" onClick={handleEditToggle}>
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                        </Button>
                        <Button className = 'mt-4' variant="outline" onClick={handleSaveChanges} disabled = {!isEditing}>
                            Save Changes
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className = 'mt-4' variant="outline">
                                    Change Password
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='bg-primary w-full h-auto'>
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>
                                        Change Your Password
                                    </DialogTitle>
                                    <DialogDescription>
                                        Here you can change your current password. Type your old password
                                        then type your new password. Then press save.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col justify-between gap-4">
                                <div className="flex justify-between">
                                    <span className="font-bold text-lg">Old Password:</span>
                                    <span className="text-gray-400 text-2xl">
                                        <Input
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder='Type old password'
                                        />
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-bold text-lg">New Password:</span>
                                    <span className="text-gray-400 text-2xl">
                                        <Input
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder='Type new password'
                                        />
                                    </span>
                                </div>
                                </div>

                                <Button className = 'mt-4' variant="outline" onClick={handleChangePassword}>
                                    Save
                                </Button>

                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
export default Profile;
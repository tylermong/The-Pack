'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
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


const Profile = () => {
    const router = useRouter()
    const [profile, setProfile] = useState({
        userName: "",
        email: "",
        phone: "",
        password: "",
      });
      const [isEditing, setIsEditing] = useState(false);
      const [newProfile, setNewProfile] = useState({
        userName: "",
        email: "",
        phone: "",
        password: "",
      });

    // To get the user profile details (mounting current data)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                const response = await axios.get('http://localhost:3001/users');
                const data = response.data;
                setProfile({
                    userName: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    password: data.password || "",
                  });
            }catch(error){
                console.error("Error on Fetching User data:", error)
            }
        };
        fetchUserProfile();
    }, []);

    //Handles edit mode
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setNewProfile(profile);  
        }
    };

    const handleLogout = () => {
        //ADD EXTRA LOGIC TO FULLY LOGOUT LIKE TOKEN AND AUTHENTICATION
        router.replace("/clientlogin")
    };

    const handleSaveChanges = async () => {
        const updatedProfile = {
          userName: newProfile.userName || profile.userName,
          email: newProfile.email || profile.email,
          phone: newProfile.phone || profile.phone,
          password: newProfile.password || profile.password,
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
                    <Avatar className='flex'>
                            <AvatarImage src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeF7t3Qe0LWlZJuDXBmwkNSjSoCBZkjRIA0oGYZDQtgRBFImKjiIGcGAGJcMsEEcQYRAFyVEkBwPYoGAk2QRpQCTokBFoBCQ0s3+s67peuulzz61/7/rre2qts25f2Puv73u+ume/Z59dVd8UGwECBAgQIFBO4JvKdaxhAgQIECBAIAKAg4AAAQIECBQUEAAKDl3LBAgQIEBAAHAMECBAgACBggICQMGha5kAAQIECAgAjgECBAgQIFBQQAAoOHQtEyBAgAABAcAxQIAAAQIECgoIAAWHrmUCBAgQICAAOAYIECBAgEBBAQGg4NC1TIAAAQIEBADHAAECBAgQKCggABQcupYJECBAgIAA4BggQIAAAQIFBQSAgkPXMgECBAgQEAAcAwQIECBAoKCAAFBw6FomQIAAAQICgGOAAAECBAgUFBAACg5dywQIECBAQABwDBAgQIAAgYICAkDBoWuZAAECBAgIAI4BAgQIECBQUEAAKDh0LRMgQIAAAQHAMUCAAAECBAoKCAAFh65lAgQIECAgADgGCBAgQIBAQQEBoODQtUyAAAECBAQAxwABAgQIECgoIAAUHLqWCRAgQICAAOAYIECAAAECBQUEgIJD1zIBAgQIEBAAHAMECBAgQKCggABQcOhaJkCAAAECAoBjgAABAgQIFBQQAAoOXcsECBAgQEAAcAwQIECAAIGCAgJAwaFrmQABAgQICACOAQIECBAgUFBAACg4dC0TIECAAAEBwDFAgAABAgQKCggABYeuZQIECBAgIAA4BggQIECAQEEBAaDg0LVMgAABAgQEAMcAAQIECBAoKCAAFBy6lgkQIECAgADgGCBAgAABAgUFBICCQ9cyAQIECBAQABwDBAgQIECgoIAAUHDoWiZAgAABAgKAY4AAAQIECBQUEAAKDl3LBAgQIEBAAHAMECBAgACBggICQMGha5kAAQIECAgAjgECBAgQIFBQQAAoOHQtEyBAgAABAcAxQIAAAQIECgoIAAWHrmUCBAgQICAAOAYIECBAgEBBAQGg4NC1TIAAAQIEBADHAAECBAgQKCggABQcupYJECBAgIAA4BggQIAAAQIFBQSAgkPXMgECBAgQEAAcAwQIECBAoKCAAFBw6FomQIAAAQICgGOAAAECBAgUFBAACg5dywQIECBAQABwDBAgQIAAgYICAkDBoWuZAAECBAgIAI4BAgQIECBQUEAAKDh0LRMgQIAAAQHAMUCAAAECBAoKCAAFh65lAgQIECAgADgGCBAgQIBAQQEBoODQtUyAAAECBAQAxwABAgQIECgoIAAUHLqWCRAgQICAAOAYIECAAAECBQUEgIJD1zIBAgQIEBAAHAMECBAgQKCggABQcOhaJkCAAAECAoBjgAABAgQIFBQQAAoOXcsECBAgQEAAcAwQIECAAIGCAgJAwaFruYTAtye5VJL25zHT13lP578bxqeTfGr689D//liSdyf5eAk1TRIoJCAAFBq2Vlcn8M1JvjvJZQ7688B/f+vM3X4yySnT17sO+u8WDr44874sR4DAFgQEgC0g2wWBmQTOleQ6Sa4/fR2f5Cwzrb3fZb6c5E1JTtrU9Jokr0vy2f0u5nkECGxPQADYnrU9EThcgSW+4J9ZDwLBmQn5/wksREAAWMgglEFgEmgv+rdMcrsk/y3J2QaX+VKSP0nynCQv8u7A4NNU/qoEBIBVjVMzgwqcffM2+olJfjTJzZK0v69x+0KSl09h4GVJ2t9tBAjsSEAA2BG83RKYXuzvlOSHknxLMZF/S/LSJE9P8opivWuXwCIEBIBFjEERhQTOmuQOSe4zfXq/UOtn2Oo7N+96PDzJM5O0zxDYCBDYgoAAsAVkuyAw/YT/00nuleQiRE5X4ANJfiPJEzcB6fOMCBDoKyAA9PW1OoF28Z1fSHKPJOfHsSeBdvGh39p4PXa6ONGenuRBBAgcnoAAcHheHk1grwJHJfm5zXn6D0nSQoDt8AX+dXORofsmeUKSrx7+0z2DAIFvJCAAOD4IzC9w9SS/l+S4+ZcuuWK70NDdpgsOlQTQNIEeAgJAD1VrVhX4tiS/nuQuSfzbmvcoOG36bED78GS7b4GNAIEjFPBN6ggBPZ3A9GL/M5uL9jwsydzX4Af8XwU+sbl+wP/cfJDySX4t4NAgcGQCAsCR+Xk2ge+d3u5v1+W3bU/gDUl+MsnJ29ulPRFYl4AAsK556ma7Aveczl8f/XK921Wbb2/tLoT3ns4YmG9VKxEoIiAAFBm0NmcVON90Odsbz7qqxfYr0C4v3C6u1M4asBEgsEcBAWCPUB5GYBL4/s2n+1+wOTXtQkQWJfChza8DbpXkrxdVlWIILFhAAFjwcJS2KIH2b+VXNxU9cHNu/1kWVZliDgi0ywjfb3PVxUf4gKCDgsCZCwgAZ27kEQSO3Vy3/9lJboBiCIGTktw2yceHqFaRBHYkIADsCN5uhxG4TJLXJLngMBUrtAn8c5IbJTkFBwECpy8gADgyCJyxwDWSvDLJMZCGFPj0FALaKYM2AgQOERAAHBIETl/gpklemORoQEMLfGH6cGALcjYCBA4SEAAcDgS+XuCu08V92g19bOMLtMsI3zHJM8dvRQcE5hMQAOaztNI6BB46fdp/Hd3o4mCB+093Z6RCgIAbljgGCPwXgXb/+bszWbXAb21uJvRLq+5QcwT2KOAdgD1CedjqBf5Xkv+9+i412ATarB+OgkB1AQGg+hGg/ybwY0mehaKUQLt08DNKdaxZAocICAAOieoC7Xr+r3B1v3KHwVeSnJDkj8p1rmECk4AA4FCoLHDNJK/evB189soIhXtvpwheL8nfFjbQemEBAaDw8Iu3foUkf5Xk3MUdqrf/qc27AO0GT64YWP1IKNi/AFBw6Fr+2ov+P2zO9f9OFgSSvG9zh8fjkpxKg0AlAQGg0rT1ekDgRUl+GAeBgwTaVR/b7YRtBMoICABlRq3RSeAeSR5Dg8DpCPzs5qZPv0OGQBUBAaDKpPXZBK6U5O+SnA0HgdMRaB8KvGqSt9MhUEFAAKgwZT02gfZ7/5OTXAwHgW8g8O4kV07yOUoE1i4gAKx9wvo7IOD3/o6FvQo8Z7o41F4f73EEhhQQAIYcm6IPU+CnkzzhMJ/j4bUF2h0hn1ybQPdrFxAA1j5h/V08yTtc7MeBcJgCn09y+ekUwcN8qocTGENAABhjTqrcv0C7zO9N9/90zyws8NIkJxbuX+srFxAAVj7g4u21b94vLm6g/SMTuPl0r4gjW8WzCSxQQABY4FCUNIvA0UnaJ7ovMstqFqkq8MEkl97cQvjfqwLoe70CAsB6Z1u9swcnuV91BP3PIvCAJO14shFYlYAAsKpxamYSuMT0wb/2LoCNwJEKtJ/+27sA7d0AG4HVCAgAqxmlRg4S+LMkNyBCYEaBl7h/xIyallqEgACwiDEoYkaB62/u8X7SjOtZisABgWsneT0OAmsREADWMkl9HBD40yQ3wkGgg0A7pbSdFWAjsAoBAWAVY9TEJHCVJG+kQaCjwBWTvK3j+pYmsDUBAWBr1Ha0BYF2zr8Lt2wBuvAu/mDzAdPbFu5f6ysSEABWNMzirVwhyVuTOKaLHwid2/9qkssmeVfn/VieQHcB3yy7E9vBlgSeneR2W9qX3dQWeEqSu9Qm0P0aBASANUxRDxdN8t7NxVqOQkFgCwJf3twpsB1z/28L+7ILAt0EBIButBbeosCTkrTbt9oIbEvgcUl+fls7sx8CPQQEgB6q1tymwLmSfMztfrdJbl9J2u2Cj01yKg0CowoIAKNOTt0HBO68eTv2yTgI7ECgHXtP3cF+7ZLALAICwCyMFtmhwKuS3HCH+7frugLtolM3rtu+zkcXEABGn2Dt+i+Q5MNO/at9EOyw+3ZK4IWSfGSHNdg1gX0LCAD7pvPEBQj8SpJHLqAOJdQVuGeSR9VtX+cjCwgAI09P7W9JciUMBHYo0C49fdUd7t+uCexbQADYN50n7ljg8knevuMa7J5AE7h0kvegIDCagAAw2sTUe0Dg4ZtTse6Dg8ACBB6a5H4LqEMJBA5LQAA4LC4PXpDAO5JcbkH1KKWuwMl+FVV3+CN3LgCMPL26tX9rkk/UbV/nCxQ4v2NygVNR0jcUEAAcICMK3CbJ80YsXM2rFbhlkhettjuNrVJAAFjlWFff1GM3l/+9++q71OBIAo9O8ssjFaxWAgKAY2BEgbclucKIhat5tQLtlNTvXW13GlulgACwyrGuuim//1/1eIdt7rQk53VzoGHnV7JwAaDk2Idu+tZJnj90B4pfq8APJ3nJWpvT1/oEBID1zXTtHT1m82nre6y9Sf0NKfCbm3cA7jVk5YouKSAAlBz70E2/Psk1h+5A8WsVeF2S66y1OX2tT0AAWN9M197Rx5K0c65tBJYm8NEkxy6tKPUQOCMBAcCxMZLAuXzIaqRxlaz1mCSfKdm5pocTEACGG1npgr8vyV+XFtD80gWuluQNSy9SfQSagADgOBhJ4A5JnjZSwWotJ3D7JM8q17WGhxQQAIYcW9miH5Lk18p2r/ERBB60KfKBIxSqRgICgGNgJIF2/f92HwAbgaUKtJ/+27sANgKLFxAAFj8iBR4k0C63eiUiBBYs0H7/3z4HYCOweAEBYPEjUuBBAh9JcgEiBBYs8C9JLrzg+pRG4D8FBAAHw0gCn09y9pEKVms5gVOTnKdc1xoeUkAAGHJsJYs+KslXSnau6dEEfF8dbWJF63WgFh38gG2fL8knB6xbyfUEzp3ks/Xa1vFoAgLAaBOrW+93JXl/3fZ1PpDAdyT50ED1KrWogABQdPADtv09Sd46YN1Kridw2SSn1Gtbx6MJCACjTaxuvddI8pd129f5QAIuBzzQsCqXKgBUnv5Yvd84yR+PVbJqiwr8QJKTivau7YEEBICBhlW81FsmeUFxA+2PIXBikpeOUaoqKwsIAJWnP1bvJ/imOtbAClfbjtWXF+5f64MICACDDEqZub63VR0FgwhcL8mfD1KrMgsLCACFhz9Y68e7z/pgE6tb7lWSvLlu+zofRUAAGGVS6rxMkndiIDCAwKWTvGeAOpVYXEAAKH4ADNR+u7hKu9GKjcDSBS6YpN24ykZg0QICwKLHo7iDBNoNVj5NhMAAAudM8rkB6lRicQEBoPgBMFD7bgY00LAKl3pakrMU7l/rAwkIAAMNS6n5tyTn4EBgwQLtXarzLrg+pRH4TwEBwMEwkkD7YNUlRypYreUE2gdVL1euaw0PKSAADDm2skW3i6vcrGz3Gh9B4MVJbjFCoWokIAA4BkYSeFSSXxqpYLWWE3jk5gOA9y7XtYaHFBAAhhxb2aJ/Nsn/Ldu9xkcQuFuSJ45QqBoJCACOgZEEbpjkVSMVrNZyAi4DXG7k4zYsAIw7u4qVXzjJBys2rudhBFwEaJhRKVQAcAyMJvCFJEePVrR6Swh8Nsm5S3SqyVUICACrGGOpJt6S5EqlOtbsKAJv2NwG+GqjFKtOAgKAY2A0gackudNoRau3hMCTk9y1RKeaXIWAALCKMZZq4i5Jfr9Ux5odRaAdmy2g2ggMISAADDEmRR4kcPEk7yVCYIECxyb56ALrUhKB0xUQABwYIwp8KEn7tLWNwFIE3pekhVMbgWEEBIBhRqXQgwSeunkX4I5ECCxIwO//FzQMpexNQADYm5NHLUvA5wCWNQ/V/EcgfToIAiMJCAAjTUutBwR8DsCxsDQBv/9f2kTUc6YCAsCZEnnAQgV8DmChgylY1j8muVTBvrU8uIAAMPgAC5f/2CR3L9y/1pcj8Ogkv7ycclRCYG8CAsDenDxqeQLXSPKXyytLRQUF2tX/2lUAbQSGEhAAhhqXYg8R+ECSi1AhsEOBdk2KS+5w/3ZNYN8CAsC+6TxxAQIPS3LfBdShhLoCD9q0/sC67et8ZAEBYOTpqf0KSd6GgcAOBdpP/65MucMB2PX+BQSA/dt55jIE/j7JccsoRRXFBN6Y5KrFetbuigQEgBUNs2gr907yiKK9a3u3AvdK8pu7LcHeCexfQADYv51nLkOgfQjw/Ukcy8uYR5Uqvjrdj8LNf6pMfIV9+qa5wqEWbOmVSW5SsG8t707g5ZtT/07Y3e7tmcCRCwgAR25ohd0LXC/Ja3ZfhgoKCVw3yV8U6lerKxQQAFY41KIt/Z0PZBWd/Pbbbhegutb2d2uPBOYVEADm9bTa7gR+KMlLdrd7ey4kcPMkryjUr1ZXKiAArHSwBdtqx/LJSb6nYO9a3p7A2x1j28O2p74CAkBfX6tvV+D2m7uyPWO7u7S3YgK3S/LcYj1rd6UCAsBKB1u0raOStFuzXqxo/9ruK9BON71EktP67sbqBLYjIABsx9letifw35M8fnu7s6dCAndL8sRC/Wp15QICwMoHXLC9syV55/STWsH2tdxJ4JQk7d4TX+m0vmUJbF1AANg6uR1uQeCGSV61hf3YRR2BdtpfO/3PRmA1AgLAakapkUMEnpfkNlQIzCDwrCTtA6Y2AqsSEABWNU7NHCRwoSTvSXIOKgSOQODUJN+d5MNHsIanElikgACwyLEoaiYBdwqcCbLwMvdM8qjC/Wt9xQICwIqHq7W0DwS2iwNdlgWBfQj44N8+0DxlHAEBYJxZqXR/Au3DW6/b31M9q7iAD/4VPwDW3r4AsPYJ668JPC7Jz6EgcBgCj01yj8N4vIcSGE5AABhuZAreh8A3J3nTdB73Pp7uKcUE/j7J1ZJ8qVjf2i0mIAAUG3jhdi+d5C3OCih8BOyt9fap/+OSvG9vD/coAuMKCADjzk7lhy/QbuTy7MN/mmcUErhFkhcX6lerhQUEgMLDL9r6k5LctWjv2v7GAr+b5GcgEagiIABUmbQ+DwicfTo1sP1KwEbggMA7khyf5AtICFQREACqTFqfBwu0m7q8IUkLAzYCn0typenKkTQIlBEQAMqMWqOHCJy4+ab/wiRHkSkt0O7ud0KSPyqtoPmSAgJAybFrehL4Sfd3L38s3CHJM8orACgpIACUHLumDxJ4UJL7EykpcL8kDy3ZuaYJJBEAHAYEkqdvfv/7EyBKCbSzQX6qVMeaJXCIgADgkCCQnCXJy5LcBEYJgZckueXmnZ/TSnSrSQJnICAAODQI/IdAOyPgtUmuDmTVAu3GUDdM8sVVd6k5AnsQEAD2gOQhZQTOuTkX/KWbIHCDMh3XarQFvJslaaf92QiUFxAAyh8CAA4ROFuS52wuFnQrMqsSaJf3vY0b/Kxqppo5QgEB4AgBPX2VAu3fxROS3G2V3dVr6vFJ7p7kq/Va1zGBMxYQABwdBM5Y4L5JHgZoaIFfM8Oh56f4jgICQEdcS69C4E5Jft8VA4ebZfuE/x2TPHO4yhVMYEsCAsCWoO1maIF2qdjnJzl66C7qFP/v02l+r6zTsk4JHL6AAHD4Zp5RU6DdLOa5SS5Ts/1hun53kltvvt46TMUKJbAjAQFgR/B2O6RAu1bAb0wfKBuygZUX/bgkv+KWviufsvZmExAAZqO0UCGBmyd5SpLzF+p5ya1+YrqUszv6LXlKalucgACwuJEoaBCBY5M8LcmNB6l3rWW+OsmPJ/noWhvUF4FeAgJAL1nrVhH4xek0s3YVQdv2BNrV/O6zeRfmsdvbpT0RWJeAALCueepmNwIXnD4bcPvd7L7cXtupfff0U3+5uWt4ZgEBYGZQy5UWuG6SdtW5y5dW6Nf8O5PcOcnf9NuFlQnUERAA6sxap9sRaLcWvkeSByU5z3Z2ufq9fHrT4QOT/HaSr6y+Ww0S2JKAALAlaLspJ9B+LfDI6dPp5ZqfqeF27f6nJ7lXko/PtKZlCBCYBAQAhwKBvgJXnH56veXmXQH/3vZm3S7j+4LN5Zcf7II+ewPzKAL7EfANaT9qnkPg8AXaFQTvl+R2SdqvCWxfL/Dl6VbM7dcn7wFEgEBfAQGgr6/VCRwqcPHNPel/dbpRzdnwfE3gi0memuShST7AhACB7QgIANtxthcChwpcOMkvJ7lDkm8vyvOR6WJKj0ryoaIG2iawMwEBYGf0dkzgawJHJfmB6cOCt0py7pW7fGb6/X47l//PkrTf99sIENiBgACwA3S7JHAGAu1mQz+cpF1Q6CabKwyu5VcEX0rSbs3bXvRf4mY9jn8CyxAQAJYxB1UQOFSgvRNw7STXn76OH+jDg+3DfG/c1P2a6et1m7v0fdaICRBYloAAsKx5qIbAGQksORB4wXfcEhhQQAAYcGhKJjB9VuDq02WHL5HkCknaqYbf1Vnn/Zu7770ryds3ZzK8N8k7pkvz+gm/M7zlCcwtIADMLWo9ArsXOG4KA5eazjA4JsmBr/NO/93+PHD2QbuVbrvcbvv61CH//bHpnPz2on/y7ltTAQECcwkIAHNJWocAAQIECAwkIAAMNCylEiBAgACBuQQEgLkkrUOAAAECBAYSEAAGGpZSCRAgQIDAXAICwFyS1iFAgAABAgMJCAADDUupBAgQIEBgLgEBYC5J6xAgQIAAgYEEBICBhqVUAgQIECAwl4AAMJekdQgQIECAwEACAsBAw1IqAQIECBCYS0AAmEvSOgQIECBAYCABAWCgYSmVAAECBAjMJSAAzCVpHQIECBAgMJCAADDQsJRKgAABAgTmEhAA5pK0DgECBAgQGEhAABhoWEolQIAAAQJzCQgAc0lahwABAgQIDCQgAAw0LKUSIECAAIG5BASAuSStQ4AAAQIEBhIQAAYallIJECBAgMBcAgLAXJLWIUCAAAECAwkIAAMNS6kECBAgQGAuAQFgLknrECBAgACBgQQEgIGGpVQCBAgQIDCXgAAwl6R1CBAgQIDAQAICwEDDUioBAgQIEJhLQACYS9I6BAgQIEBgIAEBYKBhKZUAAQIECMwlIADMJWkdAgQIECAwkIAAMNCwlEqAAAECBOYSEADmkrQOAQIECBAYSEAAGGhYSiVAgAABAnMJCABzSVqHAAECBAgMJCAADDQspRIgQIAAgbkEBIC5JK1DgAABAgQGEhAABhqWUgkQIECAwFwCAsBcktYhQIAAAQIDCQgAAw1LqQQIECBAYC4BAWAuSesQIECAAIGBBASAgYalVAIECBAgMJeAADCXpHUIECBAgMBAAgLAQMNSKgECBAgQmEtAAJhL0joEdi9wjiTnSXLM9NX+Psf2uSSfnr4+k6T93UaAwOACAsDgA1T+6gS+K8mxSb7toBfyAy/oB/957iTnO+gFvz1+m9snDgoFn0py6kF/PxAWDvz58en/+2iSD2yzSPsiQOCMBQQARweB7QhcPMlFp6+LJPmOJBeYXuzbC377aj+9V9haMPjIQV8tGHxoCgfvT9K+3lcBQo8EdikgAOxS377XJHDZ6cX9YknaC/zBL/gXXlOjW+zlg1MYaIHgvUna31swaH9/1xbrsCsCqxQQAFY5Vk11EjguyfcmaS/2lzzoBb/9JG/bvkB71+DAuwUtILwjyZunP7dfjT0SGExAABhsYMrdisC5klz5oK/2on+FJEdvZe92cqQCn09ycpK3TIGg/dn+3v53GwECk4AA4FCoLtA+PHf89JP9VaY/L5XEv411HRlfSXJKkjdNoaD92b7aWQ02AiUFfJMrOfayTbef7K+Z5BrTi357wf/OshoabwL/NAWCNyT5yySvxUKgioAAUGXSNftsn7S/bpJrTV/td/hnqUmh6z0KfCnJG5O8PsnrkvxFknbKo43A6gQEgNWNtHRDV0xy7c1PcTdI8v3Tp/FLg2h+FoH2q4M/T/JXUyB4zyyrWoTAjgUEgB0PwO73LXDWJFebXvCvM/2E/637Xs0TCexdoJ190N4ZOPD11iSn7f3pHklgGQICwDLmoIq9CbQP5/1gkptMP+Wfc29P8ygCXQU+uQmgf7p51+mPkrwiSbuwkY3A4gUEgMWPqHSB7Vr2N5xe8NsLfzv33kZg6QLtlMMWBtpX+xxB+1yBjcDiBASAxY2kfEHt+va3SHLrzTfPGzn3vvzxMDpAu0fCy5I8fwoEbqQ0+kRXVL8AsKJhDtzK+ZP8yPSif/0k7ff7NgJrE2gv/q9M8oeb01BfmuSza2tQP2MJCABjzWtN1bZz8m+/uab7j0+n6q2pN70Q2ItAe2fgGUmeu5cHewyBuQUEgLlFrfeNBNrx1n6nf6fNpVlvlWSu+9VTJzCyQLvOwLOSPGW6OuHIvah9IAEBYKBhDVxq+/T+XZPcIYk74w08SKV3F3jb5k6ST03yNGcTdLcuvwMBoPwh0A3gWzZ3Zbvt9MLfrsZnI0Bg7wLtzIH2K4Inbi5d/cdJ2r0MbARmFRAAZuW02HRxnp/c3Hjlx5KchwgBAkcs8C+bW08/eQoD7fbHNgKzCAgAszBaJEl70f+FJO16+zYCBPoIvDrJb2/uWvniPstbtZKAAFBp2vP32m6le48kP5vkAvMvb0UCBM5A4J1JHj19VuDzlAjsR0AA2I+a51w+yb2m0/iOxkGAwM4E2hkEv5PksUk+vLMq7HhIAQFgyLHtrOh2l73/keSmO6vAjgkQOD2BL07vBjwiibsVOkb2JCAA7Imp9IPaMdLO2b/35kYnVy8toXkCyxdodyV80eZqmg9N8ubll6vCXQoIALvUX/6+2wf77pPk0ssvVYUECBwi0G5X3ILAn5AhcHoCAoDj4lCBdky0y/M+ePOW4iXwECAwvMDrp8/s/M3wnWhgVgEBYFbO4Rc7IcnDnMo3/Bw1QOD0BNoNiO67ufFWu9qgjUAEAAdBE7jm5rr8v57kWjgIEFi9QLvvQAsCLiq0+lF/4wYFgNoHwMWS/J/pQ361JXRPoJbAv0/XEWjv+J1aq3XdHhAQAGoeC+dLcv8kd9+85X+2mgS6JkBg8z3gY0kekOR33W+g3vEgANSb+S9O/+BbCLARIECgCZwyXcrbGQOFjgcBoM6wrzxdKOSKdVrWKQEChynw3CTKZ6XcAAANzklEQVQ/v/n6+GE+z8MHFBAABhzaYZbcbsvbzgVuP/mf5TCf6+EECNQT+GSSeyZ5ar3Wa3UsAKx73u3Sve02ohddd5u6I0Cgg8BJmzMF7uJsgQ6yC1lSAFjIIGYu45xJfmu6Re/MS1uOAIFCAv823f/j8YV6LtOqALC+Ubdz+Z+d5CLra01HBAjsSODVSe6U5F92tH+77SAgAHRA3dGSZ0/y8OmTvOa6oyHYLYEVC3xq+oDgM1fcY6nWvFCsY9yXT/LCJN+9jnZ0QYDAggWel+Sum18NtF8P2AYWEAAGHt5U+ombF/52ac/2e38bAQIEtiHQrhtw8yT/uI2d2UcfAQGgj+s2Vm2n9LW3/H9lGzuzDwIECBwi8Jkkt0/yMjJjCggAY87t2zZ37HtBkuuOWb6qCRBYkcBDpkuLr6ilGq0IAOPN+cJJXpPkkuOVrmICBFYq8JzNrwPukOTLK+1vlW0JAGON9TLTi/8FxypbtQQIFBBo9xG4RZLPF+h1FS0KAOOM8apJXpXkmHFKVikBAsUE/jbJDyZppwzaFi4gACx8QFN5N0vy8jFKVSUBAsUF3pbkhkk+Wtxh8e0LAIsfUW63+X3/0zc39Dnr8ktVIQECBL4m8E9TCGh/2hYqIAAsdDBTWXdL8oQk5rTsOamOAIGvF2jvALQbkr0DzjIFvLAscy6tqgcmecByy1MZAQIEzlSgfRbgpkn++kwf6QFbFxAAtk6+px3eL8mD9/RIDyJAgMCyBdolg6+T5M3LLrNedQLA8mZ+5yRPXl5ZKiJAgMC+BT6R5PtcOnjffl2eKAB0Yd33oickefHmp/+j9r2CJxIgQGCZAh9IcvUkH1lmefWqEgCWM/PrJzlpOeWohAABArMLnLy5nsm1k5w6+8oWPGwBAeCwybo84TuT/H2Sdo1/GwECBNYs0N7lbFcMtO1YQADY8QCm8/vbJ2SP330pKiBAgMBWBH4xyWO2sic7OUMBAWD3B8ejk7R/DDYCBAhUEfhSkmsl+bsqDS+xTwFgt1O5VZI/3G0J9k6AAIGdCHxwc1vz49w3YCf2X9upALA7+wskeXeS8+yuBHsmQIDATgWetfk+ePudVlB45wLA7ob/iukKWburwJ4JECCwe4F2+rObne1gDgLADtCT3DHJU3eza3slQIDAogTaPQMul+STi6qqQDECwPaHfGySU5Ics/1d2yMBAgQWKfDMJD+xyMpWXJQAsP3hPsPvvLaPbo8ECCxeoF0M7bWLr3JFBQoA2x1muxa2u2Jt19zeCBAYQ6DdNvh7NndB/eoY5Y5fpQCw3Rm2u2Fdebu7tDcCBAgMI/DTSX5vmGoHL1QA2N4AffBve9b2RIDAmAIfT3KxJO0WwrbOAgJAZ+Bp+eb8j5tP/l98O7uzFwIECAwrcK/N9VF+c9jqBypcANjOsE6cbvO7nb3ZCwECBMYV+OckF01y2rgtjFG5ALCdOb1mc6vf621nV/ZCgACB4QV+NMnzhu9i4Q0IAP0H1K513W71ayNAgACBvQn8TZLv39tDPWq/AgLAfuX2/rwnJbnr3h/ukQQIECCQ5CpJ2plTtk4CAkAn2GnZo5N8Isk5++7G6gQIEFidwGPcKr3vTAWAvr532pzS8pS+u7A6AQIEVinwqSTtrqlfWmV3C2hKAOg7BB/+6+trdQIE1i1wqyQvXHeLu+tOAOhnf97N21f/2m95KxMgQGD1Ak9L0t5JtXUQEAA6oE5L3npzXevn91veygQIEFi9wIeTXGj1Xe6oQQGgH/zjkvxcv+WtTIAAgRICl5qupFqi2W02KQD00/6HJJftt7yVCRAgUELgbkmeWKLTLTcpAPQBP1+ST/ZZ2qoECBAoJdCupfJTpTreUrMCQB/odgWrv+qztFUJECBQSuB1Sa5TquMtNSsA9IF2/n8fV6sSIFBP4CNJLliv7f4dCwB9jB+W5L59lrYqAQIEygkck+Qz5bru3LAA0Af4uUlu22dpqxIgQKCcwPFJ3lSu684NCwB9gF+a5IQ+S1uVAAEC5QRumeRF5bru3LAA0Af4xZu0emKfpa1KgACBcgLtmiqPL9d154YFgD7A7drVt+iztFUJECBQTuAhSe5fruvODQsAfYBfkKS9ZWUjQIAAgSMXcC2AIzf8uhUEgA6oSf4gyY/0WdqqBAgQKCfQvqf6YPXMYxcAZgadlhMA+rhalQCBmgICQIe5CwAdUL0D0AfVqgQIlBUQADqMXgDogCoA9EG1KgECZQUEgA6jFwA6oAoAfVCtSoBAWQEBoMPoBYAOqAJAH1SrEiBQVkAA6DB6AaADqgDQB9WqBAiUFRAAOoxeAOiAKgD0QbUqAQJlBQSADqMXADqgCgB9UK1KgEBZAQGgw+gFgA6oAkAfVKsSIFBWQADoMHoBoAOqANAH1aoECJQVEAA6jF4A6IAqAPRBtSoBAmUFBIAOoxcAOqAKAH1QrUqAQFkBAaDD6AWADqgCQB9UqxIgUFZAAOgwegGgA6oA0AfVqgQIlBUQADqMXgDogCoA9EG1KgECZQUEgA6jFwA6oAoAfVCtSoBAWQEBoMPoBYAOqAJAH1SrEiBQVkAA6DB6AaADqgDQB9WqBAiUFRAAOoxeAOiAKgD0QbUqAQJlBQSADqMXADqgCgB9UK1KgEBZAQGgw+gFgA6oAkAfVKsSIFBWQADoMHoBoAOqANAH1aoECJQVEAA6jF4A6IAqAPRBtSoBAmUFBIAOoxcAOqAKAH1QrUqAQFkBAaDD6AWADqgCQB9UqxIgUFZAAOgwegGgA6oA0AfVqgQIlBUQADqMXgDogCoA9EG1KgECZQUEgA6jFwA6oAoAfVCtSoBAWQEBoMPoBYAOqAJAH1SrEiBQVkAA6DB6AaADqgDQB9WqBAiUFRAAOoxeAOiAKgD0QbUqAQJlBQSADqMXADqgCgB9UK1KgEBZAQGgw+gFgA6oAkAfVKsSIFBWQADoMHoBoAOqANAH1aoECJQVEAA6jF4A6IAqAPRBtSoBAmUFBIAOoxcAOqAKAH1QrUqAQFkBAaDD6AWADqgCQB9UqxIgUFZAAOgwegGgA6oA0AfVqgQIlBUQADqMXgDogCoA9EG1KgECZQUEgA6jFwA6oAoAfVCtSoBAWQEBoMPoBYAOqAJAH1SrEiBQVkAA6DB6AaADapIHJLlBn6WtSoAAgXICJyV5ULmuOzcsAHQGtjwBAgQIEFiigACwxKmoiQABAgQIdBYQADoDW54AAQIECCxRQABY4lTURIAAAQIEOgsIAJ2BLU+AAAECBJYoIAAscSpqIkCAAAECnQUEgM7AlidAgAABAksUEACWOBU1ESBAgACBzgICQGdgyxMgQIAAgSUKCABLnIqaCBAgQIBAZwEBoDOw5QkQIECAwBIFBIAlTkVNBAgQIECgs4AA0BnY8gQIECBAYIkCAsASp6ImAgQIECDQWUAA6AxseQIECBAgsEQBAWCJU1ETAQIECBDoLCAAdAa2PAECBAgQWKKAALDEqaiJAAECBAh0FhAAOgNbngABAgQILFFAAFjiVNREgAABAgQ6CwgAnYEtT4AAAQIEliggACxxKmoiQIAAAQKdBQSAzsCWJ0CAAAECSxQQAJY4FTURIECAAIHOAgJAZ2DLEyBAgACBJQoIAEucipoIECBAgEBnAQGgM7DlCRAgQIDAEgUEgCVORU0ECBAgQKCzgADQGdjyBAgQIEBgiQICwBKnoiYCBAgQINBZQADoDGx5AgQIECCwRAEBYIlTURMBAgQIEOgsIAB0BrY8AQIECBBYooAAsMSpqIkAAQIECHQWEAA6A1ueAAECBAgsUUAAWOJU1ESAAAECBDoLCACdgS1PgAABAgSWKCAALHEqaiJAgAABAp0FBIDOwJYnQIAAAQJLFBAAljgVNREgQIAAgc4CAkBnYMsTIECAAIElCggAS5yKmggQIECAQGcBAaAzsOUJECBAgMASBQSAJU5FTQQIECBAoLOAANAZ2PIECBAgQGCJAgLAEqeiJgIECBAg0FlAAOgMbHkCBAgQILBEAQFgiVNREwECBAgQ6CwgAHQGtjwBAgQIEFiigACwxKmoiQABAgQIdBYQADoDW54AAQIECCxRQABY4lTURIAAAQIEOgsIAJ2BLU+AAAECBJYoIAAscSpqIkCAAAECnQUEgM7AlidAgAABAksUEACWOBU1ESBAgACBzgICQGdgyxMgQIAAgSUKCABLnIqaCBAgQIBAZwEBoDOw5QkQIECAwBIFBIAlTkVNBAgQIECgs4AA0BnY8gQIECBAYIkCAsASp6ImAgQIECDQWUAA6AxseQIECBAgsEQBAWCJU1ETAQIECBDoLCAAdAa2PAECBAgQWKKAALDEqaiJAAECBAh0FhAAOgNbngABAgQILFFAAFjiVNREgAABAgQ6CwgAnYEtT4AAAQIEliggACxxKmoiQIAAAQKdBQSAzsCWJ0CAAAECSxQQAJY4FTURIECAAIHOAgJAZ2DLEyBAgACBJQoIAEucipoIECBAgEBnAQGgM7DlCRAgQIDAEgUEgCVORU0ECBAgQKCzgADQGdjyBAgQIEBgiQICwBKnoiYCBAgQINBZQADoDGx5AgQIECCwRAEBYIlTURMBAgQIEOgsIAB0BrY8AQIECBBYooAAsMSpqIkAAQIECHQWEAA6A1ueAAECBAgsUUAAWOJU1ESAAAECBDoLCACdgS1PgAABAgSWKPD/AUZEWy7ds5nrAAAAAElFTkSuQmCC" 
                            alt="User" 
                            className='justify-center content-center bg-white' />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <p>{profile.userName}</p>
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
                                {['userName', 'email', 'phone', 'password'].map((field) => (
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
                                {['userName', 'email', 'phone', 'password'].map((field) => (
                                    <div key={field} className="flex justify-between">
                                        <span className="font-bold text-lg">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                                        <span className="text-gray-400 text-2xl">
                                            <Input value={newProfile[field as keyof typeof newProfile]} readOnly />
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
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
export default Profile;
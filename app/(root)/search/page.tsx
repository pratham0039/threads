import ProfileHeader from "@/components/shared/ProfileHeader";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect  } from "next/navigation";
import Image from 'next/image';
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";


async function Page({params}:{params:{id:string}}) {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    console.log(userInfo)

    if(!userInfo?.onboarded) redirect('/onboarding')

    const result = await fetchUsers({
        userId:user.id,
        searchString: '',
        pageNumber:1,
        pageSize:24

    })



    return(
        <section>
            <h1 className="head-text mb-10">Seacrh</h1>
            <div className="mt-14 flex flex-col gap-9">
                {result.users.length ===0?(<p>No users</p>):(
                    <>
                    {result.users.map((person)=>(
                        <UserCard
                        key= {person.id}
                        id = {person.id}
                        name = {person.name}
                        username = {person.username}
                        imgUrl = {person.image}
                        personType= "User"/>
                    ))}
                    </>
                )}

            </div>
        </section>
    )
   
}

export default Page;
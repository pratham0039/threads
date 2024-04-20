import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect  } from "next/navigation";
import Image from 'next/image';
import ThreadsTab from "@/components/shared/ThreadsTab";
import Link from "next/link";



async function Page({params}:{params:{id:string}}) {
    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    console.log(userInfo)


    const activity = await getActivity(userInfo._id)

    if(!userInfo?.onboarded) redirect('/onboarding')
    return(
        <section>
            <h1 className="head-text mb-10">
            <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className='activity-card'>
                  <Image
                    src={activity.author.image}
                    alt='user_logo'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        )}
      </section>
            </h1>
        </section>
    )





}





export default Page;
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/threads.action";
import Thread from "@/lib/models/thread.model";
import { currentUser } from "@clerk/nextjs";

export default async function Home(){

  const results = await fetchPosts(1,30);
  const user = await currentUser();

  console.log(results);
  return(
    <div>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {results.posts.length===0 ? (
          <p>No posts</p>
        ):(
          <>
          {results.posts.map((post)=>(
            <ThreadCard
             key = {post._id}
             id = {post._id}
             currentUserId = {user?.id || ""}
             parentId = {post.parentid}
             content = {post.text}
             author = {post.author}
             community = {post.community}
             createdAt = {post.createdAt}
             comments={post.children}
            
            />
          ))}
          </>

        )}

      </section>

    </div>
  )
}
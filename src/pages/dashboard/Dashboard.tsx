import React, { useEffect, useState } from "react";
import Greeting from "../../components/greeting/Greeting";
import PostInput from "../../components/postInput/Postinput";
import StatsCard from "../../components/statscard/Statscard";
import PostCard from "../../components/postcard/Postcard";
import { fetchPosts, deletePost, Post } from "../../api/posts";
import { differenceInDays } from "date-fns";
import { currentUser } from "../../constants/CurrentUser";
import * as S from "./Dashboard.styled";

import user1 from "../../assets/user2.png";
import user2 from "../../assets/user3.png";
import user3 from "../../assets/user4.png";
import user4 from "../../assets/user5.png";
import user5 from "../../assets/user6.png";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  const postsThisWeek = posts.filter((post: Post) => {
    const createdAt = new Date(post.CreateTime);
    return differenceInDays(new Date(), createdAt) <= 7;
  }).length;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handlePostCreate = (newPost: Post) => {
    const enrichedPost: Post = {
      ...newPost,
      AuthorID: currentUser.id,
      AuthorFirstName: currentUser.firstName,
      AuthorLastName: currentUser.lastName,
      AuthorAvatarUrl: currentUser.avatarUrl,
    };
    setPosts((prev) => [enrichedPost, ...prev]);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.PostID !== postId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <S.DashboardWrapper>
      <S.DashboardContent>
        <S.GreetingWrapper>
          <Greeting name={currentUser.firstName} />
        </S.GreetingWrapper>

        <S.Layout>
          <S.LeftPanel>
            <PostInput onPostCreate={handlePostCreate} />
            {posts.length === 0 ? (
              <p style={{ color: "#999" }}>No posts yet</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.PostID}
                  post={post}
                  onDelete={handleDeletePost}
                />
              ))
            )}
          </S.LeftPanel>

          <S.RightPanel>
            <StatsCard
              title="Total posts this week"
              value={postsThisWeek.toString()}
            />
            <StatsCard
              title="Most active authors"
              avatars={[user1, user2, user3, user4, user5]}
            />
          </S.RightPanel>
        </S.Layout>
      </S.DashboardContent>
    </S.DashboardWrapper>
  );
}

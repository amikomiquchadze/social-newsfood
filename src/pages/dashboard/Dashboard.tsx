import React, { useEffect, useState } from "react";
import Greeting from "../../components/topBanner/greeting/Greeting";
import PostInput from "../../components/topBanner/postInput/Postinput";
import StatsCard from "../../components/statscard/Statscard";
import PostCard from "../../components/postcard/Postcard";
import PostCardSkeleton from "../../components/postcard/components/skeleton/PostCardSkeleton";
import { differenceInDays } from "date-fns";
import * as S from "./Dashboard.styled";

import user1 from "../../assets/user2.png";
import user2 from "../../assets/user3.png";
import user3 from "../../assets/user4.png";
import user4 from "../../assets/user5.png";
import user5 from "../../assets/user6.png";

import { Post } from "../../api/models/response/post";
import api from "../../api";
import { useUser } from "../../contexts/UserContext";
import {
  reactionEmojiSource,
  ReactionOptions,
  ReactionType,
} from "../../utils/reactions";
import { fetchPosts } from "../../api/rest/post";

export default function Dashboard() {
  useEffect(() => {
    console.log("dash");
  }, [fetchPosts]);
  const { currentUser } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const postsThisWeek = posts.filter((post: Post) => {
    const createdAt = new Date(post.CreateTime);
    return differenceInDays(new Date(), createdAt) <= 7;
  }).length;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await api.posts.fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    getReactOptions();
  }, []);

  const handlePostCreate = (newPost: Post) => {
    if (currentUser) {
      const enrichedPost: Post = {
        ...newPost,
        AuthorID: currentUser?.UserID,
        AuthorFirstName: currentUser?.FirstName,
        AuthorLastName: currentUser?.LastName,
        AuthorAvatarUrl: currentUser?.AvatarUrl,
      };
      setPosts((prev) => [enrichedPost, ...prev]);
    }
  };
  
  const handleDeletePost = async (postId: number) => {
    try {
      await api.posts.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.PostID !== postId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const [reactionOptions, setReactOptions] = useState<ReactionOptions[]>([]);

  const getReactOptions = async () => {
    try {
      const resp = await api.reactions.getReactionTypes();
      const serverTypes: ReactionType[] = resp;
      const enriched = serverTypes
        .map((type) => reactionEmojiSource.find((r) => r.type === type))
        .filter(Boolean) as typeof reactionEmojiSource;

      setReactOptions(enriched);
    } catch (err) {
      console.error("Fetching failed:", err);
    }
  };

  return (
    <S.DashboardWrapper>
      <S.DashboardContent>
        <S.GreetingWrapper>
          <Greeting
            name={currentUser?.FirstName ? currentUser?.FirstName : "You"}
          />
        </S.GreetingWrapper>

        <S.Layout>
          <S.LeftPanel>
            <PostInput onPostCreate={handlePostCreate} />

            {loading ? (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            ) : posts.length === 0 ? (
              <p style={{ color: "#999" }}>No posts yet</p>
            ) : (
              posts.map((post) => (
                <PostCard
                  postReload={fetchPosts}
                  reactionOptions={reactionOptions}
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

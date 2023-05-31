"use client";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (params?.id) fetchPosts();
  }, [setPosts, params.id]);
  return (
    <Profile 
      name={username}
      desc={`Welcome to ${username}'s personalized profile page.`}
      data={posts}
    />
  );
};

export default UserProfile;

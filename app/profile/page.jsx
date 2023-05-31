"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`)
	};
	const handleDelete = (post) => {};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, [setPosts, session]);

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;

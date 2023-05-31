"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-hot-toast";

const EditPrompt = () => {
	const router = useRouter();
  const searchParams = useSearchParams();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    }

    if (promptId) getPromptDetails();
  }, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

    if (!promptId) toast.error("Prompt ID not found");
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				toast.success("Success");
				router.push("/");
			}
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;

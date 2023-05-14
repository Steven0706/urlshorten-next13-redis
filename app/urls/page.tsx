"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from "@/components/Form";

export default function CreateSurl() {
    const router = useRouter();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ title: "", longUrl: "", customUrl: "" });
    const [error, setError] = useState("");


    const createShortUrl = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/urls/new', {
                cache: 'no-store',
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    longUrl: post.longUrl,
                    customUrl: post.customUrl,
                }),
            });
            if (response.ok) {
                router.push("/");
            }
            else if (response.status == 500) {
                console.log("Error: ", response.statusText);
                setError("This ShortUrl already exists");
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div>
            <Form
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createShortUrl}
                error={error}
            />
        </div>

    )

}
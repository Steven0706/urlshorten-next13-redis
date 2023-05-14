"use client"
import client from '../redis';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSurl() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [title, setTitle] = useState('');


    const router = useRouter();


    const create = async () => {


        setLongUrl('');
        setShortUrl('');
        setTitle('');

        router.refresh();
    }


    return (
        <form onSubmit={create}>
            <h3>Create a new Note</h3>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="longUrl"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
            />
            <textarea
                placeholder="shortUrl"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
            />
            <button type="submit">
                Create note
            </button>
        </form>
    )

}
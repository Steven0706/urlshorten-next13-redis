"use client";

import { useState, useEffect, ChangeEvent } from "react";

import UrlCard from "./UrlCard";


interface UrlCardProps {
    title: string;
    longUrl: string;
    shortUrl: string;
}

interface UrlCardListProps {
    data: UrlCardProps[];
}

const UrlCardList = ({ data }: UrlCardListProps) => {
    return (
        <div className='mt-16 url_layout'>
            {data.map((post) => (
                <UrlCard
                    key={post.longUrl}
                    title={post.title}
                    longUrl={post.longUrl}
                    shortUrl={post.shortUrl}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [allPosts, setAllPosts] = useState<UrlCardProps[]>([]);

    // Search states
    const [searchText, setSearchText] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [searchedResults, setSearchedResults] = useState<UrlCardProps[]>([]);

    const filterPosts = async (searchtext: string): Promise<UrlCardProps[]> => {
        const response = await fetch("/api/search/", {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({ searchQuery: searchtext })
        })
        if (response.ok) {
            const data: UrlCardProps[] = await response.json();
            console.log("searchedPosts=>", data);
            return data;
        } else {
            // return an empty array if the request is not successful
            return [];
        }
    };

    const fetchPosts = async () => {
        const response = await fetch("/api/search/popular", { cache: 'no-store' });
        const data: UrlCardProps[] = await response.json();
        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        clearTimeout(searchTimeout || undefined);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(async () => {
                const searchResult = await filterPosts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for your URL'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>
            {searchText ? (
                <UrlCardList data={searchedResults} />
            ) : (
                <UrlCardList data={allPosts} />
            )}

        </section>
    );
};

export default Feed;

"use client";

import { useState, useEffect } from "react";

import UrlCard from "./UrlCard";

const UrlCardList = ({ data }) => {
    console.log("UrlCardList=>", data)
    return (
        <div className='mt-16 prompt_layout'>
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
    const [allPosts, setAllPosts] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);


    const filterPosts = async (searchtext) => {
        const response = await fetch("/api/search/", {
            method: "POST",
            body: JSON.stringify({ searchQuery: searchtext })
        })
        if (response.ok) {
            const data = await response.json();
            console.log("searchedPosts=>", data)
            return data;
        }

    };



    const fetchPosts = async () => {
        const response = await fetch("/api/search/popular");
        const data = await response.json();

        console.log("data=>", data)

        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    const handleSearchChange = (e) => {
        console.log(e.target.value)
        clearTimeout(searchTimeout);
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

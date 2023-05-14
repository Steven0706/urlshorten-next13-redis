"use client";

import { useState } from "react";
import Image from "next/image";

interface UrlCardProps {
    title: string;
    longUrl: string;
    shortUrl: string;
}

const UrlCard = ({ title, longUrl, shortUrl }: UrlCardProps) => {
    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(shortUrl);
        navigator.clipboard.writeText(shortUrl);
        setTimeout(() => setCopied(""), 3000);
    };
    return (
        <div className="url_card">
            <div className='flex justify-between items-start gap-5'>
                <p className='font-inter text-sm p-4'>/{shortUrl}   </p>
                <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={
                            copied === shortUrl
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        alt={copied === shortUrl ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />

                </div>

            </div>
            <a href=
                {longUrl.startsWith("http")
                    ? longUrl : `http://${longUrl}`}
                className='font-inter text-xl p-10'
                target="_blank" rel="noopener noreferrer">{title}   </a>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{longUrl}</p>
        </div>
    )
}
export default UrlCard;
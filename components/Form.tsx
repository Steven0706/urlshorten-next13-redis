import { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

interface Post {
    longUrl: string;
    title: string;
    customUrl: string;
}

interface FormProps {
    post: Post;
    setPost: (post: Post) => void;
    submitting: boolean;
    handleSubmit: (e: FormEvent) => void;
    error: string;
}

const Form = ({ post, setPost, submitting, handleSubmit, error }: FormProps) => {
    const handleInputChange = (field: keyof Post) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPost({ ...post, [field]: e.target.value });
    };

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='green_gradient'>Create your shortUrl</span>
            </h1>
            <p className='desc text-left max-w-md'>
                hey, you can create a shortUrl for your favorite Site.
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Your Original Long URL:
                    </span>

                    <textarea
                        value={post.longUrl}
                        onChange={handleInputChange('longUrl')}
                        placeholder='copy and paste your long url here'
                        required
                        className='form_textarea '
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Title of your URL:{" "}
                        <span className='font-normal'>
                            (Good title can help your search better)
                        </span>
                    </span>
                    <input
                        value={post.title}
                        onChange={handleInputChange('title')}
                        type='text'
                        placeholder='title of my url'
                        className='form_input'
                    />
                </label>
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Customized Short URL:{" "}
                        <span className='font-normal'>
                            (optional)
                        </span>
                    </span>
                    <input
                        value={post.customUrl}
                        onChange={handleInputChange('customUrl')}
                        type='text'
                        placeholder='customized shortUrl here'
                        className='form_input'
                    />
                </label>

                {error && <p className='text-red-500'>{error}</p>}


                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm'>
                        Cancel
                    </Link>

                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        {submitting ? `Creating...` : `Create`}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;

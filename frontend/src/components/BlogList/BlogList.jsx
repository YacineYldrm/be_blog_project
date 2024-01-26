import { useEffect, useState } from "react";

import SingleBlogPost from "../SingleBlogPost/SingleBlogPost";

const BlogList = () => {

    const [ blogData, setBlogData ] = useState([]);

    // fetch blog content
    useEffect(() => {
        const dataFetch = async (apiKey) => {
            
            const fetchResponse = await fetch(apiKey);
            const result = await fetchResponse.json();
            setBlogData(result);
        }
        dataFetch("http://localhost:3001/api/data");
    }, []);

    return <section>
        {blogData?.map((post) => 
        <SingleBlogPost
        key={post.id}
        post={post}
        setBlogData={setBlogData}
        />)}
    </section> 
    
}
 
export default BlogList;
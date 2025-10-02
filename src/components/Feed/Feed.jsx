import React, { useEffect, useState } from 'react'
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_convert } from '../../data';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); 
const Feed = ({ catagory }) => {
    //  State to store the list of videos
    const [data, setData] = useState([])

    //  Function to fetch data from YouTube API
    const fetchData = async () => {
        // YouTube API endpoint
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=BD&videoCategoryId=${catagory}&key=${API_KEY}`

        await fetch(url)                          // Call the API
            .then(response => response.json())    // Convert response into JSON
            .then(data => setData(data.items))    // Save "items" (list of videos) into state
            .catch(err => console.error(err));    // If error happens, log it in console
    }

    //  useEffect ensures:
    // - fetchData() runs once when the component loads
    // - runs again whenever "catagory" changes
    useEffect(() => {
        fetchData();
    }, [catagory])

    return (
        <div className="feed">
            {/*  Loop through the data array and render each video */}
            {data.map((item, index) => {
                return (
                    // Each video is a separate card
                    <Link to={`Video/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
                        {/*  Dynamic video thumbnail from API */}
                        <img src={item.snippet?.thumbnails?.medium?.url} alt={item.snippet?.title || ""} />

                        {/*  Video title */}
                        <h2>{item.snippet?.title || "No Title"}</h2>

                        {/*  Channel name */}
                        <h3>{item.snippet?.channelTitle || "No Channel"}</h3>

                        {/*  View count + Published date */}
                        <p>
                           
                         {value_convert(item.statistics?.viewCount) || "0"} views &bull; 
                         {dayjs(item.snippet?.publishedAt).fromNow()}


                        </p>
                    </Link >
                )
            })}
        </div>
    )
}

export default Feed



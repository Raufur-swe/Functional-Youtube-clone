import React, { useState, useEffect } from 'react';
import './Recomended.css';
import { API_KEY, value_convert } from '../../data';
import { Link } from 'react-router-dom';

const Recomended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        try {
            const relatedVideo_url = categoryId
                ? `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=BD&videoCategoryId=${categoryId}&key=${API_KEY}`
                : `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=BD&key=${API_KEY}`;
            const res = await fetch(relatedVideo_url);
            const data = await res.json();
            setApiData(data.items || []);
        } catch (error) {
            console.error("Error fetching recommended videos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <div className='recomended'>
            {apiData.map((item) => (
                <Link
                    to={`/Video/${item.snippet.categoryId || "0"}/${item.id}`}
                    className="side-video-list"
                    key={item.id}
                >
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_convert(item.statistics?.viewCount || 0)} views</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Recomended;

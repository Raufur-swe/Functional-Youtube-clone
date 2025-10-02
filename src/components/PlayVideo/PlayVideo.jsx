import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_convert } from '../../data'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs এ relative time ব্যবহার করার জন্য plugin enable করা
dayjs.extend(relativeTime);

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null); // ভিডিও data রাখার জন্য state
    const [channelData, setChannelData] = useState(null); // চ্যানেল এর data রাখার জন্য state
    const [comments, setComments] = useState([]); // কমেন্ট data রাখার জন্য state
    const [descExpanded, setDescExpanded] = useState(false); // for discription collaps

    // =====================
    // ভিডিও data fetch করার function
    // =====================
    const fetchVideoData = async () => {
        try {
            // youtube API call video এর জন্য
            const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            const video = data.items[0];
            setApiData(video); // ভিডিও data state এ রাখা

            // ভিডিও থেকে channelId নিয়ে channel info fetch করা
            const channelId = video.snippet.channelId;
            fetchChannelData(channelId);

            // কমেন্ট fetch করা
            fetchComments(videoId);

        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    // =====================
    // Channel data fetch করার function
    // =====================
    const fetchChannelData = async (channelId) => {
        try {
            const url = `https://youtube.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setChannelData(data.items[0]); // চ্যানেল data state এ রাখা
        } catch (error) {
            console.error('Error fetching channel data:', error);
        }
    };

    // =====================
    // Comment fetch করার function
    // =====================
    const fetchComments = async (videoId) => {
        try {
            const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10`;
            const response = await fetch(url);
            const data = await response.json();
            setComments(data.items || []); // comments state এ রাখা
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // =====================
    // VideoId change হলে সব data fetch হবে
    // =====================
    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    return (
        <div className='play-video'>
            {/* =====================
                ভিডিও player
            ===================== */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "none" }}
            ></iframe>

            {/* =====================
                ভিডিও title + views + publish time
            ===================== */}
            <h3>{apiData?.snippet?.title || "Loading..."}</h3>
            <div className="play-video-info">
                <p>
                    {apiData ? value_convert(apiData.statistics?.viewCount || 0) : '0'} views &bull;{' '}
                    {apiData ? dayjs(apiData.snippet?.publishedAt).fromNow() : '...'}
                </p>

                {/* =====================
                    Like / Dislike / Share / Save buttons
                ===================== */}
                <div>
                    <span>
                        <img src={like} alt="Like" /> {apiData ? value_convert(apiData.statistics?.likeCount || 0) : '0'}
                    </span>
                    <span>
                        <img src={dislike} alt="Dislike" /> 0
                    </span>
                    <span>
                        <img src={share} alt="Share" /> Share
                    </span>
                    <span>
                        <img src={save} alt="Save" /> Save
                    </span>
                </div>
            </div>

            <hr />

            {/* =====================
                Channel / Publisher section
            ===================== */}
            <div className="publisher">
                <img src={channelData?.snippet?.thumbnails?.default?.url || '/default_avatar.png'} alt="" />
                <div>
                    {/* channel name show করা */}
                    <p>{apiData?.snippet?.channelTitle || 'Loading...'}</p>
                    {/* subscriber count */}
                    <span>{channelData ? value_convert(channelData.statistics?.subscriberCount) + ' Subscribers' : '...'}</span>
                </div>
                <button>Subscribe</button>
            </div>

            {/* =====================
                Video description
            ===================== */}
            <div className="video-description">
                <p
                    className={descExpanded ? 'expanded' : 'collapsed'}
                    onClick={() => setDescExpanded(!descExpanded)} // click এ toggle
                    style={{ cursor: 'pointer' }}
                >
                    {apiData?.snippet?.description || 'Loading description...'}
                </p>
                <hr />

                {/* =====================
                    Comments section
                ===================== */}
                <h4>{apiData ? value_convert(apiData.statistics?.commentCount || 0) + ' comments' : '0 comments'}</h4>
                {comments.length > 0 ? comments.map((c) => {
                    const topComment = c.snippet.topLevelComment.snippet;
                    return (
                        <div className="comment" key={c.id}>
                            <img src={topComment.authorProfileImageUrl} alt="User" />
                            <div>
                                <h3>{topComment.authorDisplayName}<span>{dayjs(topComment.publishedAt).fromNow()}</span></h3>
                                <p>{topComment.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="Like" />
                                    <span>{topComment.likeCount}</span>
                                    <img src={dislike} alt="Dislike" />
                                </div>
                            </div>
                        </div>
                    );
                }) : <p>No comments available.</p>}
            </div>
        </div>
    )
}

export default PlayVideo;

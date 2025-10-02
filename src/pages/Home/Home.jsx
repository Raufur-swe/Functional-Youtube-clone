import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Home = ({ sidebar }) => {
  
const [catagory , setCatagory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} catagory={catagory} setCatagory={setCatagory} /> {/* ✅ এখানে prop পাঠাচ্ছি */}
      {/* Home একটা functional component যেটা prop হিসেবে sidebar রিসিভ করছে।
মানে যখন তুমি <Home sidebar={true} /> বা <Home sidebar={false} /> ব্যবহার করবে, সেই ভ্যালু এখানে আসবে। */}
      <div className={`container ${sidebar ? "" : 'large-container'}`} >
        <Feed catagory={catagory} />
      </div>

      {/* 👉 Sidebar খোলা থাকলে main content (Feed) ছোট হয়ে যাবে।
Sidebar বন্ধ থাকলে Feed বড় জায়গা নেবে।
sidebar === true হলে 👉 "container"

sidebar === false হলে 👉 "container large-container"

মানে sidebar এর ওপর ভিত্তি করে main content এর width/adjusment হচ্ছে। */}

    </>
  );
};

export default Home;

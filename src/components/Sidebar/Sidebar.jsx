import React from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";

const Sidebar = ({ sidebar ,catagory ,setCatagory }) => {
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        <div className={`side-links ${catagory===0?"active":""}`} onClick ={()=>setCatagory (0)} >
          <img src={home} alt="home" />
          <p>Home</p>
        </div>
        <div className={`side-links ${catagory===20?"active":""}`} onClick ={()=>setCatagory (20)} >
          <img src={game_icon} alt="gaming" />
          <p>Gaming</p>
        </div>
        <div className={`side-links ${catagory===2?"active":""}`} onClick ={()=>setCatagory (2)} >
          <img src={automobiles} alt="automobiles" />
          <p>Automobiles</p>
        </div>
        <div className={`side-links ${catagory===17?"active":""}`} onClick ={()=>setCatagory (17)} >
          <img src={sports} alt="sports" />
          <p>Sports</p>
        </div>
        <div className={`side-links ${catagory===24?"active":""}`}onClick ={()=>setCatagory (24)} >
          <img src={entertainment} alt="entertainment" />
          <p>Entertainment</p>
        </div>
        <div className={`side-links ${catagory===28?"active":""}`} onClick ={()=>setCatagory (28)} >
          <img src={tech} alt="technology" />
          <p>Technology</p>
        </div>
        <div className={`side-links ${catagory===10?"active":""}`} onClick ={()=>setCatagory (10)} >
          <img src={music} alt="music" />
          <p>Music</p>
        </div>
        <div className={`side-links ${catagory===22?"active":""}`} onClick ={()=>setCatagory (22)} >
          <img src={blogs} alt="blogs" />
          <p>Blogs</p>
        </div>
        <div className={`side-links ${catagory===25?"active":""}`} onClick ={()=>setCatagory (25)} >
          <img src={news} alt="news" />
          <p>News</p>
        </div>
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>Subscribed</h3>
        <div className="side-links" onClick ={()=>setCatagory =(0)} >
          <img src={jack} alt="jack" />
          <p>PewDiePie</p>
        </div>
        <div className="side-links" onClick ={()=>setCatagory =(0)} >
          <img src={simon} alt="simon" />
          <p>Mr.Beast</p>
        </div>
        <div className="side-links" onClick ={()=>setCatagory =(0)} >
          <img src={tom} alt="tom" />
          <p>Justin Bieber</p>
        </div>
        <div className="side-links" onClick ={()=>setCatagory =(0)} >
          <img src={megan} alt="megan" />
          <p>5-Minute-Crafts</p>
        </div>
        <div className="side-links" onClick ={()=>setCatagory =(0)} >
          <img src={cameron} alt="cameron" />
          <p>Nas Daily</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Context } from "../../main";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const TrendingPosts = () => {
  const { posts } = useContext(Context);

  const sortedPosts = posts.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 2,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 4,
      slidesToSlide: 2,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 4,
      slidesToSlide: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="trending">
      <h3>Trending Posts</h3>
      <Carousel responsive={responsive}>
        {sortedPosts && sortedPosts.length > 0 ? (
          sortedPosts.map((element) => (
            <Link
              to={`/post/${element._id}`}
              className="card"
              key={element._id}
            >
              <img src={element.mainImage.url} alt="post" className="postImg" />
              <span className="category">{element.category}</span>
              <h4>{element.title}</h4>
              <div className="authors_section">
                <div className="author">
                  <img
                    src={element.authorProfilePicture}
                    alt="author_profilePicture"
                  />
                  <p>{element.authorUserName}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <BeatLoader size={30} color="gray" />
        )}
      </Carousel>
    </div>
  );
};

export default TrendingPosts;
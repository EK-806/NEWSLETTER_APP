import React, { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <p>
          Our platform is designed to deliver the most relevant and insightful
          content directly to your inbox. Whether you're looking for the latest
          news, expert opinions, or just a fresh perspective, we make sure that
          you stay informed and engaged. Every newsletter is carefully curated
          to meet the needs of our diverse readership, ensuring that each
          edition brings value, knowledge, and a touch of inspiration.
        </p>
        <p>
          We understand that in today's fast-paced world, finding the right
          information can be overwhelming. That's why we strive to simplify your
          search for useful and interesting updates by providing you with
          concise and engaging summaries that fit seamlessly into your daily
          routine. Our goal is to make sure you never miss out on what's
          happening around the world or in the topics that matter most to you.
        </p>
        <p>
          From industry trends and breaking news to helpful tips and in-depth
          analysis, we bring you the content you want without the noise. Our
          team works tirelessly to hand-pick stories that spark curiosity and
          encourage action. We believe in delivering content that goes beyond
          surface-level reporting, providing you with stories that challenge,
          inform, and inspire.
        </p>
        <p>
          What sets us apart is our commitment to authenticity and transparency.
          We value the trust our readers place in us and work hard to maintain
          the highest standards of quality and integrity. Our newsletters are
          not just about delivering information, but about fostering a community
          of individuals who value learning, growth, and sharing knowledge.
        </p>
        <p>
          Every issue is designed to cater to your interests, making sure that
          each email you receive is not just another message in your inbox, but
          an enriching experience. Whether you're a professional seeking
          industry insights or simply someone passionate about the world around
          them, our content is meant to spark your curiosity and encourage you
          to think differently.
        </p>
        <p>
          With a focus on clarity, accuracy, and thought-provoking stories, we
          are committed to providing you with the tools you need to stay ahead,
          informed, and inspired. Join us and be part of a growing community of
          readers who are always one step ahead of the curve.
        </p>
      </div>
    </article>
  );
};

export default About;
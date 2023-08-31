"use client";
import Image from "next/image";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Article: React.FunctionComponent<Article> = ({
  title,
  content,
  author,
  photo_cover_url,
  created_at,
  category,
  comments,
}) => {
  return (
    <main className="article">
      <section className="article__header">
        <img
          alt="article-photo-cover"
          src={photo_cover_url ?? ""}
          width={1200}
          height={600}
          className="article__photo-cover"
        />
        <div className="article__header--info">
          <h1>{title}</h1>
          <p className="article__header--info--author">By: {author}</p>
          <p className="article__header--info--date">Created: {created_at}</p>
          <p className="article__header--info--category">{category}</p>
        </div>
      </section>
      <section className="article__content">
        <p>{content}</p>
      </section>
      <section className="article__tags">
        <h2>Tags</h2>
        <div className="tags__input">
          <input type="checkbox" name="" id="" className="tag__input" />
          <label htmlFor="">Tag 1</label>
        </div>
        <div className="tags__input">
          <input type="checkbox" name="" id="" className="tag__input" />
          <label htmlFor="">Tag 2</label>
        </div>
        <div className="tags__input">
          <input type="checkbox" name="" id="" className="tag__input" />
          <label htmlFor="">Tag 3</label>
        </div>
      </section>
      <section className="article__share ">
        <h2>Share</h2>
        <div className="share__input">
          <FontAwesomeIcon icon={faFacebook} />
          <span> Facebook </span>
        </div>
        <div className="share__input">
          <FontAwesomeIcon icon={faTwitter} />
          <span> Twitter </span>
        </div>
        <div className="share__input">
          <FontAwesomeIcon icon={faInstagram} />
          <span> Instagram </span>
        </div>
      </section>
      <section className="article__reply">
        <h2>Post a Reply</h2>
        <textarea
          name=""
          id=""
          placeholder="Post a reply"
          className="comment__input"
        />
        <button className="comment__btn">Comment</button>
      </section>
      <section className="article__comments">
        <h2>Comments</h2>
        <section className="comments">
          <div className="comment">
            <div className="comment__header">
              <div className="comment__header--info">
                <p className="comment__header--info--author">By {author}</p>
                <p className="comment__header--info--date">
                  Created at: {created_at}
                </p>
              </div>
              <div className="comment__header--reply">
                <p>Reply</p>
              </div>
            </div>
            <div className="comment__content">
              <p>{comments?.content} This is a comment </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Article;

/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import "./style.scss";

const Article: React.FunctionComponent<Article> = ({
  article_title,
  article_content,
  article_author,
  photo_cover_url,
  article_category,
  number_of_comments,
  article_id,
  user_id,
  article_created_at,
  article_updated_at,
}) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [hasRun, setHasRun] = useState<boolean>(false);

  // function to post a new comment
  const handleComment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/comments/${article_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentInput),
        }
      );
      const response = await res.json();
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [comments, setComments] = useState<Comment[]>([]);
  // function to get all comments
  const getComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/comments/${article_id}?article_id=${article_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const response = (await res.json()) as CommentRequest;
      console.log(response);
      setComments(response?.comments);
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (article_id && isMounted) {
      getComments();
    }

    return () => {
      isMounted = false;
    };
  }, [article_id]);

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
          <h1>{article_title}</h1>
          <p className="article__header--info--author">By: {article_author}</p>
          <p className="article__header--info--date">
            Created: {article_created_at}
          </p>
          <p className="article__header--info--category">{article_category}</p>
        </div>
      </section>
      <section className="article__content">
        <p>{article_content}</p>
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
        <div className="article__share-input">
          <FontAwesomeIcon icon={faFacebook} />
          <span> Facebook </span>
        </div>
        <div className="article__share-input">
          <FontAwesomeIcon icon={faTwitter} />
          <span> Twitter </span>
        </div>
        <div className="article__share-input">
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCommentInput(e.currentTarget.value)
          }
        />
        <button className="comment__btn" onClick={handleComment}>
          Comment
        </button>
      </section>
      <section className="article__comments">
        <h2>Comments</h2>
        <section className="comments">
          {comments.length === 0 ? (
            <div className="comment-status"> No comments yet! </div>
          ) : (
            comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="comment__header">
                  <div className="comment__header--info">
                    <p className="comment__header--info--author">
                      By: {comment?.first_name}
                    </p>
                    <p className="comment__header--info--date">
                      Created at: {new Date(comment?.created_at).toDateString()}
                    </p>
                  </div>
                  <div className="comment__header--reply">
                    <p>Reply</p>
                  </div>
                </div>
                <div className="comment__content">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default Article;

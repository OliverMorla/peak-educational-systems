/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import "./style.scss";

const BlogArticle: React.FunctionComponent<Article> = ({
  article_title,
  article_content,
  article_author,
  photo_cover_url,
  article_category,
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
        `${process.env.NEXT_PUBLIC_API_URL}/comments/blogs/${article_id}`,
        {
          method: "POST",
          body: JSON.stringify(commentInput),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      alert(response.message);
    } catch (err) {
      if (err instanceof Error) return console.log(err.message);
    }
  };

  const [comments, setComments] = useState<Comment[]>([]);
  // function to get all comments
  const getComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/blogs/${article_id}?article_id=${article_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json() as CommentsReponse;
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
            Created: {new Date(article_created_at).toDateString()}
          </p>
          <p className="article__header--info--category">{article_category}</p>
        </div>
      </section>
      <section className="article__content">
        <div className="App" data-color-mode="light">
          <MarkdownEditor.Markdown source={article_content} />
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

export default BlogArticle;

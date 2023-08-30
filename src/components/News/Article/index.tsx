"use client";
import Image from "next/image";
import "./style.scss";

const Article: React.FunctionComponent<ArticleProps> = ({
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
        <Image
          alt="article-photo-cover"
          src={photo_cover_url}
          width={1200}
          height={600}
          className="article__photo-cover"
        />
        <div className="article__header--info">
          <h1>{title}</h1>
          <p className="article__header--info--author">By {author}</p>
          <p className="article__header--info--date">{created_at}</p>
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
          <input type="checkbox" name="" id="" className="share__input" />
          <label htmlFor="">Facebook</label>
        </div>
        <div className="share__input">
          <input type="checkbox" name="" id="" className="share__input" />
          <label htmlFor="">Twitter</label>
        </div>
        <div className="share__input">
          <input type="checkbox" name="" id="" className="share__input" />
          <label htmlFor="">Linkedin</label>
        </div>
      </section>
      <section className="article__reply">
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
                <p className="comment__header--info--date">{created_at}</p>
              </div>
              <div className="comment__header--reply">
                <p>Reply</p>
              </div>
            </div>
            <div className="comment__content">
              <p>{comments[0]?.content}</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Article;

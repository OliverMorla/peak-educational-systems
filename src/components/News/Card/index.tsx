import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";

const Card: React.FunctionComponent<NewsCardProps> = ({
  id,
  title,
  author,
  number_of_comments,
  photo_cover_url,
  category,
  created_at,
  updated_at,
  views,
}) => {
  return (
    <div className="post-card">
      <div
        className="post-card__bg"
        style={{
          backgroundImage: `url(${photo_cover_url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <h1> {title} </h1>
      <div className="post-card__footer">
        <h3>
          <FontAwesomeIcon icon={faUser} width={20} />
          Author: {author}
        </h3>
        <h3>
          <FontAwesomeIcon icon={faComment} width={20} />
          {number_of_comments} Comments
        </h3>
      </div>
    </div>
  );
};

export default Card;

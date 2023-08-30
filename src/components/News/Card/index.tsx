import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";

const Card: React.FunctionComponent<News> = ({
  id,
  title,
  author,
  number_of_comments,
  photo_cover_url,
  author_id,
  content,
}) => {
  return (
    <div className="card">
      <div
        className="card__bg"
        style={{
          backgroundImage: `url(${photo_cover_url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <h1> {title} </h1>
      <div className="card__footer">
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

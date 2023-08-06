import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./page.scss";

const Home = () => {
  return (
    <main className="home">
      <section className="home__section-one">
        <section className="home__section-bg">
          <div className="home__content">
            <h1>Discover, Learn, Explore</h1>
            <div className="content__border"></div>
            <p className="content__quote">
              "Be dedicated to change the way in which people see mental illness
              at all levels of society. If not for yourself, advocate for those
              who are struggling in silence.” — Germany Kent
            </p>
            <div className="content__arrows">
              <FontAwesomeIcon icon={faArrowLeft} className="arrows__btn" />
              <FontAwesomeIcon icon={faArrowRight} className="arrows__btn" />
            </div>
            <div className="content__border"></div>
          </div>
        </section>
      </section>
      <section className="home__section-two">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        doloribus repellendus ab, fugit perferendis repudiandae officia velit
        facilis. Optio esse amet ex natus ipsam dolorem illo odit aperiam id
        voluptatibus!
      </section>
      <section className="home__section-three">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        doloribus repellendus ab, fugit perferendis repudiandae officia velit
        facilis. Optio esse amet ex natus ipsam dolorem illo odit aperiam id
        voluptatibus!
      </section>
      <section className="home__section-four">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        doloribus repellendus ab, fugit perferendis repudiandae officia velit
        facilis. Optio esse amet ex natus ipsam dolorem illo odit aperiam id
        voluptatibus!
      </section>
    </main>
  );
};

export default Home;

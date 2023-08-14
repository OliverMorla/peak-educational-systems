import "./page.scss";

const Panel = () => {
  const Users = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      date_of_birth: "01/01/2000",
      title: "Teacher",
      emp_type: "Private",
      emp_region: "NYC",
      child_grade_level: "3rd Grade",
      school_type: "Public",
      school_region: "Long Island",
    },
  ];

  const News: News[] = [
    {
      id: 1,
      title: "10 Interactive Classroom Activities for Engaging Students",
      author: "Sydney",
      comments: 29,
      photo_cover:
        "https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1730&q=80",
    },
    {
      id: 2,
      title:
        "The Future of Education: Integrating Technology into Lesson Plans",
      author: "Sydney",
      comments: 11,
      photo_cover:
        "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1752&q=80",
    },
    {
      id: 3,
      title: "Managing Work-Life Balance: Tips for Teachers by Teachers",
      author: "Sydney",
      comments: 15,
      photo_cover:
        "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const Quotes = [
    {
      id: 1,
      quote:
        "The Future of Education: Integrating Technology into Lesson Plans",
      author: "Sydney",
    },
  ];

  return (
    <main className="admin__panel">
      <h1> Admin Panel </h1>
      <section className="users">
        <h2> Users </h2>
        <div className="users__list">
          <div className="users__item">
            <table>
              <thead>
                <tr>
                  <th> id </th>
                  <th> first_name </th>
                  <th> last_name </th>
                  <th> email </th>
                  <th> date_of_birth </th>
                  <th> title </th>
                  <th> emp_type </th>
                  <th> emp_region </th>
                  <th> child_grade_level </th>
                  <th> school_type </th>
                  <th> school_region </th>
                </tr>
              </thead>
              <tbody>
                {Users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.date_of_birth}</td>
                    <td>{user.title}</td>
                    <td>{user.emp_type}</td>
                    <td>{user.emp_region}</td>
                    <td>{user.child_grade_level}</td>
                    <td>{user.school_type}</td>
                    <td>{user.school_region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="news">
        <h2> News </h2>
        <div className="news__list">
          <div className="news__item">
            <table>
              <thead>
                <tr>
                  <th> id </th>
                  <th> title </th>
                  <th> author </th>
                  <th> comments </th>
                  <th> photo_cover </th>
                </tr>
              </thead>
              <tbody>
                {News.map((news) => (
                  <tr key={news.id}>
                    <td>{news.id}</td>
                    <td>{news.title}</td>
                    <td>{news.author}</td>
                    <td>{news.comments}</td>
                    <td>{news.photo_cover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="blogs">
        <h2> Blogs </h2>
        <div className="blogs__list">
          <div className="blogs__item">
            <table>
              <thead>
                <tr>
                  <th> id </th>
                  <th> title </th>
                  <th> author </th>
                  <th> comments </th>
                  <th> photo_cover </th>
                </tr>
              </thead>
              <tbody>
                {News.map((news) => (
                  <tr key={news.id}>
                    <td>{news.id}</td>
                    <td>{news.title}</td>
                    <td>{news.author}</td>
                    <td>{news.comments}</td>
                    <td>{news.photo_cover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="quotes">
        <h2> Quotes </h2>
        <div className="quotes__list">
          <div className="quotes__item">
            <table>
              <thead>
                <tr>
                  <th> id </th>
                  <th> quote </th>
                  <th> author </th>
                </tr>
              </thead>
              <tbody>
                {Quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.id}</td>
                    <td>{quote.quote}</td>
                    <td>{quote.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="panel__buttons">
        <button className="add-blog-btn"> Create blog </button>
        <button className="add-news-btn"> Create News </button>
        <button className="add-quote-btn"> Create Quote </button>
      </section>
    </main>
  );
};

export default Panel;

const Category = ({ name, count }: { name: string; count: string }) => {
  return (
    <div className="categories__input">
      <input type="checkbox" name={name} className="category__input" />
      <label htmlFor={name}>
        {name} ({count})
      </label>
    </div>
  );
};

export default Category;

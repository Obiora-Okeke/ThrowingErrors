
const MainList = ({ recipes }) => {
  //child component
  //map all the recipes to a li, with a rating and feedback box
  return (
    <div>
      <hr />
      Take a look at our recipes!
      <ul>
        {recipes?.map(
          (recipe) =>
            ( <li key="{recipe}">
              {recipe.Name} | {recipe.Description}
              <br />
              <br />
              <form id="reviewForm">
                {/* <!-- Star Rating --> */}
                <label for="rating">Rating:</label>
                <select id="rating" name="Rate this recipe" required>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Poor">Poor</option>
                  <option value="Terrible">Terrible</option>
                </select>
                <br />
                {/* <!-- Comment Box --> */}
                <textarea
                  id="comment"
                  name="comment"
                  rows="1"
                  cols="50"
                  placeholder="Your feedback here..."
                  required
                ></textarea>
                <br />
                {/* <!-- Submit Button --> */}
                <button type="submit">Submit Review</button>
              </form>
              <br />
            </li>)
        )}
      </ul>
    </div>
  );
};

export default MainList;

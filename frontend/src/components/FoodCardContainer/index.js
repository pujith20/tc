import FoodCard from "../FoodCard";
import "./index.css";

const FoodCardContainer = ({ foodItems }) => {
  return (
    <div className="food-card-container">
      {foodItems.length > 0 ? (
        foodItems.map((item) => (
          <FoodCard key={item._id} title={item.title} image={item.thumbnail} description={item.description} productId = {item._id} price={item.price} rating={item.rating} />
        ))
      ) : (
        <p>Loading in few seconds....</p>
      )}
    </div>
  );
};

export default FoodCardContainer;

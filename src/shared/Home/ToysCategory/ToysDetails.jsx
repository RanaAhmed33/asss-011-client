import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { toast } from "react-hot-toast";

const ToysDetails = ({ toy }) => {
  const { name, pictureURL, rating, price } = toy;
  const { user } = useContext(AuthContext);
  //   console.log(toy);
  const handleCheck = () => {
    if (!user) {
      toast.error("Please Login To See Details");
    }
  };
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img src={pictureURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold ">{name}</h2>
        <p className="text-base  font-bold">Price: ${price}</p>
        <Rating
          placeholderRating={rating}
          readonly
          emptySymbol={<FaRegStar></FaRegStar>}
          placeholderSymbol={<FaStar className="text-warning"></FaStar>}
          fullSymbol={<FaStar></FaStar>}
        ></Rating>
        <div className="card-actions block">
          <Link to={`/viewDetails/${toy._id}`}>

            <button
              onClick={handleCheck}
              className="btn btn-outline btn-secondary  "
            >
              View Details
            </button>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToysDetails;

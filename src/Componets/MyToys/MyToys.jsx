import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import MyToysRow from "./MyToysRow";
import Swal from "sweetalert2";
import { useNavigation } from "react-router-dom";
import Loading from "../../Loading/Loading";
import useTitle from "../../Hooks/useTitle";

const MyToys = () => {
  useTitle("MyToys");
  const { user } = useContext(AuthContext);
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState(0);

  const [myToys, setMyToys] = useState([]);


  useEffect(() => {
    fetch(
      `https://toy-server-ranaahmed33.vercel.app/myToys?email=${user?.email}&num=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMyToys(data);
      });
  }, [user, sort]);

  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You are not able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://toy-server-ranaahmed33.vercel.app/myJobs/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Okay..", "Your Toys has been deleted.", "success");
              const remaining = myToys.filter((toys) => toys._id !== id);
              setMyToys(remaining);
            }
          });
      }
    });
  };

  return (
    <section>
      <div className="btn-group flex justify-center mt-7 mb-7 gap-3">
        <button
          onClick={() => setSort(-1)}
          className="btn btn-outline btn-secondary bg-white"
        >
          High Price
        </button>
        <button
          onClick={() => setSort(1)}
          className="btn btn-outline btn-secondary bg-white"
        >
          Low Price
        </button>
      </div>
      <div className="overflow-x-auto max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <table className="table table-compact w-full">
          {/* head */}
          <thead>
            <tr className="text-red-600">
              <th>No.</th>
              <th>Seller Name</th>
              <th>Toy Name</th>
              <th>Toy Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myToys.slice(0, showAll ? myToys.length : 4).map((toys, index) => (
              <MyToysRow
                handleDelete={handleDelete}
                toys={toys}
                key={toys._id}
                index={index}
              ></MyToysRow>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mb-4">
        {!showAll && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline btn-secondary mt-7 "
          >
            See More
          </button>
        )}
      </div>
    </section>
  );
};

export default MyToys;

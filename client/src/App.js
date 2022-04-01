import React, { useEffect, useState } from "react";

import axios from "axios";

import Modal from "react-modal/lib/components/Modal";

import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import Header from "./components/Header";

Modal.setAppElement("#root");

function App() {
  //// States ////
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(250);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDetails, setCurrentDetails] = useState();

  // When the app starts we want to fetch the user data and store it in local state //
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=${usersPerPage}&seed=abc`
      );
      setUsers(res.data.results);
      setLoading(false);
    };
    fetchUsers();
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      {users ? (
        <UserList
          users={users}
          loading={loading}
          setModalIsOpen={setModalIsOpen}
          setCurrentDetails={setCurrentDetails}
        />
      ) : (
        <h1>loading...</h1>
      )}
      {currentDetails ? (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: "gray",
            },
          }}
        >
          <h2>
            {currentDetails.name.first} {currentDetails.name.last}
          </h2>
          <img
            src={currentDetails.picture.large}
            alt={currentDetails.name.first}
          />
          <p>Email: {currentDetails.email}</p>
          <p>
            Address:{" "}
            {`${currentDetails.location.street.number} ${currentDetails.location.street.name}, ${currentDetails.location.city}, ${currentDetails.location.state}`}
          </p>
          <p>Phone: {currentDetails.phone}</p>
          <p>
            DOB: {currentDetails.dob.date.slice(0, 10)} Age:{" "}
            {currentDetails.dob.age}
          </p>
          <button
            onClick={() => setModalIsOpen(false)}
            className="btn btn-secondary"
          >
            Close Details
          </button>
        </Modal>
      ) : null}

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={7000}
        paginate={paginate}
      />
    </div>
  );
}

export default App;

import React from "react";

const UserList = ({ users, loading, setModalIsOpen, setCurrentDetails }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // function to open modal and set currentUserDetail
  const onClick = (user) => {
    setCurrentDetails(user);
    setModalIsOpen(true);
  };
  return (
    <ul className="list-group mb-4">
      {users.map((user, idx) => (
        <li key={`${user.id.value}${idx}`} className="list-group-item">
          <h3>
            {user.name.first} {user.name.last}
          </h3>
          <p>{user.email}</p>
          <p>
            {user.location.city}/{user.location.state}
          </p>
          <button onClick={() => onClick(user)} className="btn btn-primary">
            More Details
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

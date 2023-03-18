import { useState, useEffect } from "react";
import AccountFilter from "./AccountFilter";
import { v4 as uuidv4 } from 'uuid';
import userService from "../Services/userService";
import UserModal from "./UserModal";

const URL = "http://localhost:3003/users";

const UserList = ({ list, onDelete, setRefresh }) => {
  const [balanceUpdates, setBalanceUpdates] = useState("");

  const handleInputChange = (userId, amount) => {
      setBalanceUpdates({ ...balanceUpdates, [userId]: amount });
  };
  const handleAddBalance = async (id, balance) => {
      if (parseInt(balance) <= 0) {
          alert("Amount must be greater than 0");
          setBalanceUpdates({ ...balanceUpdates, [id]: "" });
          return;
      }
      let response = await userService.addBalance(id, balance);
      if (response.ok) {
          // Refresh the user list
      } else {
          // Handle errors
          alert("Error updating balance");
      }
      setRefresh((val) => !val);
      setBalanceUpdates({ ...balanceUpdates, [id]: "" });
  };
  const handleRemoveBalance = async (id, balance) => {
      const user = list.find((user) => user.id === id);
console.log(parseInt(balance));
      if (parseInt(balance) > user.balance || isNaN(parseInt(balance)))  {
          alert("Neatimsi daugiau nei reik");
          setBalanceUpdates({ ...balanceUpdates, [id]: "" });
          return;
      }
      

      let response = await userService.removeBalance(id, balance);
      if (response.ok) {
          // Refresh the user list
      } else {
          // Handle errors
          alert("Error updating balance");
      }
      setRefresh((val) => !val);
      setBalanceUpdates({ ...balanceUpdates, [id]: "" });
  };
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
      setShowModal(false);
  };
  const [showUserData, setShowUserData] = useState(null);

  const viewUser = (user) => {
      setShowUserData(user);
      setShowModal(true);
  };
  return (
      <div>
          <article>
              <h3 className="info">Banko Vartotojai</h3>
          </article>
          <table className="info-b">
              <thead>
                  <tr>
                      <th>Vardenis</th>
                      <th>Pavardenis</th>
                      <th>Balansas</th>
                      <th>Pinigėlių Info</th>
                      <th>Paskyros Veiksmai</th>
                  </tr>
              </thead>
              <tbody>
                  {list
                      .sort((a, b) => a.lastName.localeCompare(b.lastName))
                      .map((user) => (
                          <tr key={uuidv4()}>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.balance}</td>
                              <td>
                                  <input
                                      type="number"
                                      value={balanceUpdates[user.id] || ""}
                                      onChange={(e) =>
                                          handleInputChange(
                                              user.id,
                                              e.target.value
                                          )
                                      }
                                  />
                                  <button
                                      className=""
                                      onClick={() =>
                                          handleAddBalance(
                                              user.id,
                                              balanceUpdates[user.id]
                                          )
                                      }
                                  >
                                      Pridėti
                                  </button>
                                  <button
                                      className=""
                                      onClick={() =>
                                          handleRemoveBalance(
                                              user.id,
                                              balanceUpdates[user.id]
                                          )
                                      }
                                  >
                                      Atimti
                                  </button>
                              </td>
                              <td>
                                  <div className="panaikinti">
                                      {/* <input
                                          className="actions-btn"
                                          type="button"
                                          value="Peržiurėti"
                                          onClick={() => viewUser(user)}
                                      /> */}

                                      <input
                                          className=""
                                          disabled={user.balance > 0}
                                          type="button"
                                          value="Panaikinti"
                                          onClick={() => onDelete(user.id)}
                                      />
                                  </div>
                              </td>
                          </tr>
                      ))}
              </tbody>
          </table>
          {showModal && showUserData !== null && (
              <UserModal onClose={onCloseModal} user={showUserData} />
          )}
      </div>
  );
};

export default UserList;
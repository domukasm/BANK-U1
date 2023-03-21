import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import UserModal from "../UserModal";
import { Global } from "../Global";
import AccountFilter from "./AccountFilter";

const UserList = () => {
  const [balanceUpdates, setBalanceUpdates] = useState("");
  const { accounts, setSumChanged, setDeletedAccount } = useContext(Global);
  const [accountFilter, setAccountFilter] = useState("All");

  const handleInputChange = (userId, amount) => {
    setBalanceUpdates({ ...balanceUpdates, [userId]: amount });
  };
  const handleAddBalance = async (id, balance) => {
    if (parseInt(balance) <= 0) {
      alert("Amount must be greater than 0");
      setBalanceUpdates({ ...balanceUpdates, [id]: "" });
      return;
    }
    setSumChanged({ id, balance });
    setBalanceUpdates({ ...balanceUpdates, [id]: "" });
  };
  const handleRemoveBalance = async (id, balance) => {
    const user = accounts.find((user) => user.id === id);
    console.log(parseInt(balance));
    if (parseInt(balance) > user.balance || isNaN(parseInt(balance))) {
      alert("Neatimsi daugiau nei reik");
      setBalanceUpdates({ ...balanceUpdates, [id]: "" });
      return;
    }

    setSumChanged({ id, balance: -parseInt(balance) });
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

  const filterHandler = (e) => {
    setAccountFilter(e.target.value);
  };

  const filteredAccounts = accounts
    ? accounts.filter((acc) =>
        accountFilter === "withMoney"
          ? acc.balance > 0
          : accountFilter === "noMoney"
          ? acc.balance === 0
          : true
      )
    : [];
  return (
    <div>
      <AccountFilter filterHandler={filterHandler} />
      <article>
        <h3 className="info">Banko Vartotojai</h3>
      </article>
      {filteredAccounts && filteredAccounts.length > 0 ? (
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
            {filteredAccounts
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
                        handleInputChange(user.id, e.target.value)
                      }
                    />
                    <button
                      className=""
                      onClick={() =>
                        handleAddBalance(user.id, balanceUpdates[user.id])
                      }
                    >
                      Pridėti
                    </button>
                    <button
                      className=""
                      onClick={() =>
                        handleRemoveBalance(user.id, balanceUpdates[user.id])
                      }
                    >
                      Atimti
                    </button>
                  </td>
                  <td>
                    <input
                      className=""
                      disabled={user.balance > 0}
                      type="button"
                      value="Panaikinti"
                      onClick={() => setDeletedAccount({ id: user.id })}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}
      {showModal && showUserData !== null && (
        <UserModal onClose={onCloseModal} user={showUserData} />
      )}
    </div>
  );
};

export default UserList;

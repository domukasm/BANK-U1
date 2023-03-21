import { useState, useEffect, useContext } from "react";
import { Global } from "./Global";
import Teletubbies from "../assets/teletubbies.jpg"
import bebrudarba from "../assets/bebrudarba.png"

const Home = () => {
    const [accountFilter, setAccountFilter] = useState('All')
    const { accounts } = useContext(Global)

    const AccountSummary = () => {
        const {accounts} = useContext(Global)
        const totalMoney = accounts.reduce(
            (total, current) => total + current.balance,
            0
        );

        const filterHandler = e => {
            setAccountFilter(e.target.value);
        };
    
        const filteredAccounts = accounts
            ? accounts.filter(acc =>
                accountFilter === 'withMoney'
                  ? acc.sum > 0
                  : accountFilter === 'noMoney'
                  ? acc.sum === 0
                  : true,
            )
            : [];

        return (
            <>
                <article className="header">
                    <header>
                        <div className="header">
                            <h1>Bitutės bankas</h1>
                        </div>
                        <div className="statistics">
                            <div className="client-number">
                            Iš viso paskyrų: {accounts.length}
                            </div>
                            <div>
                            Iš viso pinigų:{" "}
                            {totalMoney.toFixed(2)} €
                            </div>
                        </div>
                    </header>
                </article>
                <div style={{ paddingLeft: '550px' , paddingTop: '50px' }}>
                    <img src={Teletubbies} alt="teletubbies" style={{ width: '400px', }}/>
                    <div style={{ paddingLeft: '0' , paddingTop: '20px' }}>
                        <img src={bebrudarba} alt="bebrudarba" style={{ width: '400px', }}/>
                    </div>
                </div>

            </>
        );
    };

    return <AccountSummary />;
};

export default Home;
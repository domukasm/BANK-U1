import { useContext, useEffect } from 'react';
import { Global } from '../Global'

const AccountSummary = () => {
    const {accounts} = useContext(Global)
    const totalMoney = accounts.reduce(
        (total, current) => total + current.balance,
        0
    );

    return (
        <div>
            <h1 className="header">
                Bitutės bankas
            </h1>
            <div className="info">
                    Iš viso paskyrų:
                    <span>
                        {accounts.length}
                    </span>
                    Iš viso pinigų:
                    <span>
                    €{totalMoney.toFixed(2)}
                    </span>
            </div>
            </div>
    );
};
export default AccountSummary;
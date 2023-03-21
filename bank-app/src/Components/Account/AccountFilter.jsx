const AccountFilter = ({ filterHandler }) => {
    return (
       <div>
            <select
                name='account'
                onChange={filterHandler}
                className='box'
            >
                <option value='All'>Visi</option>
                <option value='withMoney'>Bajorai Turtingi</option>
                <option value='noMoney'>Vargsai Be Bapkiu</option>
            </select>
        </div>
    );
};

export default AccountFilter;
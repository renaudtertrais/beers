import React, { useEffect, useState, useMemo } from 'react';
import { Layout, Input, Switch } from 'antd';
import 'antd/dist/antd.css';

import BeersTable from './BeersTable';
import './index.css';

const { Header, Footer } = Layout;

function App() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [abvGreaterThan7, toggleAbvGreaterThan7] = useState(false);

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers?malt=extra_pale')
      .then(res => res.json())
      .then(setBeers)
      .then(() => setLoading(false));
  }, []);

  const beersFiltered = useMemo(
    () =>
      beers
        .filter(({ name }) => !search || name.toLowerCase().includes(search.toLowerCase()))
        .filter(({ abv }) => !abvGreaterThan7 || abv > 7),
    [beers, search, abvGreaterThan7]
  );

  return (
    <div className="App">
      <Header className="App__header">
        <div className="App__logo">{beersFiltered.length} Beers</div>
        <Input
          className="App__search"
          size="large"
          placeholder="Search a beer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="search"
        />
      </Header>
      <div className="App__main">
        <div className="App__abv-switch">
          <Switch value={abvGreaterThan7} onChange={x => toggleAbvGreaterThan7(x)} />
          <span className="App__abv-switch-label ">Show only beer with more than 7% of ABV</span>
        </div>
        <BeersTable beers={beersFiltered} loading={loading} />
        <Footer className="App__footer">Renaud Tertrais ©2019</Footer>
      </div>
    </div>
  );
}

export default App;

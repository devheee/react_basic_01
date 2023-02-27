import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// 1. api : db가 있음
// 2. db에서 data 가져옴 , useEffect 데이터 가져올때 react 
// 3. 가져온 데이터를 react로 뿌려줌

const UL = styled.ul`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
list-style: none;
margin: 0;
padding: 10px;
img {
  max-width: 100%;
}

@media (max-width:768px) {
  grid-template-columns: repeat(2, 1fr);
  font-size: 15px;
}
`

const H1 = styled.h1`
text-align: center;
`

const SEARCH = styled.div`
text-align: center;
padding: 20px;
`
function App() {

  const [pic, setPic] = useState([]);
  const [search, setSearch] = useState('water');
  const getData = async () => {
    const data = await fetch(`https://pixabay.com/api/?key=21103852-9b5f4834542caaf4eef2c8533&q=${search}&image_type=photo`).then(r => r.json());
    console.log(data, data.hits[0].id);
    setPic(data.hits);
  }

  useEffect(() => {
    getData();
  }, [search])


  return (
    <>
      <H1>sohee PIC : 이미지 개당 100,000원</H1>
      <SEARCH>search : <input onChange={(e) => setSearch(e.target.value)} value={search} /></SEARCH>
      <UL>
        {
          pic.map(it => {
            return (
              <li key={it.id}>
                <img src={it.largeImageURL} />
                <div>{it.id}</div>
                <div>{it.tags}</div>
              </li>)
          }
          )
        }
      </UL>
    </>
  );
}

export default App;

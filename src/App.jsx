import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "../components/SearchResult";

export const BASE_URL = "http://localhost:9000";
export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const FilterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  useEffect(() => {
    async function fetchFoodData() {
      try {
        setIsLoading(true);

        const res = await fetch(BASE_URL);
        if (!res.ok) throw Error("Unable to fetch data!");
        const data = await res.json();
        setData(data);
        setFilteredData(data); // Setting initial filteredData to all data

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchFoodData();
  }, []);
  // console.log(data);

  // Function for Filtering Food According to btn selected ...
  const handleFilterFood = (filterType) => {
    setSelectedBtn(filterType);
    if (filterType === "all") {
      setFilteredData(data);
    } else {
      const filter = data.filter((food) => food.type === filterType);
      setFilteredData(filter);
    }
  };

  // Function For Searching Food Through Search input :
  const handleSearchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <TopContainer>
        <Navbar>
          <img src="./logo.svg" alt="logo" />

          <input
            type="search"
            placeholder="Search Food ..."
            onChange={handleSearchFood}
          />
        </Navbar>
        <FilterContainer>
          {FilterBtns.map((btn) => (
            <Button
              key={btn.name}
              onClick={() => handleFilterFood(btn.type)}
              isSelected={selectedBtn === btn.type}
            >
              {btn.name}
            </Button>
          ))}
        </FilterContainer>
      </TopContainer>
      <SearchResult data={filteredData} />
    </>
  );
}

// ------------------------
const TopContainer = styled.section`
  background-color: #323334;
`;
const Navbar = styled.nav`
  height: 140px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* border: 2px solid green; */
  align-items: center;
  padding: 16px;

  img {
    height: 35px;
  }

  input {
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder {
      color: white;
    }
  }
  input:focus {
    color: #fff;
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 140px;
  }
`;
// const Logo = styled.div``;
const FilterContainer = styled.div`
  /* border: 2px solid purple; */
  width: fit-content;
  display: flex;
  gap: 0.6rem;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

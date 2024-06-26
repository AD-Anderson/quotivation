import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import Message from "./components/Message";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Quotes from "./components/quotes/Quotes";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const maxFaves = 3;
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  const categories = [
    "All",
    "Leadership",
    "Empathy",
    "Motivation",
    "Learning",
    "Success",
    "Empowerment",
  ];

  // load favorites to local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteQuotes");
    if (savedFavorites) {
      setFavoriteQuotes(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorite quotes to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(quotesUrl);
      const results = await response.json();
      setQuotes(results);
    } catch (error) {
      console.log("There was an error!", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredQuotes =
    category !== "All"
      ? quotes.filter((quote) => quote.categories.includes(category))
      : quotes;

  const addToFavorites = (quoteID) => {
    const selectedQuote = quotes.find((quote) => quote.id === quoteID);

    const alreadyFavorite = favoriteQuotes.find(
      (favorite) => favorite.id === selectedQuote.id
    );

    if (alreadyFavorite) {
      setMessageText("You already favorited this quote!");
      setShowMessage(true);
    } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      setMessageText("Added to Favorites!");
      setShowMessage(true);
    } else {
      setMessageText(
        "Max number of quotes reached. Please delete one to add a new one."
      );
      setShowMessage(true);
    }
  };

  const removeMessage = () => {
    setShowMessage(false);
  };

  const removeFromFavorites = (quoteID) => {
    const updatedFavorites = favoriteQuotes.filter(
      (quote) => quote.id !== quoteID
    );

    setFavoriteQuotes(updatedFavorites);
    localStorage.setItem("favoriteQuotes", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="App">
      <Header />
      {showMessage && (
        <Message messageText={messageText} removeMessage={removeMessage} />
      )}

      <main>
        <FavoriteQuotes
          favoriteQuotes={favoriteQuotes}
          maxFaves={maxFaves}
          removeFromFavorites={removeFromFavorites}
        />
        {loading ? (
          <Loader />
        ) : (
          <Quotes
            filteredQuotes={filteredQuotes}
            categories={categories}
            category={category}
            handleCategoryChange={handleCategoryChange}
            addToFavorites={addToFavorites}
            favoriteQuotes={favoriteQuotes}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;

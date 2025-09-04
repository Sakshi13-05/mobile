import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleClear = () => setQuery("");

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      background: focused ? "white" : "#f5f5f5",
      borderRadius: "24px",
      padding: "8px 16px",
      border: `1px solid ${focused ? "#6200ee" : "#ddd"}`,
      maxWidth: "500px",
      margin: "0 auto",
      boxShadow: focused ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.3s ease",
    },
    icon: {
      marginRight: "8px",
      color: "#666",
      display: "flex",
      alignItems: "center",
    },
    input: {
      flex: 1,
      border: "none",
      background: "transparent",
      padding: "8px 0",
      fontSize: "16px",
      outline: "none",
    },
    clearBtn: {
      background: "none",
      border: "none",
      padding: "4px",
      cursor: "pointer",
      color: "#666",
      marginLeft: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Search Icon */}
      <div style={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </svg>
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.input}
        placeholder="Search..."
      />

      {/* Clear Button */}
      {query && (
        <button onClick={handleClear} style={styles.clearBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;

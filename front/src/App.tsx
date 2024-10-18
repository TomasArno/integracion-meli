import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/sales?pass=1");
      const { data } = await response.json();

      const orders = [];

      for (const order of data) {
        for (const product of order.productData) {
          orders.push({ id: order.orderId, ...product });
        }
      }

      setProducts(orders);
    }

    fetchData();
  }, []);

  const styles = {
    container: {
      width: "100%",
      backgroundColor: "#FFF9E5",
      fontFamily: "Arial, sans-serif",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      backgroundColor: "#FFD600",
      padding: "10px",
      textAlign: "center",
      color: "#333",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    searchContainer: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    searchInput: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      flex: "1",
      marginRight: "10px",
    },
    searchButton: {
      backgroundColor: "#FFC107",
      color: "#333",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    searchButtonHover: {
      backgroundColor: "#FFB300",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#FFD600",
      color: "black",
      padding: "10px",
      border: "1px solid #ccc",
    },
    td: {
      padding: "10px",
      color: "black",
      border: "1px solid #ccc",
      textAlign: "center",
    },
    "@media (max-width: 600px)": {
      searchInput: {
        fontSize: "14px",
      },
      searchButton: {
        fontSize: "14px",
      },
      th: {
        fontSize: "14px",
      },
      td: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Mis Ventas</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button
          style={styles.searchButton}
          onClick={() => alert(`Buscando: ${searchTerm}`)}
        >
          Buscar
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nro Venta</th>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Cantidad</th>
            <th style={styles.th}>Precio X U.</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.title}</td>
              <td style={styles.td}>{order.quantity}</td>
              <td style={styles.td}>${order.unitPrice}</td>
              <td style={styles.td}>${order.total}</td>
              <td style={styles.td}>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

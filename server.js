
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 89,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 29,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300"
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        price: 79,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300"
    }
];

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/orders", (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const orderId = Math.floor(100000 + Math.random() * 900000);

    res.status(201).json({
        message: "Order placed successfully",
        orderId,
        total
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

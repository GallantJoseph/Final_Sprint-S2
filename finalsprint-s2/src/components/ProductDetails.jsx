import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
	const genericImageUrl = "../src/assets/board-453758_640.jpg";

	// Get the productId from the url passed as a parameter
	const { productId } = useParams();
	const [productData, setProductData] = useState([]);
	const [cart, setCart] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:5000/products/${productId}`);

				if (response.status === 404) {
					throw new Error("Invalid productID input.");
				} else {
					const products = await response.json();
					setProductData(products);
				}
			} catch (error) {
				console.log(error);
				setProductData([]);
			}

			const cartRes = await fetch("http://localhost:5000/cart");
			const cartDat = await cartRes.json();
			setCart(cartDat);
		};

		fetchData();
	}, []);

	async function fetchItem(id) {
		const res = await fetch(`http://localhost:5000/cart/${id}`);
		const dat = await res.json();
		return dat;
	}

	async function handleAddToCart(productId) {
		let found = false;
		for (const element of cart) {
			if (element.id === productId) {
				found = true;
			}
		}

		if (found) {
			const recarted = await fetchItem(productId);
			const foundResp = await fetch(`http://localhost:5000/cart/${productId}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ ...recarted, quantity: recarted.quantity + 1 }),
			});

			setCart(cart.map((item) => (item.id === productId ? { ...recarted, quantity: recarted.quantity + 1 } : item)));
		} else {
			const resp = await fetch("http://localhost:5000/cart", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ id: productId, quantity: 1 }),
			});

			const data = await resp.json();

			setCart([...cart, data]);
		}
	}

	return (
		<div className="product">
			<button onClick={() => navigate(-1)}>Back</button>
			<h3>{productData.name}</h3>
			<p className="description">{productData.description}</p>
			<img src={productData.image !== "" ? productData.image : genericImageUrl} width={"200"} />
			<p>Quantity on hand: {productData.quantity_on_hand}</p>
			<button onClick={() => handleAddToCart(productId)}>Add to Cart</button>
		</div>
	);
};
export default ProductDetails;

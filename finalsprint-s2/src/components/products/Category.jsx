import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";

function Category({ type }) {
	const [filtData, setFiltData] = useState([]);
	// Track which products are added to the cart by their IDs
	const [addedToCartIds, setAddedToCartIds] = useState([]);
	const [cartContents, setCartContents] = useState([]);

	useEffect(() => {
		async function getData() {
			// fetch product data from json server
			const prodRes = await fetch("http://localhost:5000/products");
			const prodData = await prodRes.json();

			// if passed type is "all", do not filter the data, otherwise only set data with
			// the same type as the type passed into the component
			if (type === "all") {
				setFiltData(prodData);
			} else {
				setFiltData(prodData.filter((element) => element.category === type));
			}

			// fetch cart data from json server
			const cartRes = await fetch("http://localhost:5000/cart");
			const cartDat = await cartRes.json();

			setCartContents(cartDat);
		}

		getData();
	}, [type]); // gets called whenever type is updated (a.k.a, when a button is pressed)

	async function fetchCartItem(id) {
		const res = await fetch(`http://localhost:5000/cart/${id}`);
		const dat = await res.json();
		return dat;
	}

	const handleAddToCart = async (id) => {
		// Add the product ID to the addedToCartIds state if it's not already in the list
		if (!addedToCartIds.includes(id)) {
			setAddedToCartIds([...addedToCartIds, id]);
			console.log(`Product ${id} added to cart`);
		}

		const res = await fetch("http://localhost:5000/cart");
		const data = await res.json();

		let idExists = false;

		for (const element of data) {
			if (element.id === id) {
				idExists = true;
			}
		}

		if (idExists) {
			const recarted = await fetchCartItem(id);
			const foundResp = await fetch(`http://localhost:5000/cart/${id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ ...recarted, quantity: recarted.quantity + 1 }),
			});

			setCartContents(cartContents.map((item) => (item.id === id ? { ...recarted, quantity: recarted.quantity + 1 } : item)));
		} else {
			const resp = await fetch("http://localhost:5000/cart", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ id: id, quantity: 1 }),
			});

			const data = await resp.json();

			setCartContents([...cartContents, data]);
		}
	};

	// Render the "Add to Cart" button or the checkmark based on if it's in the cart
	const renderAddToCartButton = (obj) => {
		if (obj.quantity_on_hand === 0) {
			return (
				<button className="addtocartdisabledbtn" disabled={true}>
					X
				</button>
			);
		} else if (addedToCartIds.includes(obj.id)) {
			return (
				<button className="addtocartbtn added" disabled>
					✔️ Added
				</button>
			);
		} else {
			return (
				<button className="addtocartbtn" onClick={() => handleAddToCart(obj.id)}>
					Add to Cart
				</button>
			);
		}
	};

	if (type !== "all") {
		return (
			<>
				<h2 className="categorytitle">{type.toUpperCase()}</h2>
				{filtData.map((obj) => (
					<div key={obj.id} className="productcard">
						<img className="productimage" src={obj.image} alt={obj.name} />
						<div className="productinfo">
							<h3 className="productname">{obj.name}</h3>
							<p className="productdescription">{obj.description}</p>
							<p className="productprice">${obj.price.toFixed(2)}</p>
							<p>{obj.quantity_on_hand === 0 ? <span className="outofstock">Out of Stock</span> : <span className="instock">Available</span>}</p>
							<Link to={`/ProductDetails/${obj.id}`}>Product Details</Link>
							{renderAddToCartButton(obj)} {/* Render button or checkmark */}
						</div>
					</div>
				))}
			</>
		);
	}

	// For "all" categories
	const categories = [...new Set(filtData.map((item) => item.category))];

	return (
		<>
			{categories.map((cat) => (
				<div key={cat}>
					<h2 className="categorytitle">{cat.toUpperCase()}</h2>
					{filtData
						.filter((item) => item.category === cat)
						.map((obj) => (
							<div key={obj.id} className="productcard">
								<img className="productimage" src={obj.image} alt={obj.name} />
								<div className="productinfo">
									<h3 className="productname">{obj.name}</h3>
									<p className="productdescription">{obj.description}</p>
									<p className="productprice">${obj.price.toFixed(2)}</p>
									<p>{obj.quantity_on_hand === 0 ? <span className="outofstock">Out of Stock</span> : <span className="instock">Available</span>}</p>
									<Link to={`/ProductDetails/${obj.id}`}>Product Details</Link>
									{renderAddToCartButton(obj)} {/* Render button or checkmark */}
								</div>
							</div>
						))}
				</div>
			))}
		</>
	);
}

export default Category;

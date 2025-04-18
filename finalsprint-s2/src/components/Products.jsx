import "./Products.css";
import { useState, useEffect } from "react";
import Category from "./products/Category";

function Products() {
	const [selected, setSelected] = useState(7); // default selection to "all"
	const [display, setDisplay] = useState(<Category type="all" />); // default display will show all components

	function handleClick(btnID) {
		const dict = [
			// translate an integer to a string to be used in the category component
			"cpu",
			"motherboard",
			"psu",
			"storage",
			"case",
			"ram",
			"gpu",
			"all",
		];
		setSelected(btnID);
		setDisplay(<Category type={dict[btnID]} />);
	}

	return (
		<>
			<div className="productcategories">
				<h2>Select a category</h2>
				<div className="checkboxes">
					{/*/ 
            onClick passes an "id" to handleClick which changes the selected button and the display
            if the button's "id" and the selected button int matches, set a 2px orange border around it
          /*/}

					<button className="category" onClick={() => handleClick(0)} style={selected == 0 ? { border: "2px solid orange" } : {}}>
						CPU
					</button>
					<button className="category" onClick={() => handleClick(1)} style={selected == 1 ? { border: "2px solid orange" } : {}}>
						Motherboard
					</button>
					<button className="category" onClick={() => handleClick(2)} style={selected == 2 ? { border: "2px solid orange" } : {}}>
						PSU
					</button>
					<button className="category" onClick={() => handleClick(3)} style={selected == 3 ? { border: "2px solid orange" } : {}}>
						Storage
					</button>
					<button className="category" onClick={() => handleClick(4)} style={selected == 4 ? { border: "2px solid orange" } : {}}>
						Case
					</button>
					<button className="category" onClick={() => handleClick(5)} style={selected == 5 ? { border: "2px solid orange" } : {}}>
						RAM
					</button>
					<button className="category" onClick={() => handleClick(6)} style={selected == 6 ? { border: "2px solid orange" } : {}}>
						GPU
					</button>
					<button className="category" onClick={() => handleClick(7)} style={selected == 7 ? { border: "2px solid orange" } : {}}>
						<b>Show All</b>
					</button>
				</div>
			</div>
			{display} {/*/ render whatever is in the display /*/}
		</>
	);
}
export default Products;

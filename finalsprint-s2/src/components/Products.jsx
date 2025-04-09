import "./Products.css";

function Products() {
	return (
		<div className="productcategories">
			<h2>Select a category</h2>
			<div className="checkboxes">
				<div>
					<label htmlFor="cpu">CPU</label>
					<input type="checkbox" id="cpu" name="cpu" />
				</div>

				<div>
					<label htmlFor="motherboard">Motherboard</label>
					<input type="checkbox" id="motherboard" name="motherboard" />
				</div>

				<div>
					<label htmlFor="psu">PSU</label>
					<input type="checkbox" id="psu" name="psu" />
				</div>

				<div>
					<label htmlFor="storage">Storage</label>
					<input type="checkbox" id="storage" name="storage" />
				</div>

				<div>
					<label htmlFor="case">Case</label>
					<input type="checkbox" id="case" name="case" />
				</div>

				<div>
					<label htmlFor="ram">RAM</label>
					<input type="checkbox" id="ram" name="ram" />
				</div>

				<div>
					<label htmlFor="gpu">GPU</label>
					<input type="checkbox" id="gpu" name="gpu" />
				</div>
			</div>
		</div>
	);
}
export default Products;

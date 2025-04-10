import { useState, useEffect } from "react";

function Category({ type }) {
  const [filtData, setFiltData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();

      if (type === "all") {
        setFiltData(data);
      } else {
        setFiltData(
          data.filter((element) => {
            return element.category == type;
          })
        );
      }
    }

    getData();
  }, [type]);

  console.log(filtData);
  return filtData.map((obj) => (
    /*/ 
			Anything here can be changed for better formatting
			i just used a ul to get the data on screen
		/*/

    <ul key={obj.id}>
      <li>{obj.name}</li>
      <li>{obj.description}</li>
      <li>{obj.price.toFixed(2)}</li>
      {/*/ <li><img src={obj.image} /></li> <-- uncomment when ready to format images /*/}
    </ul>
  ));
}
export default Category;

import { useEffect, useState } from "react";
import PCBuilderCategory from "./pcbuilder/PCBuilderCategory";
import "./PCBuilder.css";

const PCBuilder = () => {
  const [productData, setProductData] = useState(null);
  const [pcBuildData, setPcBuildData] = useState(null);
  const [psuSelected, setPsuSelected] = useState(false);
  const [caseSelected, setCaseSelected] = useState(false);
  const [motherboardSelected, setMotherboardSelected] = useState(false);
  const [cpuSelected, setCpuSelected] = useState(false);
  const [ramSelected, setRamSelected] = useState(false);
  const [storageSelected, setStorageSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();

      setProductData(products);
    };

    fetchData();
  }, []);

  const updateBuild = async (id) => {
    // const response = await fetch("http://localhost:5000/pcbuild", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: `{
    //   "category": "gpu",
    //   "id": "1",
    //   "quantity": 1}`,
    // });
    // const pcBuild = await response.json();
    // console.log(pcBuild);
  };

  updateBuild(1);

  return (
    <section id="pcbuilder-section">
      <h1>PC Builder</h1>
      <PCBuilderCategory
        title="Power Supply"
        category="psu"
        data={productData}
        onClick={() => setPsuSelected(true)}
      />
      {psuSelected && (
        <>
          <PCBuilderCategory
            title="Case"
            category="case"
            data={productData}
            onClick={() => setCaseSelected(true)}
          />
          {caseSelected && (
            <>
              <PCBuilderCategory
                title="Motherboard"
                category="motherboard"
                data={productData}
                onClick={() => setMotherboardSelected(true)}
              />
              {motherboardSelected && (
                <>
                  <PCBuilderCategory
                    title="Processor"
                    category="cpu"
                    data={productData}
                    onClick={() => setCpuSelected(true)}
                  />
                  {cpuSelected && (
                    <>
                      <PCBuilderCategory
                        title="Memory"
                        category="ram"
                        data={productData}
                        onClick={() => setRamSelected(true)}
                      />
                      {ramSelected && (
                        <PCBuilderCategory
                          title="Storage"
                          category="storage"
                          data={productData}
                          onClick={() => setStorageSelected(true)}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      <footer>
        <p>© 2025 Codebrew PC Building Inc. All rights reserved.</p>
      </footer>
    </section>
  );
};
export default PCBuilder;

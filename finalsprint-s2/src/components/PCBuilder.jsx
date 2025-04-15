import { useContext, useEffect, useState } from "react";
import PCBuilderCategory from "./pcbuilder/PCBuilderCategory";
import { PCBuildContext } from "../context/PCBuild";
import "./PCBuilder.css";

const PCBuilder = () => {
  const [productsData, setProductsData] = useState(null);
  const [psuSelected, setPsuSelected] = useState(false);
  const [caseSelected, setCaseSelected] = useState(false);
  const [motherboardSelected, setMotherboardSelected] = useState(false);
  const [cpuSelected, setCpuSelected] = useState(false);
  const [gpuSelected, setGpuSelected] = useState(false);
  const [ramSelected, setRamSelected] = useState(false);
  const [storageSelected, setStorageSelected] = useState(false);

  // Context that stores the current PC Build data.
  const pcBuildContext = useContext(PCBuildContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();

      setProductsData(products);
    };

    fetchData();
  }, []);

  const updateBuild = async (id, category) => {
    let componentCatExists = false;

    // Check if a component from the same category already exists
    for (const element of pcBuildContext.buildItems) {
      if (element.category === category) {
        componentCatExists = true;
      }
    }

    if (componentCatExists) {
      // Update the existing one only
      pcBuildContext.setBuildItems(
        pcBuildContext.buildItems.map((buildItem) => {
          if (buildItem.category === category) {
            buildItem.id = id;
            return buildItem;
          } else {
            return buildItem;
          }
        })
      );
    } else {
      // Add the new component
      pcBuildContext.setBuildItems([
        ...pcBuildContext.buildItems,
        { category: category, id: id },
      ]);
    }

    // if (idExists) {
    //   pcBuildContext.setBuildItems(
    //     pcBuildContext.buildItems.map((buildItem) => {
    //       if (buildItem.category === category) {
    //         buildItem.id = id;
    //       }
    //     })
    //   );
    // } else {
    //   pcBuildContext.setBuildItems([
    //     ...pcBuildContext.buildItems,
    //     { category: category, id: id },
    //   ]);
    // }

    // Update PC Build
    // const buildItem = (
    //   await fetch(`http://localhost:5000/pcbuild?category=${category}`)
    // ).json();
    // const updItem = { ...buildItem, id: id };
    // console.log(JSON.stringify(updItem));
    // const res = await fetch(
    //   `http://localhost:5000/pcbuild?category=${category}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(updItem),
    //   }
    // );
  };

  const clearPcBuild = async () => {
    const response = await fetch("http://localhost:5000/pcbuild");

    const pcBuild = await response.json();

    pcBuild.forEach(async (item) => {
      await fetch(`http://localhost:5000/pcbuild/${item.id}`, {
        method: "DELETE",
      });
    });
  };

  const submitBuild = async (evt) => {
    // await clearPcBuild();
    // await updateBuild();
    // evt.preventDefault();
    console.log(pcBuildContext.buildItems);
    alert("Submitted!");
  };

  return (
    <section id="pcbuilder-section">
      <div className="product-header">
        <h1>Codebrew PC Builder</h1>
        <p>
          Our advanced PC Builder will guide you step-by-step through the
          building process.
        </p>
      </div>
      <PCBuilderCategory
        title="Power Supply"
        category="psu"
        data={productsData}
        onClick={(product) => {
          setPsuSelected(true);
          updateBuild(product.id, product.category);
        }}
      />
      {psuSelected && (
        <>
          <PCBuilderCategory
            title="Case"
            category="case"
            data={productsData}
            onClick={(product) => {
              setCaseSelected(true);
              updateBuild(product.id, product.category);
            }}
          />
          {caseSelected && (
            <>
              <PCBuilderCategory
                title="Motherboard"
                category="motherboard"
                data={productsData}
                onClick={(product) => {
                  setMotherboardSelected(true);
                  updateBuild(product.id, product.category);
                }}
              />
              {motherboardSelected && (
                <>
                  <PCBuilderCategory
                    title="Processor"
                    category="cpu"
                    data={productsData}
                    onClick={(product) => {
                      setCpuSelected(true);
                      updateBuild(product.id, product.category);
                    }}
                  />
                  {cpuSelected && (
                    <>
                      <PCBuilderCategory
                        title="Graphics Card"
                        category="gpu"
                        data={productsData}
                        onClick={(product) => {
                          setGpuSelected(true);
                          updateBuild(product.id, product.category);
                        }}
                      />
                      {gpuSelected && (
                        <>
                          <PCBuilderCategory
                            title="Memory"
                            category="ram"
                            data={productsData}
                            onClick={(product) => {
                              setRamSelected(true);
                              updateBuild(product.id, product.category);
                            }}
                          />
                          {ramSelected && (
                            <>
                              <PCBuilderCategory
                                title="Storage"
                                category="storage"
                                data={productsData}
                                onClick={(product) => {
                                  setStorageSelected(true);
                                  updateBuild(product.id, product.category);
                                }}
                              />
                              {storageSelected && (
                                <>
                                  <div className="product-submit">
                                    <h3>You're almost done!</h3>
                                    <p>
                                      You have selected all the necessary
                                      components for your build. Click the
                                      Submit Build button once you're satisfied
                                      with your selection.
                                    </p>
                                    <button
                                      className="submitbtn"
                                      onClick={(evt) => {
                                        submitBuild(evt);
                                      }}
                                    >
                                      Submit Build
                                    </button>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
export default PCBuilder;

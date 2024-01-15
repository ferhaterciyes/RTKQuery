// MainPage.jsx
import React, { useState } from "react";
import { useGetProductsQuery } from "../app/query";
import Cart from "../components/Cart";
import Category from "../components/Category";
import Loader from "../components/Loader";

const MainPage = () => {
  const { data, isError, isLoading } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Kategori bilgilerini al
  const categories = data
    ?.filter(
      (product, index, self) =>
        self.findIndex ((p) => p.category === product.category) === index
    )
    .map((product) => ({
      categoryName: product.category,
      categoryImg: product.image,
    }));

  // Seçili kategoriye göre filtreleme
  const filteredProducts = data?.filter(
    (product) => selectedCategory === null || product.category === selectedCategory
  );


  return (
    <div>
      {/* yükleniyorsa */}
      {isLoading && <Loader />}

      {isError && <p>Üzgünüz, verileri alırken bir hata oluştu...</p>}

      {/* veriler geldiyse */}
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
        {/* Tüm kategorileri gör butonu */}
        <div className="col">
     
            <div className="card-footer text-center">
              <button onClick={() => setSelectedCategory(null)} href="#product" className="btn btn-danger mt-4 ">
                Tüm Ürünleri Gör
              </button>
          </div>
        </div>

      <div id="product" className="d-flex flex-wrap gap-4 p-5 justify-content-around">
        {filteredProducts?.map((product) => (
          <Cart key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

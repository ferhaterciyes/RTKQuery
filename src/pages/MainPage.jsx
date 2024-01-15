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
        self.findIndex((p) => p.category === product.category) === index,
    )
    .map((product) => ({
      categoryName: product.category,
      categoryImg: product.image,
    }));

  // Seçili kategoriye göre filtreleme
  const filteredProducts = data?.filter(
    (product) =>
      selectedCategory === null || product.category === selectedCategory,
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

      {/* Tüm ürünleri gör butonu */}
      <div
        style={{ zIndex: 1111 }}
        className="position-fixed top-0 end-0 m-4 pt-5 "
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className="btn btn-danger"
        >
          Tüm Ürünleri Gör
        </button>
      </div>

      <div className="d-flex flex-wrap gap-4 p-5 justify-content-around">
        {filteredProducts?.map((product) => (
          <Cart key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

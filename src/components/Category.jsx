import React from "react";

const Category = ({ categories, setSelectedCategory, showAllCategories ,selectedCategory }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ürün Kategorileri</h2>

      <div className="row row-cols-1 row-cols-md-4 g-4 border p-4 mt-3">
        {categories?.map((category, index) => (
          <div key={index} className="col">
            <div className={`card h-100 ${selectedCategory === category.categoryName ? 'border-primary' : ''}`}>
              <img
                src={category.categoryImg}
                className="card-img-top p-1"
                alt={category.categoryName}
                style={{ objectFit: 'contain', height: '150px' }}
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  onClick={() => setSelectedCategory(category.categoryName)}
                >
                  {category.categoryName}
                </h5>
                <p className="card-text">
                  Bu kategori ile ilgili harika ürünleri keşfedin.
                </p>
              </div>
              <div className="card-footer text-center">
                <a
                  onClick={() => setSelectedCategory(category.categoryName)}
                  href="#product"
                  className="btn btn-primary"
                >
                  İlgili Ürünleri Gör
                </a>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Category;

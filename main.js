const fetchData = async () => {
  try {
    const response = await fetch("./data/ProductsData.json");
    return response.json();
  } catch (e) {
    console.log("Something went wrong!", e);
  }
};

$(document).ready(async () => {
  try {
    const data = await fetchData();
    const productList = data.results.products;
    let content = "";

    for (let product in productList) {
      let {
        averageRating,
        code,
        name,
        images,
        price,
        priceWithDiscount,
        showAddToCartFlag,
        wishListContains,
      } = productList[product];
      let discount = parseInt(
        100 - (100 * priceWithDiscount.value) / price.value
      );
        console.log(productList[product])
      content += `<div class='product'>
      <div class='product-wrapper' id='product-${code}'>
        <div class='product-fav'>${
          wishListContains === true
            ? `<img src='heart-icon.png' alt='fav'/>`
            : `<img src='heart-empty.png' alt='fav' />`
        }</div>
        <div class='product-image'>
          <img src='${images[1].url}' alt='${name}' />
        </div>
        <div class='product-info'>
          <div class="product-title">${name}</div>
          <div class="product-price">
          ${
            discount > 0
              ? `<div class='product-price__discount'>%${discount}</div>
                <div class='product-price__info'>
                  <div class='product-price__info--unit'><del>${price.formattedValue}</del></div>
                  <div class='product-price__info--discounted'>${priceWithDiscount.formattedValue}</div>
                </div>
                  `
              : `<div class='product-price__info--unit'>${price.formattedValue}</div>`
          }
          </div>
          <div class="product-badge"><img src='check-icon.png' alt='icon' />Kargo Bedava</div>
        </div>
        
        <div class='product-btn'>
          <input type='hidden' id='productCode' value='${code}'>
          <button type='button' onclick="openModal(this);" class='product-btn__addToCart'>Sepete Ekle</button>
        </div>
        </div>
      </div>`;
    }
    $(".products").html(content);

    $("#form").submit((event) => {
      event.preventDefault();
      $("#product-" + $("#form #productCode").val()).addClass("submitted");
      $("#product-" + $("#form #productCode").val())
        .find(".product-btn__addToCart")
        .addClass("showBtn");
      $("#formModal").modal("hide");
    });
  } catch (e) {
    console.log("Error", e);
  }
});
$(document).ready(() => {
  $(":input").inputmask();

  $("#phone").inputmask({ mask: "(999) 999-9999" });
});

const openModal = (btn) => {
  $("#formModal").modal("show");
  $(".modal-backdrop").css("background-color", "rgb(0 0 0 / 58%)");
  let productCode = $(btn).prev().val();
  $("#form #productCode").val(productCode);

  $("#form input").each((el) => {
    $(el).val("");
  });
};

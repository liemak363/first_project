// button-status
const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href;
        })
    })
}
// button-status end


// Form Search
const formSearch = document.querySelector("#form-search");

if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();

        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        
        window.location.href = url.href;
    })
}
// End Form Search


// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href);

    buttonPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            if (page) {
                url.searchParams.set("page", page)
            } else {
                url.searchParams.delete("page")
            }

            window.location.href = url.href;
        })
    })
}
// End Pagination

// Checkbox products
const tableProducts = document.querySelector("[table-products]");
if (tableProducts) {
    const inputCheckAll = tableProducts.querySelector("input[name='checkall']");
    const inputCheckIdArr = tableProducts.querySelectorAll("input[name='id']")

    if (inputCheckIdArr.length) {
        inputCheckAll.addEventListener("click", () => {
            if (inputCheckAll.checked) {
                inputCheckIdArr.forEach((inputCheckId) => {
                    inputCheckId.checked = true;
                })
            } else {
                inputCheckIdArr.forEach((inputCheckId) => {
                    inputCheckId.checked = false;
                })
            }
        })
        
        inputCheckIdArr.forEach((inputCheckId) => {
            inputCheckId.addEventListener("click", () => {
                const countChecked = tableProducts.querySelectorAll("input[name='id']:checked").length;
                if (countChecked == inputCheckIdArr.length) {
                    inputCheckAll.checked = true;
                } else {
                    inputCheckAll.checked = false;
                }
            })
        });
    }  
}
// End Checkbox products

// Form change status multi
const formChangeMulti = document.querySelector("[form-change-multi]");

formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const productCheckedArr = tableProducts.querySelectorAll("input[name='id']:checked");

    if (productCheckedArr.length) {
        const typeChange = e.target.elements.type.value;
        if (typeChange == "soft-delete") {
            const confirm = window.confirm("Bạn có muốn xóa những sản phẩm được chọn ?")
            if (!confirm) return;
        }

        const inputIds = formChangeMulti.querySelector("input[name='ids']");
    
        let productCheckedIds = [];
        productCheckedArr.forEach((product) => {
            productCheckedIds.push(product.value);
        })
        inputIds.value = productCheckedIds.join(", ");

        formChangeMulti.submit();
    }
});
// End Form change status multi
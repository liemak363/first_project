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
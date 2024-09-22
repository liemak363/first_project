// Change product status 
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const newStatus = currentStatus == "active" ? "inactive" : "active";

            const id = button.getAttribute("data-id");

            const path = formChangeStatus.getAttribute("data-path");

            formChangeStatus.setAttribute("action", path + `${newStatus}/${id}?_method=PATCH`)

            formChangeStatus.submit()
        })
    })
}
// End Change product status

// Permanent delete product
const buttonDeletePer = document.querySelectorAll("[button-permanent-delete]")

if (buttonDeletePer.length > 0) {
    const formDeletePer = document.querySelector("#form-permanent-delete")

    buttonDeletePer.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");

            const path = formDeletePer.getAttribute("data-path");

            formDeletePer.setAttribute("action", path + `${id}?_method=DELETE`)

            formDeletePer.submit()
        })
    })
}
// End Permanent delete product
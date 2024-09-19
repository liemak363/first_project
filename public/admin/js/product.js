const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const newStatus = currentStatus == "active" ? "inactive" : "active";

            const id = button.getAttribute("data-id");

            const path = formChangeStatus.getAttribute("data-path");

            formChangeStatus.setAttribute("action", path + `${newStatus}/${id}`)

            formChangeStatus.submit()
        })
    })
}
// console.log(buttonChangeStatus)
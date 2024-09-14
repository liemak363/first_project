module.exports.dashboard = (req, res) => {
    res.render("./client/pages/home/index.pug", {
        pagaTitle: "home"
    });
};
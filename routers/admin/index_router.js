const dashboardRouter = require("./dashboard_router.js")

module.exports = (app) => {
    app.use('/admin/dashboard', dashboardRouter);
}
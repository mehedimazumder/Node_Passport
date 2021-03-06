module.exports = {
    esnureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resurce');
        res.redirect('/users/login');
    }
}
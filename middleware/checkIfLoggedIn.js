const checkIfLoggedIn = (req, res, next) => {

    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();

    // if(req.session.currentUser){
    //     next();
    // } else {
    //     res.redirect("/login");
    // }
};



module.exports = checkIfLoggedIn;
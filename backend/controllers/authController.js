exports.isAuthenticatedAsUser = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    } else if (!req.session.authenticated) {
        return res.status(401).json({ error: "Unauthorized" })
    }
};

exports.isAuthenticatedAsClient = (req, res, next) => {
    if (req.session.authenticated && req.session.user.role === 'client') {
        return next();
    } else if (req.session.authenticated) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    res.redirect('/login');
};

exports.isAuthenticatedAsLawyer = (req, res, next) => {
    if (req.session.authenticated && req.session.user.role === 'lawyer') {
        return next();
    } else if (req.session.authenticated) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    res.redirect('/login');
};

exports.isAuthenticatedAsAdmin = (req, res, next) => {
    if (req.session.authenticated && req.session.user.role === 'admin') {
        return next();
    } else if (req.session.authenticated) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.redirect('/login');
};


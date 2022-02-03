module.exports = function (req, res, next) {
    const { email, name, password } = req.body

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    }

    if (req.path === "/api/auth/register") {
        if (![email, name, password].every(Boolean)) return res.json("Missing Credentials")
        else if (!validEmail(email)) return res.json("Invalid Email")

    } else if (req.path === "/api/auth/login") {
        if (![email, password].every(Boolean)) return res.json("Missing Credentials")
        else if (!validEmail(email)) return res.json("Invalid Email")
    }

    next()
}
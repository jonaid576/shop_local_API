const errorHandler = (err, req, res, next) => {
    console.log(err)
    return res.status(500).send({ msg: "something went wrong" })
}

module.exports = { errorHandler }